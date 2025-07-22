use chrono::{DateTime, Utc};
use uuid::Uuid;

pub struct User {
    id: u32,
    name: String,
    surname: String,
    email: String,
    login: String,
    password: String,
    update_at: DateTime<Utc>,
    created_at: DateTime<Utc>,
}

pub struct UserSession {
    id: Uuid,
    created_at: DateTime<Utc>,
}
