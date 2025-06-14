use crate::domain::app::AppStatus;

pub trait AppRepository {
    async fn get_app_status(&self) -> AppStatus;
}
