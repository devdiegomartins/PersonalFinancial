use file_service::{
    model::location::{Location, LocationTrait},
    service::file::get_bin_file,
};
use uuid::Uuid;

use crate::model::user::User;

pub async fn get_all_users() -> Result<Vec<User>, String> {
    let location: Location = LocationTrait::new();

    let all_users: Vec<User> = if std::path::Path::new(&location.app_data).exists() {
        let mut session_data_buffer = String::from("");
        get_bin_file(&location.app_data, &mut session_data_buffer)
            .await
            .map_err(|e| e.to_string())?;

        serde_json::from_str(&session_data_buffer).map_err(|e| e.to_string())?
    } else {
        Vec::new()
    };

    Ok(all_users)
}

pub async fn get_user(user_id: Uuid) -> Result<User, String> {
    let all_users = get_all_users().await?;

    all_users
        .into_iter()
        .find(|user| user.id == user_id)
        .ok_or_else(|| "User not found".to_string())
}
