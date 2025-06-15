pub struct AppConfig {
    version: &'static str,
    db_version: &'static str,
}

impl AppConfig {
    pub fn new() -> Self {
        AppConfig {
            version: env!("CARGO_PKG_VERSION"),
            db_version: "0.1.0",
        }
    }
}
