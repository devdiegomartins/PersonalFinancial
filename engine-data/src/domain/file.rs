//! File domain module for managing file data with history tracking capabilities.
//!
//! This module provides structures and traits for handling file data that maintains
//! a history of changes over time. It includes functionality for tracking when
//! values were stored, managing historical entries, and querying historical data
//! based on time ranges.

use chrono::{DateTime, Utc};
use engine_id::domain::identity::{Identity, IdentityImpl};
use std::fmt::Debug;

/// Represents a single entry in the history of file data changes.
///
/// Each history entry contains the value that was stored, when it was stored,
/// and a unique identity for tracking purposes.
#[derive(Clone, Debug)]
pub struct HistoryEntry<T: Clone + Debug + Copy> {
    /// Unique identifier for this history entry
    pub identity: Identity,
    /// The value that was stored at this point in time
    pub value: T,
    /// Timestamp when this value was stored
    pub stored_at: DateTime<Utc>,
}

/// Trait defining the interface for history entry operations.
///
/// This trait provides methods for creating and accessing history entries
/// with different timestamp configurations.
trait HistoryEntryImpl<T: Clone + Debug + Copy> {
    /// Creates a new history entry with the current timestamp.
    fn new(value: T) -> Self;

    /// Creates a new history entry with a specific timestamp.
    fn with_timestamp(value: T, stored_at: DateTime<Utc>) -> Self;

    /// Returns a reference to the stored value.
    fn get_value(&self) -> &T;

    /// Returns a reference to the timestamp when this entry was stored.
    fn get_stored_at(&self) -> &DateTime<Utc>;
}

impl<T: Clone + Debug + Copy> HistoryEntryImpl<T> for HistoryEntry<T> {
    fn new(value: T) -> Self {
        Self {
            identity: Identity::new(),
            value,
            stored_at: Utc::now(),
        }
    }

    fn with_timestamp(value: T, stored_at: DateTime<Utc>) -> Self {
        Self {
            identity: Identity::new(),
            value,
            stored_at,
        }
    }

    fn get_value(&self) -> &T {
        &self.value
    }

    fn get_stored_at(&self) -> &DateTime<Utc> {
        &self.stored_at
    }
}

/// Represents file data with history tracking capabilities.
///
/// This structure maintains the current values of a file along with a complete
/// history of all previous values, allowing for temporal analysis and rollback
/// capabilities. Each change to the file data is automatically recorded in the
/// history with timestamps.
#[derive(Clone, Debug)]
pub struct FileData<T: Clone + Debug + Copy> {
    /// Unique identifier for this file data instance
    identity: Identity,
    /// Current values of the file
    values: T,
    /// Complete history of all previous values
    history_values: Vec<HistoryEntry<T>>,
    /// Timestamp of the last update
    updated_at: DateTime<Utc>,
    /// Timestamp when this file data was created
    created_at: DateTime<Utc>,
}

/// Trait defining the interface for file data operations.
///
/// This trait provides comprehensive functionality for managing file data including
/// value updates, history management, and temporal queries. It supports both
/// automatic history tracking and manual history manipulation.
trait FileDataImpl<T: Clone + Debug + Copy> {
    /// Creates a new file data instance with the specified values.
    fn new(values: T) -> Self;

    /// Creates a new file data instance with existing history.
    fn with_history(values: T, history_values: Vec<HistoryEntry<T>>) -> Self;

    /// Returns a reference to the current values.
    fn get_values(&self) -> &T;

    /// Returns a reference to the complete history of values.
    fn get_history_values(&self) -> &Vec<HistoryEntry<T>>;

    /// Returns a reference to the timestamp of the last update.
    fn get_updated_at(&self) -> &DateTime<Utc>;

    /// Returns a reference to the timestamp when this file data was created.
    fn get_created_at(&self) -> &DateTime<Utc>;

    /// Sets new values and automatically adds the current values to history.
    fn set_values(&mut self, new_values: T) -> ();

    /// Updates values (alias for set_values).
    fn update_values(&mut self, new_values: T) -> ();

    /// Manually adds a value to the history with the current timestamp.
    fn add_to_history(&mut self, value: T) -> ();

    /// Manually adds a value to the history with a specific timestamp.
    fn add_to_history_with_timestamp(&mut self, value: T, stored_at: DateTime<Utc>) -> ();

    /// Returns the most recent history entry, if any exists.
    fn get_latest_history_entry(&self) -> Option<&HistoryEntry<T>>;

    /// Returns the total number of history entries.
    fn get_history_count(&self) -> usize;

    /// Removes all history entries.
    fn clear_history(&mut self) -> ();

    /// Returns all history entries since the specified timestamp.
    fn get_history_since(&self, since: DateTime<Utc>) -> Vec<&HistoryEntry<T>>;

    /// Returns all history entries between the specified start and end timestamps.
    fn get_history_between(
        &self,
        start: DateTime<Utc>,
        end: DateTime<Utc>,
    ) -> Vec<&HistoryEntry<T>>;

    /// Returns true if there are no history entries.
    fn is_empty(&self) -> bool;

    /// Returns true if there are history entries.
    fn has_history(&self) -> bool;

    /// Returns the oldest history entry, if any exists.
    fn get_oldest_entry(&self) -> Option<&HistoryEntry<T>>;

    /// Returns the newest history entry, if any exists.
    fn get_newest_entry(&self) -> Option<&HistoryEntry<T>>;
}

impl<T: Clone + Debug + Copy> FileDataImpl<T> for FileData<T> {
    fn new(values: T) -> Self {
        let now = Utc::now();
        Self {
            identity: Identity::new(),
            values,
            history_values: Vec::new(),
            updated_at: now,
            created_at: now,
        }
    }

    fn with_history(values: T, history_values: Vec<HistoryEntry<T>>) -> Self {
        let now = Utc::now();
        Self {
            identity: Identity::new(),
            values,
            history_values,
            updated_at: now,
            created_at: now,
        }
    }

    // Getters
    fn get_values(&self) -> &T {
        &self.values
    }

    fn get_history_values(&self) -> &Vec<HistoryEntry<T>> {
        &self.history_values
    }

    fn get_updated_at(&self) -> &DateTime<Utc> {
        &self.updated_at
    }

    fn get_created_at(&self) -> &DateTime<Utc> {
        &self.created_at
    }

    // Setters
    fn set_values(&mut self, new_values: T) -> () {
        let current_entry = HistoryEntry::new(self.values);
        self.history_values.push(current_entry);

        self.values = new_values;
        self.updated_at = Utc::now();
    }

    fn update_values(&mut self, new_values: T) -> () {
        self.set_values(new_values);
    }

    fn add_to_history(&mut self, value: T) -> () {
        let entry = HistoryEntry::new(value);
        self.history_values.push(entry);
        self.updated_at = Utc::now();
    }

    fn add_to_history_with_timestamp(&mut self, value: T, stored_at: DateTime<Utc>) -> () {
        let entry = HistoryEntry::with_timestamp(value, stored_at);
        self.history_values.push(entry);
        self.updated_at = Utc::now();
    }

    fn get_latest_history_entry(&self) -> Option<&HistoryEntry<T>> {
        self.history_values.last()
    }

    fn get_history_count(&self) -> usize {
        self.history_values.len()
    }

    fn clear_history(&mut self) -> () {
        self.history_values.clear();
        self.updated_at = Utc::now();
    }

    fn get_history_since(&self, since: DateTime<Utc>) -> Vec<&HistoryEntry<T>> {
        self.history_values
            .iter()
            .filter(|entry| entry.stored_at >= since)
            .collect()
    }

    fn get_history_between(
        &self,
        start: DateTime<Utc>,
        end: DateTime<Utc>,
    ) -> Vec<&HistoryEntry<T>> {
        self.history_values
            .iter()
            .filter(|entry| entry.stored_at >= start && entry.stored_at <= end)
            .collect()
    }

    fn is_empty(&self) -> bool {
        self.history_values.is_empty()
    }

    fn has_history(&self) -> bool {
        !self.history_values.is_empty()
    }

    fn get_oldest_entry(&self) -> Option<&HistoryEntry<T>> {
        self.history_values.first()
    }

    fn get_newest_entry(&self) -> Option<&HistoryEntry<T>> {
        self.history_values.last()
    }
}
