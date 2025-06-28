pub mod constants;
mod domain;
mod infrastructure;
mod services;
mod utils;

slint::include_modules!();

pub fn run() {
    let main_window = MainWindow::new().unwrap();
    main_window.run().unwrap();
}
