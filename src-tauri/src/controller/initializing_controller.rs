use file_service::{
    helper::checker::check_exists,
    model::location::{Location, LocationTrait},
    service::file::{get_bin_file, save_bin_file},
};
use std::sync::Mutex;

use crate::{
    handlers::response::{DefaultResponseTrait, Response},
    model::{
        app::{AppSession, AppStatus},
        user::User,
    },
    repository::users::get_all_users,
    sign::enums::app_enums::AppStatusEnum,
};

#[tauri::command]
pub async fn loading_initial_data(
    app_status_state: tauri::State<'_, Mutex<AppStatus>>,
    session_status_state: tauri::State<'_, Mutex<AppSession>>,
) -> Result<Response<()>, String> {
    let location: Location = LocationTrait::new();
    let session_data: Vec<AppSession> = if check_exists(&location.session_data_path) {
        let mut session_data_buffer = String::from("");
        get_bin_file(&location.session_data_path, &mut session_data_buffer)
            .await
            .map_err(|e| e.to_string())?;
        serde_json::from_str(&session_data_buffer).map_err(|e| e.to_string())?
    } else {
        let app_session = vec![AppSession {
            id: 1,
            status: AppStatusEnum::ContentLoading,
            created_at: chrono::Utc::now().to_string(),
        }];
        save_bin_file(
            &location.app_data,
            "session_data",
            serde_json::to_string(&app_session).unwrap(),
        )
        .map_err(|e| e.to_string())?;
        app_session
    };

    {
        let app_status = app_status_state.lock().unwrap();
        println!("Current version: {}", app_status.version);
    }

    {
        let mut session_status = session_status_state.lock().unwrap();
        if let Some(first_session) = session_data.first() {
            *session_status = first_session.clone();
        }
    }

    Ok(Response::new((), true))
}

#[tauri::command]
pub async fn loading_users(
    users_state: tauri::State<'_, Mutex<Vec<User>>>,
) -> Result<Response<Vec<User>>, String> {
    let all_users = get_all_users().await?;

    {
        let mut users = users_state.lock().unwrap();
        *users = all_users.clone();
    }

    Ok(Response::new(all_users, true))
}
