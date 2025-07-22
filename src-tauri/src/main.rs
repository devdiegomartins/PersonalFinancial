// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env;

fn main() {
    match dotenvy::dotenv() {
        Ok(_) => println!("Environments is loaded"),
        Err(e) => eprintln!("Failure when load environments, erro: {}", e.to_string()),
    };

    println!("Environments: {:?}", env::vars());

    personal_financial_lib::run()
}
