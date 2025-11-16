use file_service::{
    model::location::{Location, LocationTrait},
    service::file::get_bin_file,
};
use uuid::Uuid;

use crate::model::user::UserSession;

pub async fn get_all_sessions() -> Result<Vec<UserSession>, String> {
    let location: Location = LocationTrait::new();

    let all_sessions: Vec<UserSession> = if std::path::Path::new(&location.app_data).exists() {
        let mut session_data_buffer = String::from("");
        get_bin_file(&location.app_data, &mut session_data_buffer)
            .await
            .map_err(|e| e.to_string())?;
        serde_json::from_str(&session_data_buffer).map_err(|e| e.to_string())?
    } else {
        Vec::new()
    };

    Ok(all_sessions)
}

pub async fn get_session(session_id: Uuid) -> Result<UserSession, String> {
    let all_sessions = get_all_sessions().await?;

    all_sessions
        .into_iter()
        .find(|session| session.id == session_id)
        .ok_or_else(|| "Session not found".to_string())
}

pub async fn get_user_sessions(user_id: Uuid) -> Result<Vec<UserSession>, String> {
    let all_sessions = get_all_sessions().await?;

    let user_sessions: Vec<UserSession> = all_sessions
        .into_iter()
        .filter(|session| session.user_id == user_id)
        .collect();

    Ok(user_sessions)
}
