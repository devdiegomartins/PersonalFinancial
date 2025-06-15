mod api;
mod application;
mod config;
mod db;
mod domain;
mod errors;
mod infrastructure;

use crate::api::register_handlers;
use crate::application::services::app_service::setup_app;
use crate::infrastructure::manager::manager_states;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let builder = tauri::Builder::default().plugin(tauri_plugin_opener::init());

    let builder = manager_states(builder).unwrap();

    let builder = register_handlers(builder).unwrap();

    builder
        .setup(|app| {
            setup_app(app).unwrap();

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
