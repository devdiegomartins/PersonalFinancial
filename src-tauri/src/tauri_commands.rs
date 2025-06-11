use crate::models::app_info::AppInfo;
use crate::services::app_info_service::get_app_info;
use tauri::command;

#[command]
pub async fn get_app_info_db() -> Result<AppInfo, String> {
    get_app_info()
}
