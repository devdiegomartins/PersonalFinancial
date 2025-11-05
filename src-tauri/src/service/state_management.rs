use chrono::Utc;
use std::sync::Mutex;
use tauri::{Builder, Manager, Wry};

use crate::{
    model::app::{AppSession, AppStatus},
    sign::enums::app_enums::AppStatusEnum,
};

pub fn state_management(builder: Builder<Wry>) -> Builder<Wry> {
    builder.setup(|app| {
        app.manage(Mutex::new(AppStatus {
            version: 1,
            last_updated_at: Utc::now().to_string(),
        }));

        app.manage(Mutex::new(AppSession {
            id: 0,
            status: AppStatusEnum::Initializing,
            created_at: Utc::now().to_string(),
        }));

        Ok(())
    })
}
