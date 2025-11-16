use crate::{controller::controller, service::state_management::state_management};

mod controller;
mod handlers;
mod model;
mod repository;
mod service;
mod sign;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let builder = tauri::Builder::default();

    // Settings tauri plugins
    let builder = builder.plugin(tauri_plugin_opener::init());
    let builder = builder.plugin(tauri_plugin_fs::init());

    // Construct State Management of application
    let builder = state_management(builder);

    // Define commands
    let builder = controller(builder);

    // Run tauri application
    builder
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
