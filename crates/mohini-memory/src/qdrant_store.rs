//! Qdrant vector store backend.
//!
//! When the `qdrant` feature is enabled, this module provides a real
//! implementation using the `qdrant-client` crate. When the feature is
//! disabled, a stub implementation is provided that returns `NotAvailable`
//! errors for all operations.

use crate::vector_store::{VectorSearchResult, VectorStore, VectorStoreError};
use mohini_types::config::VectorStoreConfig;

#[cfg(feature = "qdrant")]
mod inner {
    use super::*;
    use async_trait::async_trait;
    use qdrant_client::prelude::*;
    use qdrant_client::qdrant::vectors_config::Config;
    use qdrant_client::qdrant::{
        CreateCollection, Distance, PointStruct, SearchPoints, VectorParams, VectorsConfig,
    };
    use std::sync::Arc;
    use tracing::{debug, warn};

    /// Qdrant-backed vector store for semantic memory.
    pub struct QdrantVectorStore {
        client: Arc<QdrantClient>,
        collection_name: String,
        config: VectorStoreConfig,
    }

    impl QdrantVectorStore {
        /// Create a new Qdrant vector store.
        ///
        /// Connects to the Qdrant server specified in the config and ensures
        /// the collection exists (creating it if necessary).
        pub async fn new(
            config: &VectorStoreConfig,
            agent_id: &str,
        ) -> Result<Self, VectorStoreError> {
            let url = config
                .qdrant_url
                .as_deref()
                .unwrap_or("http://localhost:6334");

            let mut client_config = QdrantClientConfig::from_url(url);
            if let Some(ref api_key) = config.qdrant_api_key {
                client_config.set_api_key(api_key);
            }

            let client = QdrantClient::new(Some(client_config))
                .map_err(|e| VectorStoreError::Connection(e.to_string()))?;

            let prefix = config
                .collection_prefix
                .as_deref()
                .unwrap_or("mohini_");
            let collection_name = format!("{prefix}{agent_id}");

            let store = Self {
                client: Arc::new(client),
                collection_name,
                config: config.clone(),
            };

            store.ensure_collection().await?;
            Ok(store)
        }

        /// Ensure the Qdrant collection exists, creating it if necessary.
        async fn ensure_collection(&self) -> Result<(), VectorStoreError> {
            let exists = self
                .client
                .collection_exists(&self.collection_name)
                .await
                .map_err(|e| VectorStoreError::Collection(e.to_string()))?;

            if !exists {
                debug!(
                    collection = %self.collection_name,
                    "Creating Qdrant collection"
                );
                self.client
                    .create_collection(&CreateCollection {
                        collection_name: self.collection_name.clone(),
                        vectors_config: Some(VectorsConfig {
                            config: Some(Config::Params(VectorParams {
                                size: 384, // all-MiniLM-L6-v2 dimension
                                distance: Distance::Cosine.into(),
                                ..Default::default()
                            })),
                        }),
                        ..Default::default()
                    })
                    .await
                    .map_err(|e| VectorStoreError::Collection(e.to_string()))?;
            }

            Ok(())
        }
    }

    #[async_trait]
    impl VectorStore for QdrantVectorStore {
        async fn upsert(
            &self,
            id: &str,
            embedding: &[f32],
            payload: serde_json::Value,
        ) -> Result<(), VectorStoreError> {
            let payload_map: HashMap<String, qdrant_client::qdrant::Value> =
                serde_json::from_value(payload)
                    .map_err(|e| VectorStoreError::Operation(e.to_string()))?;

            let point = PointStruct::new(id.to_string(), embedding.to_vec(), payload_map);
            self.client
                .upsert_points_blocking(&self.collection_name, None, vec![point], None)
                .await
                .map_err(|e| VectorStoreError::Operation(e.to_string()))?;
            Ok(())
        }

        async fn search(
            &self,
            embedding: &[f32],
            top_k: usize,
        ) -> Result<Vec<VectorSearchResult>, VectorStoreError> {
            let results = self
                .client
                .search_points(&SearchPoints {
                    collection_name: self.collection_name.clone(),
                    vector: embedding.to_vec(),
                    limit: top_k as u64,
                    with_payload: Some(true.into()),
                    ..Default::default()
                })
                .await
                .map_err(|e| VectorStoreError::Operation(e.to_string()))?;

            Ok(results
                .result
                .into_iter()
                .map(|point| {
                    let payload_json = serde_json::to_value(&point.payload).unwrap_or_default();
                    VectorSearchResult {
                        id: match point.id {
                            Some(id) => format!("{:?}", id),
                            None => String::new(),
                        },
                        score: point.score,
                        payload: payload_json,
                    }
                })
                .collect())
        }

        async fn delete(&self, id: &str) -> Result<(), VectorStoreError> {
            use qdrant_client::qdrant::points_selector::PointsSelectorOneOf;
            use qdrant_client::qdrant::{PointsIdsList, PointsSelector};

            let selector = PointsSelector {
                points_selector_one_of: Some(PointsSelectorOneOf::Points(PointsIdsList {
                    ids: vec![id.to_string().into()],
                })),
            };
            self.client
                .delete_points_blocking(&self.collection_name, None, &selector, None)
                .await
                .map_err(|e| VectorStoreError::Operation(e.to_string()))?;
            Ok(())
        }

        async fn update_payload(
            &self,
            id: &str,
            payload: serde_json::Value,
        ) -> Result<(), VectorStoreError> {
            use qdrant_client::qdrant::points_selector::PointsSelectorOneOf;
            use qdrant_client::qdrant::{PointsIdsList, PointsSelector};

            let payload_map: HashMap<String, qdrant_client::qdrant::Value> =
                serde_json::from_value(payload)
                    .map_err(|e| VectorStoreError::Operation(e.to_string()))?;

            let selector = PointsSelector {
                points_selector_one_of: Some(PointsSelectorOneOf::Points(PointsIdsList {
                    ids: vec![id.to_string().into()],
                })),
            };
            self.client
                .set_payload_blocking(&self.collection_name, None, &selector, payload_map, None)
                .await
                .map_err(|e| VectorStoreError::Operation(e.to_string()))?;
            Ok(())
        }

        async fn health_check(&self) -> Result<bool, VectorStoreError> {
            self.client
                .health_check()
                .await
                .map(|_| true)
                .map_err(|e| VectorStoreError::Connection(e.to_string()))
        }
    }

    use std::collections::HashMap;
}

#[cfg(not(feature = "qdrant"))]
mod inner {
    use super::*;
    use async_trait::async_trait;

    /// Stub Qdrant vector store when the `qdrant` feature is not enabled.
    ///
    /// All operations return `VectorStoreError::NotAvailable`.
    #[derive(Debug)]
    pub struct QdrantVectorStore {
        _private: (),
    }

    impl QdrantVectorStore {
        /// Attempt to create a Qdrant store (always fails without the feature).
        pub async fn new(
            _config: &VectorStoreConfig,
            _agent_id: &str,
        ) -> Result<Self, VectorStoreError> {
            Err(VectorStoreError::NotAvailable(
                "Qdrant support requires the 'qdrant' feature flag. \
                 Rebuild with: cargo build --features qdrant"
                    .to_string(),
            ))
        }

        /// Create a stub instance (for use in fallback paths).
        pub fn stub() -> Self {
            Self { _private: () }
        }
    }

    #[async_trait]
    impl VectorStore for QdrantVectorStore {
        async fn upsert(
            &self,
            _id: &str,
            _embedding: &[f32],
            _payload: serde_json::Value,
        ) -> Result<(), VectorStoreError> {
            Err(VectorStoreError::NotAvailable(
                "Qdrant feature not enabled".to_string(),
            ))
        }

        async fn search(
            &self,
            _embedding: &[f32],
            _top_k: usize,
        ) -> Result<Vec<VectorSearchResult>, VectorStoreError> {
            Err(VectorStoreError::NotAvailable(
                "Qdrant feature not enabled".to_string(),
            ))
        }

        async fn delete(&self, _id: &str) -> Result<(), VectorStoreError> {
            Err(VectorStoreError::NotAvailable(
                "Qdrant feature not enabled".to_string(),
            ))
        }

        async fn update_payload(
            &self,
            _id: &str,
            _payload: serde_json::Value,
        ) -> Result<(), VectorStoreError> {
            Err(VectorStoreError::NotAvailable(
                "Qdrant feature not enabled".to_string(),
            ))
        }

        async fn health_check(&self) -> Result<bool, VectorStoreError> {
            Err(VectorStoreError::NotAvailable(
                "Qdrant feature not enabled".to_string(),
            ))
        }
    }
}

pub use inner::QdrantVectorStore;

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_stub_new_returns_not_available() {
        // Without the qdrant feature, creating a store should fail gracefully
        #[cfg(not(feature = "qdrant"))]
        {
            let config = VectorStoreConfig::default();
            let result = QdrantVectorStore::new(&config, "test-agent").await;
            assert!(result.is_err());
            let err = result.unwrap_err();
            assert!(
                matches!(err, VectorStoreError::NotAvailable(_)),
                "Expected NotAvailable, got: {err}"
            );
        }
    }

    #[tokio::test]
    async fn test_stub_operations_return_not_available() {
        #[cfg(not(feature = "qdrant"))]
        {
            let store = QdrantVectorStore::stub();
            let embedding = vec![0.1, 0.2, 0.3];

            assert!(store
                .upsert("id", &embedding, serde_json::json!({}))
                .await
                .is_err());
            assert!(store.search(&embedding, 10).await.is_err());
            assert!(store.delete("id").await.is_err());
            assert!(store
                .update_payload("id", serde_json::json!({}))
                .await
                .is_err());
            assert!(store.health_check().await.is_err());
        }
    }
}
