use rusqlite::{Connection, Result};
use std::fs;
use std::path::Path;

pub enum DatabaseKind {
    AppInfo,
}

impl DatabaseKind {
    pub fn filename(&self) -> &'static str {
        match self {
            DatabaseKind::AppInfo => "app_info.sqlite",
        }
    }
}

pub fn establish_connection(kind: DatabaseKind) -> Result<Connection> {
    let db_locale: &'static str = "./databases";
    if !Path::new(db_locale).exists() {
        fs::create_dir_all(db_locale).unwrap();
    }

    let db_path: String = format!("{}/{}", db_locale, kind.filename());
    Connection::open(db_path)
}
