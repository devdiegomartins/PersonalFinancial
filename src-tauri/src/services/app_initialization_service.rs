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
    println!(
        "Core initialization with app: {:?}",
        app.try_state::<Mutex<SetupState>>()
            .unwrap()
            .lock()
            .unwrap()
            .backend_task
    );
}

pub async fn initialize_app(app: AppHandle) {
    println!("Initializing app: {:?}", app);
    let app_clone = app.clone();
    set_core_initialization(app, app_clone.state::<Mutex<SetupState>>(), "backend");
}
