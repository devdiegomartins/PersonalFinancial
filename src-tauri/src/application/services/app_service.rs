use crate::domain::app::{AppStatus, AppStatusCode};
use std::sync::{Arc, Mutex};
use tauri::async_runtime::spawn;
use tauri::{App, Manager};

pub fn setup_app(app: &mut App) -> Result<(), ()> {
    let app_handle = app.handle();
    let state = app_handle.state::<Arc<Mutex<AppStatus>>>();
    let app_status = state.inner().clone();
    spawn(async move {
        defined_api_status(app_status).await;
    });
    Ok(())
}

async fn defined_api_status(state: Arc<Mutex<AppStatus>>) {
    let mut status = state.lock().unwrap();
    status.set_api_loaded();

    if !status.api_loaded_at.is_none() && !status.ui_loaded_at.is_none() {
        status.change_status(AppStatusCode::Initialized);
    }
}

/**
 * 1. Check if the app is already initialized
 * 2. Check if the app is already syncing
 * 3. Check if the app is already checking the database
 * 4. Check if the app is already error
 * 5. Check if the app is already completed
 * 6. Check if the app is already initialized
 * 7. Check if the app is already initialized
 */
pub fn process_app_flow() {}
