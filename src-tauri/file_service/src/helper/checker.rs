use std::fs::exists;

pub fn check_exists(file_path: &str) -> bool {
    exists(file_path).unwrap_or(false)
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs;
    use std::fs::File;
    use std::io::Write;
    use tempfile::tempdir;

    #[test]
    fn test_check_exists_with_existing_file() {
        // Criar um arquivo temporário
        let temp_dir = tempdir().unwrap();
        let file_path = temp_dir.path().join("test_file.txt");

        // Criar o arquivo
        let mut file = File::create(&file_path).unwrap();
        writeln!(file, "test content").unwrap();

        // Testar se a função retorna true para arquivo existente
        assert!(check_exists(file_path.to_str().unwrap()));
    }

    #[test]
    fn test_check_exists_with_non_existing_file() {
        // Testar com um caminho que não existe
        let non_existing_path = "/caminho/que/nao/existe/arquivo.txt";
        assert!(!check_exists(non_existing_path));
    }

    #[test]
    fn test_check_exists_with_existing_directory() {
        // Criar um diretório temporário
        let temp_dir = tempdir().unwrap();
        let dir_path = temp_dir.path().join("test_dir");
        fs::create_dir(&dir_path).unwrap();

        // Testar se a função retorna true para diretório existente
        assert!(check_exists(dir_path.to_str().unwrap()));
    }

    #[test]
    fn test_check_exists_with_empty_string() {
        // Testar com string vazia - deve retornar false
        assert!(!check_exists(""));
    }

    #[test]
    fn test_check_exists_with_current_directory() {
        // Testar com o diretório atual (que sempre existe)
        assert!(check_exists("."));
    }

    #[test]
    fn test_check_exists_with_parent_directory() {
        // Testar com o diretório pai (que sempre existe)
        assert!(check_exists(".."));
    }
}
