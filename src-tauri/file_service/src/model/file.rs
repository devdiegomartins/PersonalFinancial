use config::model::file_config::{FileConfig, FileConfigTrait};

#[derive(Debug, Clone)]
pub struct File {
    pub default_ext: String,
    pub users_data_file_name: String,
    pub session_data_file_name: String,
}

pub trait FileTrait {
    fn new() -> Result<Self, String>
    where
        Self: Sized;
}

impl FileTrait for File {
    fn new() -> Result<Self, String> {
        let file_config = FileConfig::new()?;

        Ok(Self {
            default_ext: file_config.app_extension,
            users_data_file_name: "08cbf7e4-3f4e-4d2a-9f1e-1c2b3a4d5e6f".to_string(),
            session_data_file_name: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d".to_string(),
        })
    }
}
