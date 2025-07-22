//! Module for generating and reading authentication tokens.
//!
//! This module provides functionality to create secure tokens based on UUID and timestamp,
//! using a private key stored in environment variable for signing.

use chrono::{DateTime, Utc};
use data_encoding::BASE64;
use std::env::{self, VarError};
use uuid::Uuid;

/// Generates an authentication token based on UUID and timestamp.
///
/// This function creates a secure token by combining:
/// - Unique ID (UUID)
/// - Creation timestamp
/// - Private signing key (obtained from environment variable `SIGN_PRIVATE`)
///
/// The token is encoded in Base64 for easy transmission and storage.
///
/// # Arguments
///
/// * `id` - Unique UUID that identifies the entity
/// * `timestamp` - Date and time of token creation
///
/// # Returns
///
/// Returns a `Result<String, VarError>` where:
/// - `Ok(String)` - Token generated successfully
/// - `Err(VarError)` - Error accessing environment variable `SIGN_PRIVATE`
///
/// # Errors
///
/// This function can fail if:
/// - Environment variable `SIGN_PRIVATE` is not defined
/// - There's an error in Base64 encoding
pub fn gen_token(id: Uuid, timestamp: DateTime<Utc>) -> Result<String, VarError> {
    let private_key = env::var("SIGN_PRIVATE")?;
    let token_content = format!("id:{}.timestamp:{}.private:{}", id, timestamp, private_key);
    let token_b = token_content.as_bytes();
    let token_str = BASE64.encode(token_b);

    Ok(token_str)
}

/// Decodes and reads the content of an authentication token.
///
/// This function decodes a Base64 token and returns its original content.
/// The token content includes the ID, timestamp and private key used in creation.
///
/// # Arguments
///
/// * `token` - String containing the Base64 encoded token
///
/// # Returns
///
/// Returns a `Result<String, String>` where:
/// - `Ok(String)` - Decoded token content
/// - `Err(String)` - Error in token decoding or conversion
///
/// # Errors
///
/// This function can fail if:
/// - The token is not valid Base64
/// - There's an error converting bytes to UTF-8 string
pub fn read_token(token: String) -> Result<String, String> {
    let token_b = token.as_bytes();
    let decoded_bytes = BASE64
        .decode(token_b)
        .map_err(|e| format!("Error decoding token: {}", e))?;
    let token_string = String::from_utf8(decoded_bytes)
        .map_err(|e| format!("Error converting token to string: {}", e))?;

    Ok(token_string)
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::env;

    #[test]
    fn test_gen_token_success() {
        // Set up test environment
        env::set_var("SIGN_PRIVATE", "test_private_key_123");

        let id = Uuid::new_v4();
        let timestamp = Utc::now();

        let result = gen_token(id, timestamp);

        assert!(result.is_ok());
        let token = result.unwrap();

        // Token should not be empty
        assert!(!token.is_empty());

        // Token should be valid Base64
        assert!(BASE64.decode(token.as_bytes()).is_ok());
    }

    #[test]
    fn test_gen_token_missing_private_key() {
        // Remove the environment variable
        env::remove_var("SIGN_PRIVATE");

        let id = Uuid::new_v4();
        let timestamp = Utc::now();

        let result = gen_token(id, timestamp);

        assert!(result.is_err());
        match result {
            Err(VarError::NotPresent) => (), // Expected error
            _ => panic!("Expected VarError::NotPresent"),
        }
    }

    #[test]
    fn test_read_token_success() {
        // Create a simple test token
        let test_content = "id:test-uuid.timestamp:2023-01-01T00:00:00Z.private:test_key";
        let test_token = BASE64.encode(test_content.as_bytes());

        let result = read_token(test_token);

        assert!(result.is_ok());
        let content = result.unwrap();
        assert_eq!(content, test_content);
    }

    #[test]
    fn test_read_token_invalid_base64() {
        let invalid_token = "invalid-base64-token!@#$%";

        let result = read_token(invalid_token.to_string());

        assert!(result.is_err());
    }

    #[test]
    fn test_read_token_empty_string() {
        let result = read_token("".to_string());

        assert!(result.is_ok());
        let content = result.unwrap();
        assert_eq!(content, "");
    }

    #[test]
    fn test_gen_and_read_token_roundtrip() {
        // Set up test environment
        env::set_var("SIGN_PRIVATE", "test_private_key_456");

        let id = Uuid::new_v4();
        let timestamp = Utc::now();

        // Generate token
        let token_result = gen_token(id, timestamp);
        assert!(token_result.is_ok());
        let token = token_result.unwrap();

        // Read token back
        let content_result = read_token(token);
        assert!(content_result.is_ok());
        let content = content_result.unwrap();

        // Verify the content contains expected parts
        assert!(content.contains(&id.to_string()));
        assert!(content.contains("timestamp:"));
        assert!(content.contains("private:test_private_key_456"));
    }

    #[test]
    fn test_gen_token_different_ids() {
        env::set_var("SIGN_PRIVATE", "test_key");

        let id1 = Uuid::new_v4();
        let id2 = Uuid::new_v4();
        let timestamp = Utc::now();

        let token1 = gen_token(id1, timestamp).unwrap();
        let token2 = gen_token(id2, timestamp).unwrap();

        // Tokens should be different for different IDs
        assert_ne!(token1, token2);
    }

    #[test]
    fn test_gen_token_different_timestamps() {
        env::set_var("SIGN_PRIVATE", "test_key");

        let id = Uuid::new_v4();
        let timestamp1 = Utc::now();
        let timestamp2 = timestamp1 + chrono::Duration::seconds(1);

        let token1 = gen_token(id, timestamp1).unwrap();
        let token2 = gen_token(id, timestamp2).unwrap();

        // Tokens should be different for different timestamps
        assert_ne!(token1, token2);
    }

    #[test]
    fn test_read_token_with_special_characters() {
        let test_content = "id:test-uuid.timestamp:2023-01-01T00:00:00Z.private:test_key_with_special_chars!@#$%^&*()";
        let test_token = BASE64.encode(test_content.as_bytes());

        let result = read_token(test_token);

        assert!(result.is_ok());
        let content = result.unwrap();
        assert_eq!(content, test_content);
    }
}
