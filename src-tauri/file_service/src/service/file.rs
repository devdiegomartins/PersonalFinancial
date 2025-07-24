use std::{fs, io::Error};

pub fn get_file(path_file: &str, buffer: &mut String) -> Result<(), Error> {
    let file: Vec<u8> = fs::read(path_file)?;
    let file_content: String = String::from_utf8(file).unwrap_or("Error reading file".to_string());
    *buffer = file_content;

    // TODO adicionar validação de leitura do arquivo binário com o bincode
    // TODO adicionar parse dos dados binários salvos para String descriptografando os dados contidos

    Ok(())
}

pub fn save_file(path: &str, file_name: &str, data: Vec<u8>) -> Result<(), Error> {
    let location: String = format!("{}/{}", path, file_name);
    fs::write(location, data)?;

    // TODO adicionar validação de escrita do arquivo binário com o bincode
    // TODO adicionar conversão de dados dinamicos vindos do "data" para string criptografando para o salvamento em binário

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs;
    use std::path::Path;
    use tempfile::TempDir;

    #[test]
    fn test_save_file_success() {
        // Arrange
        let temp_dir = TempDir::new().unwrap();
        let path = temp_dir.path().to_str().unwrap();
        let file_name = "test_file.txt";
        let test_data = b"Hello, World!".to_vec();

        // Act
        let result = save_file(path, file_name, test_data);

        // Assert
        assert!(result.is_ok());

        // Verificar se o arquivo foi criado
        let file_path = format!("{}/{}", path, file_name);
        assert!(Path::new(&file_path).exists());

        // Verificar se o conteúdo está correto
        let content = fs::read(&file_path).unwrap();
        assert_eq!(content, b"Hello, World!");
    }

    #[test]
    fn test_save_file_with_empty_data() {
        // Arrange
        let temp_dir = TempDir::new().unwrap();
        let path = temp_dir.path().to_str().unwrap();
        let file_name = "empty_file.txt";
        let empty_data = Vec::new();

        // Act
        let result = save_file(path, file_name, empty_data);

        // Assert
        assert!(result.is_ok());

        let file_path = format!("{}/{}", path, file_name);
        assert!(Path::new(&file_path).exists());

        let content = fs::read(&file_path).unwrap();
        assert_eq!(content, Vec::<u8>::new());
    }

    #[test]
    fn test_save_file_invalid_path() {
        // Arrange
        let invalid_path = "/invalid/path/that/does/not/exist";
        let file_name = "test_file.txt";
        let test_data = b"Test data".to_vec();

        // Act
        let result = save_file(invalid_path, file_name, test_data);

        // Assert
        assert!(result.is_err());
    }

    #[test]
    fn test_get_file_success() {
        // Arrange
        let temp_dir = TempDir::new().unwrap();
        let path = temp_dir.path().to_str().unwrap();
        let file_name = "test_read.txt";
        let test_content = "Hello, this is a test file!";

        // Criar arquivo de teste
        let file_path = format!("{}/{}", path, file_name);
        fs::write(&file_path, test_content).unwrap();

        // Act
        let mut buffer = String::new();
        let result = get_file(&file_path, &mut buffer);

        // Assert
        assert!(result.is_ok());
        assert_eq!(buffer, test_content);
    }

    #[test]
    fn test_get_file_with_binary_data() {
        // Arrange
        let temp_dir = TempDir::new().unwrap();
        let path = temp_dir.path().to_str().unwrap();
        let file_name = "binary_test.bin";
        let binary_data = vec![0x48, 0x65, 0x6C, 0x6C, 0x6F]; // "Hello" em ASCII

        // Criar arquivo binário de teste
        let file_path = format!("{}/{}", path, file_name);
        fs::write(&file_path, &binary_data).unwrap();

        // Act
        let mut buffer = String::new();
        let result = get_file(&file_path, &mut buffer);

        // Assert
        assert!(result.is_ok());
        assert_eq!(buffer, "Hello");
    }

    #[test]
    fn test_get_file_with_invalid_utf8() {
        // Arrange
        let temp_dir = TempDir::new().unwrap();
        let path = temp_dir.path().to_str().unwrap();
        let file_name = "invalid_utf8.txt";
        let invalid_utf8_data = vec![0xFF, 0xFE, 0xFD]; // Dados UTF-8 inválidos

        // Criar arquivo com dados UTF-8 inválidos
        let file_path = format!("{}/{}", path, file_name);
        fs::write(&file_path, &invalid_utf8_data).unwrap();

        // Act
        let mut buffer = String::new();
        let result = get_file(&file_path, &mut buffer);

        // Assert
        assert!(result.is_ok());
        assert_eq!(buffer, "Error reading file"); // Deve retornar a mensagem de erro padrão
    }

    #[test]
    fn test_get_file_file_not_found() {
        // Arrange
        let non_existent_path = "/path/that/does/not/exist/file.txt";
        let mut buffer = String::new();

        // Act
        let result = get_file(non_existent_path, &mut buffer);

        // Assert
        assert!(result.is_err());
        assert!(buffer.is_empty()); // Buffer deve permanecer vazio
    }

    #[test]
    fn test_save_and_get_file_integration() {
        // Arrange
        let temp_dir = TempDir::new().unwrap();
        let path = temp_dir.path().to_str().unwrap();
        let file_name = "integration_test.txt";
        let original_content = "This is an integration test!";
        let test_data = original_content.as_bytes().to_vec();

        // Act - Salvar arquivo
        let save_result = save_file(path, file_name, test_data);
        assert!(save_result.is_ok());

        // Act - Ler arquivo
        let file_path = format!("{}/{}", path, file_name);
        let mut buffer = String::new();
        let get_result = get_file(&file_path, &mut buffer);

        // Assert
        assert!(get_result.is_ok());
        assert_eq!(buffer, original_content);
    }
}
