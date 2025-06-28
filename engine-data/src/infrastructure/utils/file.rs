use aes_gcm::{
    Aes256Gcm,
    aead::{Aead, KeyInit},
};
use dirs_next as dirs;
use personal_financial::constants::{
    APP_NAME, DATA_FILE_EXTENSION, ENCRYPTION_KEY, ENCRYPTION_NONCE,
};
use std::fs;

pub fn get_file_content(location_path: &String, file_name_with_ext: &String) -> String {
    let file_path = format!("{}/{}", location_path, file_name_with_ext);

    // Verifica se o arquivo tem a extensão .pfa (arquivo criptografado)
    if file_name_with_ext.ends_with(&format!(".{}", DATA_FILE_EXTENSION)) {
        // Lê arquivo criptografado
        let encrypted_data =
            fs::read(&file_path).expect(&format!("Failed to read encrypted file: {}", &file_path));

        // Descriptografa os dados
        let cipher = Aes256Gcm::new_from_slice(&ENCRYPTION_KEY).expect("Failed to create cipher");

        let decrypted_data = cipher
            .decrypt(&ENCRYPTION_NONCE.into(), encrypted_data.as_ref())
            .expect("Failed to decrypt data");

        // Deserializa os dados
        let content: String =
            bincode::deserialize(&decrypted_data).expect("Failed to deserialize data");

        content
    } else {
        // Lê arquivo normal (não criptografado)
        let file_content =
            fs::read_to_string(&file_path).expect(&format!("Failed to read file: {}", &file_path));
        file_content
    }
}

pub fn write_file_content(
    location_path: &String,
    file_name_with_ext: &String,
    content: &String,
) -> bool {
    // Verifica se o arquivo tem a extensão .pfa (arquivo criptografado)
    if file_name_with_ext.ends_with(&format!(".{}", DATA_FILE_EXTENSION)) {
        // Serializa os dados
        let serialized_data = bincode::serialize(content).expect("Failed to serialize data");

        // Criptografa os dados
        let cipher = Aes256Gcm::new_from_slice(&ENCRYPTION_KEY).expect("Failed to create cipher");

        let encrypted_data = cipher
            .encrypt(&ENCRYPTION_NONCE.into(), serialized_data.as_ref())
            .expect("Failed to encrypt data");

        // Escreve o arquivo criptografado
        let file_path = format!("{}/{}", location_path, file_name_with_ext);
        match fs::write(&file_path, encrypted_data) {
            Ok(_) => true,
            Err(_) => false,
        }
    } else {
        // Escreve arquivo normal (não criptografado)
        let file_path = format!("{}/{}", location_path, file_name_with_ext);
        match fs::write(&file_path, content) {
            Ok(_) => true,
            Err(_) => false,
        }
    }
}

pub fn check_integrity(location_path: &String, file_name_with_ext: &String) -> bool {
    // Verifica se o arquivo existe
    if !file_exists(location_path, file_name_with_ext) {
        return false;
    }

    // Verifica se o arquivo tem a extensão .pfa (arquivo criptografado)
    if file_name_with_ext.ends_with(&format!(".{}", DATA_FILE_EXTENSION)) {
        let file_path = format!("{}/{}", location_path, file_name_with_ext);

        // Tenta ler e descriptografar o arquivo
        match fs::read(&file_path) {
            Ok(encrypted_data) => {
                // Tenta descriptografar
                let cipher = Aes256Gcm::new_from_slice(&ENCRYPTION_KEY);
                match cipher {
                    Ok(cipher) => {
                        match cipher.decrypt(&ENCRYPTION_NONCE.into(), encrypted_data.as_ref()) {
                            Ok(decrypted_data) => {
                                // Tenta deserializar
                                match bincode::deserialize::<String>(&decrypted_data) {
                                    Ok(_) => true,
                                    Err(_) => false,
                                }
                            }
                            Err(_) => false,
                        }
                    }
                    Err(_) => false,
                }
            }
            Err(_) => false,
        }
    } else {
        // Para arquivos não criptografados, apenas verifica se pode ser lido
        let file_path = format!("{}/{}", location_path, file_name_with_ext);
        fs::read_to_string(&file_path).is_ok()
    }
}

pub fn file_exists(location_path: &String, file_name_with_ext: &String) -> bool {
    let file_path = format!("{}/{}", location_path, file_name_with_ext);
    fs::metadata(file_path).is_ok()
}

pub fn get_instalation_path() -> String {
    let exe_path = std::env::current_exe().expect("Failed to get executable path");
    let installation_dir = exe_path.parent().expect(&format!(
        "Failed to get parent directory in '{:?}'",
        exe_path
    ));
    installation_dir.to_string_lossy().to_string()
}

pub fn get_document_path() -> String {
    let home_dir = dirs::home_dir().expect("Failed to get home directory");
    let document_dir = home_dir.join(format!("Documents/{}", APP_NAME));
    document_dir.to_string_lossy().to_string()
}
