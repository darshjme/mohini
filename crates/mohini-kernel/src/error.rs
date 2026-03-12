//! Kernel-specific error types.

use mohini_types::error::MohiniError;
use thiserror::Error;

/// Kernel error type wrapping MohiniError with kernel-specific context.
#[derive(Error, Debug)]
pub enum KernelError {
    /// A wrapped MohiniError.
    #[error(transparent)]
    Mohini(#[from] MohiniError),

    /// The kernel failed to boot.
    #[error("Boot failed: {0}")]
    BootFailed(String),
}

/// Alias for kernel results.
pub type KernelResult<T> = Result<T, KernelError>;
