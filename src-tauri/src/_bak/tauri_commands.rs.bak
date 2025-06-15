use std::sync::Mutex;

use crate::services::app_info_service::get_app_info;
use crate::services::app_initialization_service::set_core_initialization;
use crate::{models::app_info::AppInfo, SetupState};
use tauri::{command, AppHandle, Manager};

#[command]
pub async fn get_app_info_db() -> Result<AppInfo, String> {
    get_app_info()
}

#[command]
pub async fn set_frontend_initialized(app: AppHandle) -> Result<(), String> {
    let app_handle = app.clone();
    set_core_initialization(app, app_handle.state::<Mutex<SetupState>>(), "frontend");
    Ok(())
}
