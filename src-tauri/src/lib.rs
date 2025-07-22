use crate::controller::controller;

mod controller;
mod model;
mod repository;
mod service;
mod sign;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let builder = tauri::Builder::default();

    // Settings tauri plugins
    let builder = builder.plugin(tauri_plugin_opener::init());

    // Define commands
    let builder = controller(builder);

    // Run tauri application
    builder
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
