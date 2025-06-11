use rusqlite::Connection;

pub fn app_info_migration(conn: &Connection) -> rusqlite::Result<()> {
    conn.execute(
        "
        CREATE TABLE IF NOT EXISTS app_info (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            version TEXT NOT NULL,
            initialized_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
        ",
        [],
    )?;
    Ok(())
}
