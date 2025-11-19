use std::env;

use directories::UserDirs;

#[derive(Debug, Clone)]
pub struct Location {
    pub user_documents: String,
    pub app_data: String,
    pub app_install_location: String,
    pub app_default_extension: String,

    pub users_data_path: String,
    pub session_data_path: String,
}

pub trait LocationTrait {
    fn new() -> Self;
}

impl LocationTrait for Location {
    fn new() -> Self {
        let app_default_extension = env::var("APP_FILE_EXT").unwrap_or_else(|_| {
            eprintln!("APP_FILE_EXT not set, using default: pfin");
            "pfin".to_string()
        });

        let app_name = env::var("APP_NAME").unwrap_or_else(|_| {
            eprintln!("APP_NAME not set, using default: Personal Finance");
            "Personal Finance".to_string()
        });

        let user_documents = UserDirs::new()
            .and_then(|dirs| dirs.document_dir().map(|p| p.to_path_buf()))
            .and_then(|path| path.to_str().map(|s| s.to_string()))
            .unwrap_or_else(|| {
                eprintln!("Could not find user documents directory, using home directory");
                UserDirs::new()
                    .and_then(|dirs| dirs.home_dir().to_str().map(|s| s.to_string()))
                    .unwrap_or_else(|| {
                        eprintln!("Could not find home directory, using /tmp");
                        "/tmp".to_string()
                    })
            });

        let app_data = format!("{}/{}", user_documents, app_name);

        let app_install_location = env::current_dir()
            .ok()
            .and_then(|path| path.to_str().map(|s| s.to_string()))
            .unwrap_or_else(|| {
                eprintln!("Could not determine current directory");
                String::new()
            });

        let session_data_path =
            format!("{}/{}.{}", app_data, "session_data", app_default_extension);
        let users_data_path = format!("{}/{}.{}", app_data, "users_data", app_default_extension);

        Self {
            user_documents,
            app_data,
            app_install_location,
            app_default_extension,
            session_data_path,
            users_data_path,
        }
    }
}
