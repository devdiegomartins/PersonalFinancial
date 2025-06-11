// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod db;
mod models;
mod services;
mod tauri_commands;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![tauri_commands::get_app_info_db])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
