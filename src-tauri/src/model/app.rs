use chrono::{DateTime, Utc};

use crate::sign::enums::app_enums::AppStatusEnum;

#[derive(Debug, Clone, Default)]
pub struct AppStatus {
    pub version: u32,
    pub last_updated_at: DateTime<Utc>,
}

#[derive(Debug, Clone)]
pub struct AppSession {
    pub id: u64,
    pub status: AppStatusEnum,
    pub created_at: DateTime<Utc>,
}
