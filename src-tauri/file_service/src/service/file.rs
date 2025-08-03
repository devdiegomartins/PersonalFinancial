use std::{fs, io::Error};

use crypt_service::model::crypt::{Crypt, CryptTrait};

use super::folder::create_recursive_folder;

pub fn get_file(path_file: &str, buffer: &mut String) -> Result<(), Error> {
    let file: Vec<u8> = fs::read(path_file)?;
    let file_content: String = String::from_utf8(file).unwrap_or("Error reading file".to_string());
    *buffer = file_content;

    // TODO adicionar validação de leitura do arquivo binário com o bincode
    // TODO adicionar parse dos dados binários salvos para String descriptografando os dados contidos

    Ok(())
}

pub fn save_file(path: &str, file_name: &str, data: String) -> Result<(), Error> {
    let location: String = format!("{}/{}", path, file_name);
    create_recursive_folder(path);

    let data = Crypt::new(data, "key_parse");
    let data_bin = data.value.as_bytes().to_vec();

    fs::write(location, data_bin)?;

    // TODO bug identificado que quando é feito um salvamento ele não cria a pasta do arquivo informado caso ela não exista
    // TODO adicionar validação de escrita do arquivo binário com o bincode
    // TODO adicionar conversão de dados dinamicos vindos do "data" para string criptografando para o salvamento em binário

    Ok(())
}
