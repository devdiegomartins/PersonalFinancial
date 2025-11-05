use file_service::{
    model::location::{Location, LocationTrait},
    service::file::get_bin_file,
};
use std::sync::Mutex;

use crate::model::app::{AppSession, AppStatus};

#[tauri::command]
pub async fn loading_initial_data(
    app_status_state: tauri::State<'_, Mutex<AppStatus>>,
    session_status_state: tauri::State<'_, Mutex<AppSession>>,
) -> Result<(), String> {
    let location: Location = LocationTrait::new();

    let mut session_data_buffer = String::from("");
    get_bin_file(&location.app_data, &mut session_data_buffer)
        .await
        .map_err(|e| e.to_string())?;

    let session_data: Vec<AppSession> =
        serde_json::from_str(&session_data_buffer).map_err(|e| e.to_string())?;

    // Exemplo de como acessar e modificar os states
    // Para ler o estado atual:
    {
        let app_status = app_status_state.lock().unwrap();
        println!("Current version: {}", app_status.version);
    }

    // Para modificar o estado:
    {
        let mut session_status = session_status_state.lock().unwrap();
        if let Some(first_session) = session_data.first() {
            *session_status = first_session.clone();
        }
    }

    Ok(())
}
