use serde::Serialize;

#[derive(Serialize)]
pub struct AppInfo {
    pub id: i8,
    pub version: String,
    pub initialized_at: String,
}
