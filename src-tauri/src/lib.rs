// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod db;
mod models;
mod services;
mod tauri_commands;

use crate::services::app_initialization_service::initialize_app;
use crate::tauri_commands::{get_app_info_db, set_frontend_initialized};
use std::sync::Mutex;
use tauri::async_runtime::spawn;

pub struct SetupState {
    frontend_task: bool,
    backend_task: bool,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(Mutex::new(SetupState {
            frontend_task: false,
            backend_task: false,
        }))
        .invoke_handler(tauri::generate_handler![
            get_app_info_db,
            set_frontend_initialized
        ])
        .setup(|app| {
            spawn(initialize_app(app.handle().clone()));
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
