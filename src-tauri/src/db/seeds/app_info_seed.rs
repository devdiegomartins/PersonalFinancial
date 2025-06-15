use rusqlite::Connection;

use crate::application::use_cases::app_uc::get_app_session;

pub fn seed_initial_session(conn: &Connection) -> Result<(), String> {
    let app_session = get_app_session(&conn)?;

    println!("app_session_value: {:?}", app_session);

    // TODO continue
    Ok(())
}

pub fn seed_initial_version() {}

pub fn seed_initial_db_version() {}
