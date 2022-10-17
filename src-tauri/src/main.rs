#![cfg_attr(
  all(not(debug_assertions), target_os = "linux"),
  windows_subsystem = "windows"
)]

const DBPATH: &str = "/home/aesmadiv/Develop/Projects/Tauri/fresh-start/assets/seal.sqlite";

pub mod commands;
pub mod database;

fn main() {
  let context = tauri::generate_context!();
  tauri::Builder::default()
    .menu(if cfg!(target_os = "linux") {
      tauri::Menu::os_default(&context.package_info().name)
    } else {
      tauri::Menu::default()
    })
    .invoke_handler(tauri::generate_handler![
      commands::logging,
      commands::read_testlist,
      commands::read_record,
      commands::read_dictionary,
      commands::write_record,
      commands::write_dictionary,
      commands::delete_record,
      commands::delete_dictionary
    ])
    .run(context)
    .expect("error while running tauri application");
}