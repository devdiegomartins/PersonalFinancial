use crate::db::connection::{establish_connection, DatabaseKind};
use crate::db::migrations::app_info_migration::app_info_migration;
use crate::models::app_info::AppInfo;

pub fn get_app_info() -> Result<AppInfo, String> {
    let conn = establish_connection(DatabaseKind::AppInfo).map_err(|e| e.to_string())?;
    app_info_migration(&conn).map_err(|e| e.to_string())?;

    let mut stmt = conn
        .prepare("SELECT id, version, initialized_at FROM app_info LIMIT 1")
        .map_err(|e| e.to_string())?;
    let app_info = stmt
        .query_map([], |row| {
            Ok(AppInfo {
                id: row.get(0)?,
                version: row.get(1)?,
                initialized_at: row.get(2)?,
            })
        })
        .map_err(|e| e.to_string())?
        .next();

    match app_info {
        Some(Ok(app_info)) => Ok(app_info),
        _ => Err("App info not found".to_string()),
    }
}
