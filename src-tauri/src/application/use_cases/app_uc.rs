use crate::db::statement::prepare_statement;
use crate::domain::app::{AppSession, AppStatusCode, AppVersion};
use rusqlite::Connection;

pub fn get_app_session(conn: &Connection) -> Result<AppSession, String> {
    let mut statement = prepare_statement(
        conn,
        "SELECT id, status, updated_at, created_at FROM app_session ORDER BY id DESC LIMIT 1",
    )
    .map_err(|e| e.to_string())?;

    let mut rows = statement.query([]).map_err(|e| e.to_string())?;

    if let Some(row) = rows.next().map_err(|e| e.to_string())? {
        let id: String = row.get(0).map_err(|e| e.to_string())?;
        let status_str: String = row.get(1).map_err(|e| e.to_string())?;
        let status: AppStatusCode = match status_str.as_str() {
            "Initializing" => AppStatusCode::Initializing,
            "Initialized" => AppStatusCode::Initialized,
            "CheckingDatabase" => AppStatusCode::CheckingDatabase,
            "Syncing" => AppStatusCode::Syncing,
            "Completed" => AppStatusCode::Completed,
            _ => AppStatusCode::Error(status_str.into()),
        };
        let updated_at_str: String = row.get(2).map_err(|e| e.to_string())?;
        let updated_at = chrono::DateTime::parse_from_rfc3339(&updated_at_str)
            .map_err(|e| e.to_string())?
            .with_timezone(&chrono::Utc);
        let created_at_str: String = row.get(3).map_err(|e| e.to_string())?;
        let created_at = chrono::DateTime::parse_from_rfc3339(&created_at_str)
            .map_err(|e| e.to_string())?
            .with_timezone(&chrono::Utc);
        Ok(AppSession {
            id,
            status,
            updated_at,
            created_at,
        })
    } else {
        Err("App info not found".to_string())
    }
}

pub fn get_db_version(conn: &Connection) -> Result<AppVersion, String> {
    let mut statement = prepare_statement(
        conn,
        "SELECT id, version, created_at FROM app_version ORDER BY id DESC LIMIT 1",
    )
    .map_err(|e| e.to_string())?;

    let mut rows = statement.query([]).map_err(|e| e.to_string())?;

    if let Some(row) = rows.next().map_err(|e| e.to_string())? {
        let id: i32 = row.get(0).map_err(|e| e.to_string())?;
        let version: String = row.get(1).map_err(|e| e.to_string())?;
        let created_at_str: String = row.get(2).map_err(|e| e.to_string())?;
        let created_at = chrono::DateTime::parse_from_rfc3339(&created_at_str)
            .map_err(|e| e.to_string())?
            .with_timezone(&chrono::Utc);
        Ok(AppVersion {
            id,
            version,
            created_at,
        })
    } else {
        Err("App db version not found".to_string())
    }
}
