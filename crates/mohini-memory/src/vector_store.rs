//! Vector store trait abstraction for pluggable vector backends.
//!
//! Provides a common interface over SQLite-based vector search and external
//! vector databases like Qdrant. The trait is async to support networked backends.

use async_trait::async_trait;

/// A single search result from a vector store query.
#[derive(Debug, Clone)]
pub struct VectorSearchResult {
    /// Unique identifier for the stored vector.
    pub id: String,
    /// Similarity score (higher = more similar).
    pub score: f32,
    /// Associated metadata payload.
    pub payload: serde_json::Value,
}

/// Errors that can occur during vector store operations.
#[derive(Debug, thiserror::Error)]
pub enum VectorStoreError {
    /// Failed to connect to the vector store backend.
    #[error("Connection failed: {0}")]
    Connection(String),
    /// Error creating or managing collections.
    #[error("Collection error: {0}")]
    Collection(String),
    /// A specific operation (upsert, search, delete) failed.
    #[error("Operation failed: {0}")]
    Operation(String),
    /// The requested backend is not available (feature not compiled).
    #[error("Not available: {0}")]
    NotAvailable(String),
}

/// Trait for vector storage backends used by the semantic memory layer.
///
/// Implementations must be `Send + Sync` to support concurrent access from
/// the async runtime. All operations are async to accommodate networked
/// backends like Qdrant.
#[async_trait]
pub trait VectorStore: Send + Sync {
    /// Insert or update a vector with associated metadata.
    async fn upsert(
        &self,
        id: &str,
        embedding: &[f32],
        payload: serde_json::Value,
    ) -> Result<(), VectorStoreError>;

    /// Search for the `top_k` most similar vectors to the given embedding.
    async fn search(
        &self,
        embedding: &[f32],
        top_k: usize,
    ) -> Result<Vec<VectorSearchResult>, VectorStoreError>;

    /// Delete a vector by its identifier.
    async fn delete(&self, id: &str) -> Result<(), VectorStoreError>;

    /// Update the metadata payload for an existing vector.
    async fn update_payload(
        &self,
        id: &str,
        payload: serde_json::Value,
    ) -> Result<(), VectorStoreError>;

    /// Check if the backend is healthy and reachable.
    async fn health_check(&self) -> Result<bool, VectorStoreError>;
}

#[cfg(test)]
mod tests {
    use super::*;

    /// Verify that VectorStoreError variants format correctly.
    #[test]
    fn test_error_display() {
        let err = VectorStoreError::Connection("timeout".to_string());
        assert_eq!(err.to_string(), "Connection failed: timeout");

        let err = VectorStoreError::Collection("not found".to_string());
        assert_eq!(err.to_string(), "Collection error: not found");

        let err = VectorStoreError::Operation("write failed".to_string());
        assert_eq!(err.to_string(), "Operation failed: write failed");

        let err = VectorStoreError::NotAvailable("qdrant feature disabled".to_string());
        assert_eq!(err.to_string(), "Not available: qdrant feature disabled");
    }

    /// Verify VectorSearchResult fields are accessible.
    #[test]
    fn test_search_result_fields() {
        let result = VectorSearchResult {
            id: "mem-123".to_string(),
            score: 0.95,
            payload: serde_json::json!({"content": "hello"}),
        };
        assert_eq!(result.id, "mem-123");
        assert!((result.score - 0.95).abs() < f32::EPSILON);
        assert_eq!(result.payload["content"], "hello");
    }

    /// Verify VectorSearchResult can be cloned.
    #[test]
    fn test_search_result_clone() {
        let result = VectorSearchResult {
            id: "abc".to_string(),
            score: 0.5,
            payload: serde_json::json!(null),
        };
        let cloned = result.clone();
        assert_eq!(cloned.id, "abc");
    }

    /// Verify VectorSearchResult Debug impl works.
    #[test]
    fn test_search_result_debug() {
        let result = VectorSearchResult {
            id: "x".to_string(),
            score: 1.0,
            payload: serde_json::json!({}),
        };
        let debug_str = format!("{:?}", result);
        assert!(debug_str.contains("VectorSearchResult"));
    }
}
