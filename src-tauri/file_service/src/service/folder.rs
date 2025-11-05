use std::fs;
use std::path::Path;

use crate::helper::checker::check_exists;

pub fn create_recursive_folder(folder_path: &str) -> bool {
    if check_exists(folder_path) {
        return true;
    }

    let path = Path::new(folder_path);

    match fs::create_dir_all(path) {
        Ok(_) => true,
        Err(_) => false,
    }
}

pub fn get_folder_items(folder_path: &str) -> Result<Vec<String>, std::io::Error> {
    let mut items: Vec<String> = Vec::new();
    let entries = fs::read_dir(folder_path)?;

    for entry in entries {
        let entry = entry?;
        let item_name = entry.file_name().into_string().unwrap();
        items.push(item_name);
    }

    Ok(items)
}
