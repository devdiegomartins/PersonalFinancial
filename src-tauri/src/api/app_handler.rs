// use crate::application::user_service;

#[tauri::command]
pub async fn app_initialize() -> Result<(), &'static str> {
    println!("App initialized");
    Ok(())
}
