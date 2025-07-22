// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
fn main() {
    match dotenvy::dotenv() {
        Ok(_) => println!("Environments is loaded"),
        Err(e) => eprintln!("Failure when load environments, erro: {}", e.to_string()),
    };

    personal_financial_lib::run()
}
