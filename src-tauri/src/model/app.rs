use chrono::Utc;
use file_service::{
    helper::checker::check_exists,
    model::{
        file::{File, FileTrait},
        location::{Location, LocationTrait},
    },
    service::file::{get_bin_file, save_bin_file},
};
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
    pub last_updated_at: String,
    pub created_at: String,
}

pub trait AppSessionTrait: Sized {
    fn new() -> Self;
    async fn add_new_session() -> Result<Self, String>;
    async fn get_all_sessions() -> Result<Vec<AppSession>, String>;
    async fn get_current_session(&self) -> Result<Self, String>;
    async fn update_session(&self, status: AppStatusEnum) -> Result<Self, String>;
    fn save_sessions(all_sessions: Vec<Self>) -> Result<(), String>;
}

impl AppSessionTrait for AppSession {
    fn new() -> Self {
        Self {
            id: 0,
            status: AppStatusEnum::Initializing,
            last_updated_at: "".to_string(),
            created_at: "".to_string(),
        }
    }

    async fn add_new_session() -> Result<Self, String> {
        let all_sessions = Self::get_all_sessions().await?;
        let last_session = all_sessions.last();
        let last_session = match last_session {
            Some(session) => session,
            None => &Self {
                id: 0,
                status: AppStatusEnum::Initializing,
                last_updated_at: "".to_string(),
                created_at: "".to_string(),
            },
        };

        let new_app_session = Self {
            id: last_session.id + 1,
            status: AppStatusEnum::Initializing,
            last_updated_at: Utc::now().to_rfc3339(),
            created_at: Utc::now().to_rfc3339(),
        };

        {
            let mut new_all_sessions = all_sessions.clone();
            new_all_sessions.push(new_app_session.clone());
            Self::save_sessions(new_all_sessions)?;
        }

        Ok(new_app_session)
    }

    async fn get_all_sessions() -> Result<Vec<AppSession>, String> {
        let location: Location = LocationTrait::new();
        let session_data: Vec<AppSession> = if check_exists(&location.session_data_path) {
            let mut session_data_buffer = String::from("");
            get_bin_file(&location.session_data_path, &mut session_data_buffer)
                .await
                .map_err(|e| e.to_string())?;
            serde_json::from_str(&session_data_buffer).map_err(|e| e.to_string())?
        } else {
            let session_data_file_name = File::new()?;
            let session_data_file_name: &str =
                session_data_file_name.session_data_file_name.as_str();
            save_bin_file(
                &location.app_data,
                session_data_file_name,
                serde_json::to_string(&Vec::<AppSession>::new()).map_err(|e| e.to_string())?,
            )
            .map_err(|e| e.to_string())?;
            Vec::<AppSession>::new()
        };

        Ok(session_data)
    }

    async fn get_current_session(&self) -> Result<Self, String> {
        if self.id == 0 {
            let all_sessions = Self::get_all_sessions().await?;
            match all_sessions.last() {
                Some(session) => Ok(session.clone()),
                None => Ok(self.clone()),
            }
        } else {
            Ok(self.clone())
        }
    }

    async fn update_session(&self, status: AppStatusEnum) -> Result<Self, String> {
        let updated_session = Self {
            id: self.id,
            status,
            last_updated_at: Utc::now().to_rfc3339(),
            created_at: self.created_at.clone(),
        };

        {
            let mut all_sessions = Self::get_all_sessions().await?;
            if let Some(session) = all_sessions.iter_mut().find(|s| s.id == self.id) {
                *session = updated_session.clone();
            }
            Self::save_sessions(all_sessions)?;
        }

        Ok(updated_session)
    }

    fn save_sessions(all_sessions: Vec<Self>) -> Result<(), String> {
        let location: Location = LocationTrait::new();
        let session_data_file_name = File::new()?;
        let session_data_file_name: &str = session_data_file_name.session_data_file_name.as_str();
        let serialized = serde_json::to_string(&all_sessions)
            .map_err(|e| format!("Failed to serialize sessions: {}", e))?;
        save_bin_file(&location.app_data, session_data_file_name, serialized)
            .map_err(|e| format!("Failed to save sessions: {}", e))
    }
}
