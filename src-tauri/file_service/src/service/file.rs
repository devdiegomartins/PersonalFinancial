use super::folder::create_recursive_folder;
use crypt_service::model::crypt::{Crypt, CryptTrait};
use std::{env, fs, io::Error};

static APP_KEY_PARSE: &str = "key_parse";

pub async fn get_bin_file(path_file: &str, buffer: &mut String) -> Result<(), Error> {
    let conf = bincode::config::standard();
    let file: Vec<u8> = fs::read(path_file)?;
    let file_decoded = match bincode::decode_from_slice(&file, conf) {
        Ok((data, _)) => data,
        Err(e) => return Err(Error::new(std::io::ErrorKind::Other, e.to_string())),
    };
    let file_content: String =
        String::from_utf8(file_decoded).unwrap_or("Error reading file".to_string());
    *buffer = file_content;

    Ok(())
}

pub async fn get_bin_files(path_files: Vec<String>, buffer: &mut Vec<String>) -> Result<(), Error> {
    for path_file in path_files {
        let mut file_buffer: String = String::new();
        get_bin_file(&path_file, &mut file_buffer).await?;
        buffer.push(file_buffer);
    }

    Ok(())
}

pub fn save_bin_file(path: &str, file_name: &str, data: String) -> Result<(), Error> {
    let location: String = format!(
        "{}/{}.{}",
        path,
        file_name,
        env::var("APP_FILE_EXT").unwrap_or("pfinan".to_string())
    );

    if !create_recursive_folder(path) {
        return Err(Error::new(
            std::io::ErrorKind::Other,
            "Error creating recursive folders".to_string(),
        ));
    }

    let data = Crypt::new(
        data,
        env::var("SIGN_PRIVATE").unwrap_or(APP_KEY_PARSE.to_string()),
    );
    let data_bin = data.value.as_bytes().to_vec();

    fs::write(location, data_bin)?;

    Ok(())
}
