use serde::{Deserialize, Serialize};
use serde_json::from_str;
use std::fs;

#[derive(Deserialize, Serialize)]
struct FileConfigData {
    app_extension: String,
}

#[derive(Debug, Clone)]
pub struct FileConfig {
    pub app_extension: String,
}

pub trait FileConfigTrait {
    fn new() -> Self;
}

impl FileConfigTrait for FileConfig {
    fn new() -> Self {
        let string_config = match fs::read_to_string("config/files.json") {
            Ok(value) => value,
            Err(e) => panic!("Failure when load files config: {:#?}", e),
        };
        let file_config: FileConfigData = match from_str(&string_config) {
            Ok(value) => value,
            Err(e) => panic!("Failure when parse file config data: {:#?}", e),
        };

        Self {
            app_extension: file_config.app_extension,
        }
    }
}
