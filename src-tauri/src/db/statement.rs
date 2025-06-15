use rusqlite::{Connection, Result, Statement};

pub fn prepare_statement<'conn>(
    conn: &'conn Connection,
    sql_query: &str,
) -> Result<Statement<'conn>> {
    conn.prepare(sql_query)
}
