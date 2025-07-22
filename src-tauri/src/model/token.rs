use chrono::{DateTime, Utc};
use uuid::Uuid;

use crate::service::gen_token::{gen_token, read_token};

pub trait TokenTrait {
    fn new() -> Self;
    fn read(token: String) -> Self;
}

#[derive(Debug, Clone)]
pub struct Token {
    pub id: Uuid,
    pub token: String,
    pub created_at: DateTime<Utc>,
}

impl TokenTrait for Token {
    fn new() -> Self {
        let id = Uuid::new_v4();
        let now = Utc::now();

        let token = match gen_token(id, now) {
            Ok(token) => token,
            Err(e) => {
                panic!("Error generating token: {}", e)
            }
        };

        Self {
            id,
            token,
            created_at: now,
        }
    }

    fn read(token: String) -> Self {
        let token = match read_token(token) {
            Ok(token) => token,
            Err(e) => panic!("Error reading token: {}", e),
        };

        let token_content = token.split(".");
        let id = token_content.clone().nth(0).unwrap();
        let timestamp = token_content.clone().nth(1).unwrap();

        let id: Uuid = id.split(":").nth(1).unwrap().parse().unwrap();
        let created_at: DateTime<Utc> = timestamp.split(":").nth(1).unwrap().parse().unwrap();

        Self {
            id,
            token,
            created_at,
        }
    }
}
