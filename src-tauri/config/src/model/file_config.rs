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
    fn new() -> Result<Self, String>
    where
        Self: Sized;
}

impl FileConfigTrait for FileConfig {
    fn new() -> Result<Self, String> {
        let config_paths = vec!["../config/files.json", "config/files.json"];

        let mut string_config = None;
        let mut last_error = String::new();

        for path in config_paths {
            match fs::read_to_string(path) {
                Ok(content) => {
                    string_config = Some(content);
                    break;
                }
                Err(e) => {
                    last_error = format!("Failed to read {}: {}", path, e);
                }
            }
        }

        let string_config = string_config.ok_or_else(|| {
            format!(
                "Failed to read config/files.json from any path. Last error: {}",
                last_error
            )
        })?;

        let file_config: FileConfigData =
            from_str(&string_config).map_err(|e| format!("Failed to parse file config: {}", e))?;
        Ok(Self {
            app_extension: file_config.app_extension,
        })
    }
}
