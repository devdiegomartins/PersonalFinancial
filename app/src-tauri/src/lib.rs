// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use api_personal_financial::{self, finance::Transaction};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn calculate_sum(a: u64, b: u64) -> u64 {
    // Usando a função da biblioteca api_personal_financial
    api_personal_financial::add(a, b)
}

#[tauri::command]
fn calculate_balance(transactions_json: String) -> Result<f64, String> {
    // Parse das transações do JSON
    let transactions: Vec<Transaction> = serde_json::from_str(&transactions_json)
        .map_err(|e| format!("Erro ao fazer parse das transações: {}", e))?;
    
    // Calcula o saldo usando a biblioteca
    Ok(api_personal_financial::calculate_balance(&transactions))
}

#[tauri::command]
fn calculate_monthly_expenses(transactions_json: String, month: String) -> Result<f64, String> {
    let transactions: Vec<Transaction> = serde_json::from_str(&transactions_json)
        .map_err(|e| format!("Erro ao fazer parse das transações: {}", e))?;
    
    Ok(api_personal_financial::calculate_monthly_expenses(&transactions, &month))
}

#[tauri::command]
fn calculate_monthly_income(transactions_json: String, month: String) -> Result<f64, String> {
    let transactions: Vec<Transaction> = serde_json::from_str(&transactions_json)
        .map_err(|e| format!("Erro ao fazer parse das transações: {}", e))?;
    
    Ok(api_personal_financial::calculate_monthly_income(&transactions, &month))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet, 
            calculate_sum, 
            calculate_balance, 
            calculate_monthly_expenses, 
            calculate_monthly_income
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
