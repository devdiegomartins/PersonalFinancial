// use crate::application::user_service;

use crate::db::{
    connection::{establish_connection, DatabaseKind},
    seeds::app_info_seed::seed_initial_session,
};

/**
 * Define o status de carregamento inicial do frontend e , caso completo com o api ele inicializa a verficação do banco de dados
 */
#[tauri::command]
pub async fn app_initialize() -> Result<(), &'static str> {
    println!("App initialized again");
    Ok(())
}

/**
 * Inicializa o sistema de verificação do banco de dados
 */
#[tauri::command]
pub async fn initialize_db() -> Result<bool, &'static str> {
    // TODO remover e construir um service para essa ação

    let conn = establish_connection(DatabaseKind::AppInfo)
        .map_err(|_| "Erro ao conectar ao banco de dados")?;
    let seed = seed_initial_session(&conn);

    match seed {
        Ok(_) => println!("Rodou o seed"),
        Err(e) => println!("Deu erro no seed: {:?}", e),
    };

    Ok(true)
}
