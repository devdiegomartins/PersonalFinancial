use crate::domain::{r#enum::activity::EnActivity, r#type::id::UuidV8};
use chrono::{DateTime, Utc};

pub struct AppVersion {
    pub version: String,
    pub last_update: DateTime<Utc>,
}

impl AppVersion {
    /// Cria uma nova versão do app com a data atual em UTC
    pub fn new(version: String) -> Self {
        Self {
            version,
            last_update: Utc::now(),
        }
    }

    /// Atualiza a data de última atualização para agora
    pub fn update_timestamp(&mut self) {
        self.last_update = Utc::now();
    }

    /// Verifica se a versão foi atualizada nos últimos N dias
    pub fn was_updated_recently(&self, days: i64) -> bool {
        let cutoff = Utc::now() - chrono::Duration::days(days);
        self.last_update > cutoff
    }
}

pub struct AppActivity {
    pub user_id: Option<UuidV8>,
    pub activity: EnActivity,
}
