use chrono::Utc;
use std::sync::Mutex;
use tauri::{Builder, Manager, Wry};
use uuid::Uuid;

use crate::model::{
    app::{AppSession, AppSessionTrait, AppStatus},
    token::TokenTrait,
    user::{User, UserSession},
};

pub fn state_management(builder: Builder<Wry>) -> Builder<Wry> {
    builder.setup(|app| {
        app.manage(Mutex::new(AppStatus {
            version: 1,
            last_updated_at: Utc::now().to_string(),
        }));

        app.manage(Mutex::new(AppSession::new()));

        app.manage(Mutex::new(UserSession {
            id: Uuid::nil(),
            user_id: Uuid::nil(),
            token: TokenTrait::new(),
            created_at: String::new(),
        }));

        app.manage(Mutex::new(Vec::<User>::new()));

        Ok(())
    })
}
