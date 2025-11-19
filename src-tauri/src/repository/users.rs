use file_service::{
    helper::checker::check_exists,
    model::location::{Location, LocationTrait},
    service::file::{get_bin_file, save_bin_file},
};
use uuid::Uuid;

use crate::model::user::User;

pub async fn get_all_users() -> Result<Vec<User>, String> {
    let location: Location = LocationTrait::new();
    let users_data: Vec<User> = if check_exists(&location.users_data_path) {
        let mut session_data_buffer = String::from("");
        get_bin_file(&location.users_data_path, &mut session_data_buffer)
            .await
            .map_err(|e| e.to_string())?;

        serde_json::from_str(&session_data_buffer).map_err(|e| e.to_string())?
    } else {
        let users_data = Vec::<User>::new();

        save_bin_file(
            &location.app_data,
            "users_data",
            serde_json::to_string(&users_data).unwrap(),
        )
        .map_err(|e| e.to_string())?;

        users_data
    };

    Ok(users_data)
}

pub async fn get_user(user_id: Uuid) -> Result<User, String> {
    let all_users = get_all_users().await?;

    all_users
        .into_iter()
        .find(|user| user.id == user_id)
        .ok_or_else(|| "User not found".to_string())
}
