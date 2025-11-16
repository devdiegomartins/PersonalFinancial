use tauri::{Builder, Wry};

pub mod initializing_controller;

pub fn controller(builder: Builder<Wry>) -> Builder<Wry> {
    builder.invoke_handler(tauri::generate_handler![
        initializing_controller::loading_initial_data,
        initializing_controller::loading_users
    ])
}
