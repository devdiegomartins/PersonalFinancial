use chrono::{DateTime, Utc};
use uuid::Uuid;

use crate::model::token::{Token, TokenTrait};

#[derive(Debug, Clone)]
pub struct User {
    pub id: Uuid,
    pub name: String,
    pub surname: String,
    pub email: String,
    pub login: String,
    pub password: String,
    pub updated_at: DateTime<Utc>,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Clone)]
pub struct UserSession {
    pub id: Uuid,
    pub user_id: Uuid,
    pub token: Token,
    pub created_at: DateTime<Utc>,
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
            updated_at: now,
            created_at: now,
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
            created_at: now,
        }
    }
}
