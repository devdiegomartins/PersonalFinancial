use std::env;

use directories::UserDirs;

#[derive(Debug, Clone)]
pub struct Location {
    pub user_documents: String,
    pub app_data: String,
    pub app_install_location: String,
}

pub trait LocationTrait {
    fn new() -> Self;
}

impl LocationTrait for Location {
    fn new() -> Self {
        let app_name: String = env::var("APP_NAME").unwrap_or_else(|e| {
            eprintln!("Error getting app name: {}", e);
            "Personal Finance".to_string()
        });

        let user_dirs: UserDirs = match UserDirs::new() {
            Some(dirs) => dirs,
            None => {
                return Self {
                    user_documents: String::new(),
                    app_data: String::new(),
                    app_install_location: String::new(),
                }
            }
        };

        let (user_documents, app_data) = match user_dirs.document_dir() {
            Some(dirs) => {
                let documents = dirs.to_str().unwrap().to_string();

                let app_data = format!("{}/{}", documents, app_name);
                (documents, app_data)
            }
            None => (String::new(), String::new()),
        };

        let app_install_location: String = match env::current_dir() {
            Ok(dirs) => dirs.to_str().unwrap().to_string(),
            Err(e) => {
                eprintln!("Error getting current directory: {}", e);
                String::new()
            }
        };

        Self {
            user_documents,
            app_data,
            app_install_location,
        }
    }
}
