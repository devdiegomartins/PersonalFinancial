use chrono::{DateTime, Utc};

pub struct AppStatus {
    version: u32,
    last_updated_at: DateTime<Utc>,
}

pub struct AppSession {}
