pub mod app_handler;

use tauri::{generate_handler, Builder, Wry};

pub fn register_handlers(builder: Builder<Wry>) -> Result<Builder<Wry>, ()> {
    let builder = builder.invoke_handler(generate_handler![app_handler::app_initialize]);
    Ok(builder)
}
