use crate::db::statement::prepare_statement;
use crate::domain::app::{AppSession, AppVersion};
use rusqlite::Connection;

pub fn get_app_session(conn: &Connection) -> Result<AppSession, String> {
    let mut statement = prepare_statement(
        conn,
        "SELECT id, status, updated_at, created_at LIMIT 1 ORDER BY id DESC",
    )?;

    let app_session = statement
        .query_map([], |row| {
            Ok(AppSession {
                id: row.get(0),
                status: row.get(1),
                updated_at: row.get(2),
                created_at: row.get(3),
            })
        })
        .map_err(|e| String::from(e))
        .next();

    match app_session {
        Some(Ok(app_info)) => Ok(app_info),
        _ => Err(String::from("App info not found")),
    }
}

pub fn get_db_version(conn: &Connection) -> Result<(), &str> {
    let mut statement = prepare_statement(
        conn,
        "SELECT id, version, created_at LIMIT 1 ORDER BY id DESC",
    )?;

    let db_version = statement
        .query_map([], |row| {
            Ok(AppVersion {
                id: row.get(0),
                version: row.get(1),
                created_at: row.get(3),
            })
        })
        .map_err(|e| String::from(e))
        .next();

    match db_version {
        Some(Ok(db_version)) => Ok(db_version),
        _ => Err(String::from("App db version not found")),
    };

    Ok(())
}
