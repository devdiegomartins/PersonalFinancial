use chrono::Utc;
use std::sync::{Arc, Mutex};
use tauri::{Builder, Wry};

use crate::domain::app::{AppStatus, AppStatusCode};

pub fn manager_states(builder: Builder<Wry>) -> Result<Builder<Wry>, ()> {
    let builder = builder.manage(Arc::new(Mutex::new(AppStatus {
        now: AppStatusCode::Initializing,
        initialized_at: Utc::now(),
        ui_loaded_at: None,
        api_loaded_at: None,
    })));
    Ok(builder)
}
