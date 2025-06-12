use std::sync::Mutex;
use tauri::{AppHandle, Manager, State};

use crate::SetupState;

pub fn set_core_initialization(app: AppHandle, state: State<'_, Mutex<SetupState>>, task: &str) {
    let mut state_lock = state.lock().unwrap();
    match task {
        "frontend" => state_lock.frontend_task = true,
        "backend" => state_lock.backend_task = true,
        _ => panic!("Invalid task completed!"),
    }

    if state_lock.frontend_task && state_lock.backend_task {
        core_initialization(app)
    }
}

fn core_initialization(app: AppHandle) {
    let splash_window = app.get_webview_window("splash").unwrap();
    let main_window = app.get_webview_window("main").unwrap();
    splash_window.close().unwrap();
    main_window.show().unwrap();
}

pub async fn initialize_app(app: AppHandle) {
    let app_clone = app.clone();
    set_core_initialization(app, app_clone.state::<Mutex<SetupState>>(), "backend");
}
