use crate::domain::{
    app::{AppStatus, AppStatusCode},
    repositories::app_repository::AppRepository,
};
use chrono::Utc;

pub struct AppRepositoryImpl {}

impl AppRepository for AppRepositoryImpl {
    async fn get_app_status(&self) -> AppStatus {
        println!("get_app_status is called");
        AppStatus {
            now: AppStatusCode::Initialized,
            initialized_at: Utc::now(),
            ui_loaded_at: None,
            api_loaded_at: None,
        }
    }
}
