use std::sync::Mutex;

use crate::{
    handlers::response::{DefaultResponseTrait, Response},
    model::{
        app::{AppSession, AppSessionTrait, AppStatus},
        user::User,
    },
    repository::users::get_all_users,
};

#[tauri::command]
pub async fn loading_initial_data(
    app_status_state: tauri::State<'_, Mutex<AppStatus>>,
    app_session_state: tauri::State<'_, Mutex<AppSession>>,
) -> Result<Response<()>, String> {
    let session_data = AppSession::add_new_session().await?;
    {
        let mut app_session = app_session_state.lock().unwrap();
        *app_session = session_data.clone();
        println!("Current session ID: {}", app_session.id);
    }

    {
        let app_status = app_status_state.lock().unwrap();
        println!("Current version: {}", app_status.version);
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
