//! Domain module for identity management.
//!
//! This module provides functionality for creating, managing, and manipulating identities
//! based on UUIDs. Identities are used to identify unique entities in the system
//! and include information about when they were created.

use crate::infrastructure::adapters::gen_id::generate;
use chrono::{DateTime, Utc};
use uuid::Uuid;

/// Represents a unique identity based on UUID.
///
/// An identity is used to identify unique entities in the system.
/// Each identity has a UUID that guarantees its uniqueness and a timestamp
/// that indicates when the identity was created.
#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub struct Identity {
    id: Uuid,
    created_at: DateTime<Utc>,
}

/// Trait defining the behavior for Identity operations.
pub trait IdentityImpl {
    /// Creates a new identity with an automatically generated UUID.
    fn new() -> Self;

    /// Creates a new identity with the specified UUID.
    fn with_id(id: Uuid) -> Self;

    /// Returns a reference to the identity's UUID.
    fn get_id(&self) -> &Uuid;

    /// Returns a reference to the identity's creation timestamp.
    fn get_created_at(&self) -> &DateTime<Utc>;

    /// Returns a sorted list of references to the identities.
    fn get_ordenation(list: &Vec<Identity>) -> Vec<&Identity>;

    /// Returns the indices of identities in sorted order.
    fn get_ordenation_index(list: &Vec<Identity>) -> Vec<usize>;

    /// Checks if this identity is present in the provided list.
    fn is_identity_in_list(&self, list: &Vec<Identity>) -> bool;

    /// Adds this identity to the beginning of the list if it's not already present.
    fn include(identity: &'static Identity, list: &mut Vec<&'static Identity>);

    /// Removes this identity from the list.
    fn remove(&self, list: &mut Vec<Identity>);
}

impl IdentityImpl for Identity {
    /// Creates a new identity with an automatically generated UUID.
    ///
    /// The creation timestamp is set to the current moment in UTC.
    fn new() -> Self {
        Self {
            id: generate(),
            created_at: Utc::now(),
        }
    }

    /// Creates a new identity with the specified UUID.
    ///
    /// The creation timestamp is set to the current moment in UTC.
    ///
    /// # Arguments
    ///
    /// * `id` - The UUID that will be used for the identity
    fn with_id(id: Uuid) -> Self {
        Self {
            id,
            created_at: Utc::now(),
        }
    }

    /// Returns a reference to the identity's UUID.
    fn get_id(&self) -> &Uuid {
        &self.id
    }

    /// Returns a reference to the identity's creation timestamp.
    ///
    /// The timestamp indicates when the identity was created in UTC.
    fn get_created_at(&self) -> &DateTime<Utc> {
        &self.created_at
    }

    /// Returns a sorted list of references to the identities.
    ///
    /// Identities are sorted by UUID in ascending order.
    fn get_ordenation(list: &Vec<Identity>) -> Vec<&Identity> {
        let mut sorted: Vec<&Identity> = list.iter().collect();
        sorted.sort_by(|a, b| a.id.cmp(&b.id));
        sorted
    }

    /// Returns the indices of identities in sorted order.
    ///
    /// Returns a vector of indices that, when applied to the original list,
    /// produces a list sorted by UUID in ascending order.
    fn get_ordenation_index(list: &Vec<Identity>) -> Vec<usize> {
        let mut indices: Vec<usize> = (0..list.len()).collect();
        indices.sort_by(|&a, &b| list[a].id.cmp(&list[b].id));
        indices
    }

    /// Checks if this identity is present in the provided list.
    ///
    /// # Arguments
    ///
    /// * `list` - The list of identities to be checked
    ///
    /// # Returns
    ///
    /// `true` if the identity is in the list, `false` otherwise.
    fn is_identity_in_list(&self, list: &Vec<Identity>) -> bool {
        list.iter().any(|identity| identity.id == self.id)
    }

    /// Adds this identity to the beginning of the list if it's not already present.
    ///
    /// If the identity already exists in the list, it won't be added again.
    /// The identity is inserted at the beginning of the list (position 0).
    ///
    /// # Arguments
    ///
    /// * `list` - The list of identities where the identity will be added
    fn include(identity: &'static Identity, list: &mut Vec<&'static Identity>) {
        list.insert(0, identity)
    }

    /// Removes this identity from the list.
    ///
    /// Removes all occurrences of the identity from the list, maintaining
    /// the order of the remaining elements.
    ///
    /// # Arguments
    ///
    /// * `list` - The list of identities from where the identity will be removed
    fn remove(&self, list: &mut Vec<Identity>) {
        list.retain(|identity| identity.id != self.id);
    }
}
