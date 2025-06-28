use std::fs;

pub fn save(location_path: &String, file_name_with_ext: &String, data: &String) -> bool {
    let file_path = format!("{}/{}", location_path, file_name_with_ext);
    fs::write(&file_path, data).expect("Failed to write file");
    if fs::metadata(&file_path).is_ok() {
        true
    } else {
        false
    }
}

pub fn read(location_path: &String, file_name_with_ext: &String) -> String {
    let file_path = format!("{}/{}", location_path, file_name_with_ext);
    fs::read_to_string(file_path).expect("Failed to read file")
}
