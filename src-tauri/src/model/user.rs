use chrono::Utc;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::model::token::{Token, TokenTrait};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct User {
    pub id: Uuid,
    pub name: String,
    pub surname: String,
    pub email: String,
    pub login: String,
    pub password: String,
    pub updated_at: String,
    pub created_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserSession {
    pub id: Uuid,
    pub user_id: Uuid,
    pub token: Token,
    pub created_at: String,
}

// #region Implementations
impl User {
    pub fn new(
        name: String,
        surname: String,
        email: String,
        login: String,
        password: String,
    ) -> Self {
        let now = Utc::now();
        let id = Uuid::new_v4();

        Self {
            id,
            name,
            surname,
            email,
            login,
            password,
            updated_at: now.to_string(),
            created_at: now.to_string(),
        }
    }
}

impl UserSession {
    pub fn new(user_id: Uuid) -> Self {
        let now = Utc::now();
        let id = Uuid::new_v4();
        let token = Token::new();

        Self {
            id,
            user_id,
            token,
            created_at: now.to_string(),
        }
    }
}
