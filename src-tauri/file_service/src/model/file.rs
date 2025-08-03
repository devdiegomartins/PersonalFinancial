use config::model::file_config::{FileConfig, FileConfigTrait};

#[derive(Debug, Clone)]
pub struct File {
    pub default_ext: String,
}

pub trait FileTrait {
    fn new() -> Self;
}

impl FileTrait for File {
    fn new() -> Self {
        let file_config = FileConfig::new();

        Self {
            default_ext: file_config.app_extension,
        }
    }
}
