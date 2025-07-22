use chrono::Utc;
use std::sync::Mutex;
use tauri::{Builder, Manager, Wry};

use crate::model::app::AppStatus;

pub fn state_management(builder: Builder<Wry>) -> Builder<Wry> {
    builder.setup(|app| {
        app.manage(Mutex::new(AppStatus {
            // TODO get application version from saved files
            version: 1,
            last_updated_at: Utc::now(),
        }));

        Ok(())
    })
}
