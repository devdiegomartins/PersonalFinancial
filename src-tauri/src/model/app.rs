use serde::{Deserialize, Serialize};

use crate::sign::enums::app_enums::AppStatusEnum;

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct AppStatus {
    pub version: u32,
    pub last_updated_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AppSession {
    pub id: u64,
    pub status: AppStatusEnum,
    pub created_at: String,
}
