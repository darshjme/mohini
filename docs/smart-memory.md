# Smart Memory Architecture

## Overview

Mohini's memory system combines file-based persistence with vector embeddings for semantic recall. Unlike simple key-value storage, memories decay over time, gain strength through repeated access, and compact automatically to stay within resource budgets.

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Memory Layers                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │  Working      │  │  Daily Logs  │  │  Long-Term │ │
│  │  Memory       │  │  memory/     │  │  MEMORY.md │ │
│  │  (in-context) │  │  YYYY-MM-DD  │  │  (curated) │ │
│  └──────┬───────┘  └──────┬───────┘  └──────┬─────┘ │
│         │                 │                  │       │
│         ▼                 ▼                  ▼       │
│  ┌─────────────────────────────────────────────────┐ │
│  │           Vector Store (LanceDB)                │ │
│  │     Embeddings: all-MiniLM-L6-v2 (384-dim)     │ │
│  │     Index: IVF-PQ for fast ANN search           │ │
│  └─────────────────────────────────────────────────┘ │
│                                                      │
│  ┌─────────────────────────────────────────────────┐ │
│  │           OpenClaw Memory Store                  │ │
│  │     memory_store / memory_recall / memory_forget │ │
│  │     (built-in long-term memory API)              │ │
│  └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

## Vector Embeddings

### Model Selection

| Model | Dimensions | Speed | Quality | Use Case |
|-------|-----------|-------|---------|----------|
| `all-MiniLM-L6-v2` | 384 | ~5ms | Good | Task routing, quick similarity |
| `bge-large-en-v1.5` | 1024 | ~25ms | Excellent | Deep memory search, semantic recall |
| `all-mpnet-base-v2` | 768 | ~15ms | Very Good | Balanced alternative |

**Current setup:**
- **Routing:** `all-MiniLM-L6-v2` (speed-critical, classification)
- **Memory search:** `bge-large-en-v1.5` (accuracy-critical, recall)

### Embedding Pipeline

```python
from sentence_transformers import SentenceTransformer
import lancedb
import numpy as np

# Load model (cached after first load)
model = SentenceTransformer("all-MiniLM-L6-v2")

# Embed a memory
text = "Darshan prefers direct communication, no fluff"
embedding = model.encode(text)  # → np.array, shape (384,)

# Store in LanceDB
db = lancedb.connect("/root/openclaw/workspace/memory/vectordb")
table = db.open_table("memories")
table.add([{
    "text": text,
    "vector": embedding,
    "created_at": "2026-03-17T05:50:00",
    "access_count": 0,
    "decay_score": 1.0,
    "category": "preference"
}])
```

### Semantic Recall

```python
def recall(query: str, top_k: int = 5) -> list:
    """Recall memories semantically similar to query."""
    query_embedding = model.encode(query)
    
    results = table.search(query_embedding).limit(top_k).to_list()
    
    # Boost by access count, penalize by decay
    for r in results:
        r["final_score"] = r["_distance"] * r["decay_score"] * (1 + 0.1 * r["access_count"])
        # Update access count
        r["access_count"] += 1
    
    return sorted(results, key=lambda x: x["final_score"], reverse=True)
```

## Decay Algorithms

### Time-Based Decay

Memories lose relevance over time. The decay function follows an exponential curve inspired by Ebbinghaus's forgetting curve:

```python
import math
from datetime import datetime, timedelta

def calculate_decay(created_at: datetime, half_life_days: float = 14.0) -> float:
    """
    Exponential decay with configurable half-life.
    
    After half_life_days, the memory retains 50% of its original score.
    After 2x half_life_days, it retains 25%, etc.
    
    Args:
        created_at: When the memory was created
        half_life_days: Days until memory loses half its strength
    
    Returns:
        Float between 0.0 and 1.0
    """
    age_days = (datetime.now() - created_at).total_seconds() / 86400
    decay = math.exp(-0.693 * age_days / half_life_days)  # ln(2) ≈ 0.693
    return max(decay, 0.01)  # Never fully decay — floor at 1%
```

### Category-Specific Half-Lives

| Category | Half-Life | Rationale |
|----------|-----------|-----------|
| `preference` | 90 days | Preferences change slowly |
| `fact` | 30 days | Facts may become outdated |
| `decision` | 60 days | Decisions have medium relevance |
| `entity` | 45 days | People/things stay relevant |
| `conversation` | 7 days | Chat context fades fast |
| `task` | 3 days | Tasks are ephemeral |

## Access-Count Boosting

Memories that are recalled frequently are more important. Each access boosts the effective score:

```python
def boosted_score(base_score: float, access_count: int, boost_factor: float = 0.1) -> float:
    """
    Logarithmic boost based on access count.
    
    First few accesses boost significantly; diminishing returns after.
    boost = 1 + factor * ln(1 + access_count)
    
    Examples:
        0 accesses → 1.0x
        1 access   → 1.07x
        5 accesses → 1.18x
        20 accesses → 1.30x
        100 accesses → 1.46x
    """
    boost = 1.0 + boost_factor * math.log(1 + access_count)
    return base_score * boost
```

### Reinforcement on Recall

Every time `memory_recall` returns a memory, its `access_count` increments and `last_accessed` updates. This creates a natural selection effect — useful memories survive, forgotten ones decay.

## Compaction Strategies

### 1. Threshold Compaction

Periodically remove memories below a decay threshold:

```python
def compact_by_threshold(threshold: float = 0.05):
    """Remove memories with decay score below threshold."""
    all_memories = table.to_pandas()
    expired = all_memories[all_memories["decay_score"] < threshold]
    
    # Archive before deleting
    expired.to_json(f"memory/archive/{datetime.now().date()}-compacted.jsonl", 
                    orient="records", lines=True)
    
    # Delete from vector store
    for idx in expired.index:
        table.delete(f"id = {expired.loc[idx, 'id']}")
    
    return len(expired)
```

### 2. Similarity Deduplication

Merge memories that are semantically near-identical:

```python
def deduplicate(similarity_threshold: float = 0.95):
    """Merge memories with >95% cosine similarity."""
    all_memories = table.to_pandas()
    vectors = np.stack(all_memories["vector"].values)
    
    # Pairwise cosine similarity
    norms = np.linalg.norm(vectors, axis=1, keepdims=True)
    similarity_matrix = (vectors @ vectors.T) / (norms @ norms.T)
    
    to_merge = set()
    for i in range(len(similarity_matrix)):
        for j in range(i + 1, len(similarity_matrix)):
            if similarity_matrix[i][j] > similarity_threshold:
                # Keep the one with higher access count
                if all_memories.iloc[i]["access_count"] >= all_memories.iloc[j]["access_count"]:
                    to_merge.add(j)
                else:
                    to_merge.add(i)
    
    # Delete duplicates
    for idx in to_merge:
        table.delete(f"id = {all_memories.iloc[idx]['id']}")
    
    return len(to_merge)
```

### 3. Summarization Compaction

For old daily logs, use LLM to summarize before archiving:

```python
def summarize_and_archive(file_path: str):
    """
    Summarize a daily memory file into 3-5 key points,
    store summary as a single memory, archive original.
    """
    content = open(file_path).read()
    
    # Use local LLM or OpenClaw to summarize
    summary = llm_summarize(content, max_points=5)
    
    # Store summary as a new memory
    memory_store(text=summary, category="fact", importance=0.6)
    
    # Archive original
    shutil.move(file_path, file_path + ".archived")
```

### 4. Budget-Based Compaction

Keep total memory count within a budget:

```python
def compact_to_budget(max_memories: int = 10000):
    """Keep only the top N memories by composite score."""
    all_memories = table.to_pandas()
    
    if len(all_memories) <= max_memories:
        return 0
    
    # Calculate composite score
    all_memories["composite"] = all_memories.apply(
        lambda r: boosted_score(r["decay_score"], r["access_count"]), axis=1
    )
    
    # Sort and keep top N
    all_memories = all_memories.sort_values("composite", ascending=False)
    to_remove = all_memories.iloc[max_memories:]
    
    # Archive and delete
    for _, row in to_remove.iterrows():
        table.delete(f"id = {row['id']}")
    
    return len(to_remove)
```

## Maintenance Schedule

| Task | Frequency | Trigger |
|------|-----------|---------|
| Decay score update | Every 6 hours | n8n workflow / heartbeat |
| Threshold compaction | Daily | n8n workflow |
| Similarity dedup | Weekly | n8n workflow |
| Summarization compaction | Monthly | n8n workflow (for files >30 days old) |
| Budget enforcement | Weekly | n8n workflow |
| Full backup | Daily | Cron → pg_dump + file copy |

## File-Based Memory (Current System)

While vector memory is the target architecture, Mohini currently uses file-based memory:

| File | Purpose | Persistence |
|------|---------|-------------|
| `memory/YYYY-MM-DD.md` | Daily logs, raw events | 30 days (then compress) |
| `MEMORY.md` | Curated long-term memory | Permanent (manually curated) |
| `memory/heartbeat-state.json` | Heartbeat tracking | Overwritten each cycle |
| OpenClaw `memory_store` | Built-in vector memory | Managed by OpenClaw |

The transition path: file-based → hybrid (files + vectors) → fully vectorized with file backup.
