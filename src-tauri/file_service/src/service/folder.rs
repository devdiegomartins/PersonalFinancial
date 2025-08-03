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
