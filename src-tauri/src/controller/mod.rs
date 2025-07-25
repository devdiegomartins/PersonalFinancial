use file_service::{
    model::location::{Location, LocationTrait},
    service::file::save_file as save_file_service,
};
use tauri::{Builder, Wry};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn save_file(file_name: &str, content: &str) -> Result<(), String> {
    let location: Location = Location::new(); // TODO validar problema de permissão do location

    match save_file_service("/home/diego", file_name, content.to_string()) {
        Ok(_) => Ok(()),
        Err(e) => Err(e.to_string()),
    }
}

pub fn controller(builder: Builder<Wry>) -> Builder<Wry> {
    builder.invoke_handler(tauri::generate_handler![greet, save_file])
}
