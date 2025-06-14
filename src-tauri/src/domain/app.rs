use chrono::{DateTime, Utc};

#[derive(Debug, Clone)]
pub struct AppSettings {}

#[derive(Debug, Clone)]
pub struct AppStatus {
    pub now: AppStatusCode,
    pub initialized_at: DateTime<Utc>,
    pub ui_loaded_at: Option<DateTime<Utc>>,
    pub api_loaded_at: Option<DateTime<Utc>>,
}

impl AppStatus {
    pub fn set_ui_loaded(&mut self) {
        self.ui_loaded_at = Some(Utc::now());
    }

    pub fn set_api_loaded(&mut self) {
        self.api_loaded_at = Some(Utc::now());
    }

    pub fn change_status(&mut self, status: AppStatusCode) {
        self.now = status;
    }
}

#[derive(Debug, Clone)]
pub struct AppVersion {}

#[derive(Debug, Clone)]
pub enum AppStatusCode {
    Initializing,
    Initialized,
    CheckingDatabase,
    Syncing,
    Completed,
    Error(Box<str>),
}
