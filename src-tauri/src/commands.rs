use super::database as db;
// use super::database::models_tcs as mdl;
use super::database::models_seal as mdl;


#[tauri::command]
pub fn logging(message: String) {
  println!("Logging:: {:?}", message);
}

#[tauri::command]
pub fn read_testlist(db_path: &str, condition: &str) -> Vec<mdl::TLRow> {
  db::get_testlist(db_path, condition)
}

#[tauri::command]
pub fn read_record(db_path: &str, rec_id: i32) -> Vec<mdl::Records> {
  db::get_record(db_path, rec_id)
}

#[tauri::command]
pub fn read_dictionary(db_path: &str, table: &str) -> Vec<mdl::Dictionary> {
  db::get_dict(db_path, table)
}

#[tauri::command]
pub fn read_types(db_path: &str, table: &str) -> Vec<mdl::SType> {
  db::get_type(db_path, table)
}

#[tauri::command]
pub fn write_record(db_path: &str, record: mdl::Records) -> bool {
  db::set_record(db_path, &record)
}

#[tauri::command]
pub fn write_dictionary(db_path: &str, table: &str, dict: mdl::Dictionary) -> bool {
  db::set_dict(db_path, table, &dict)
}

#[tauri::command]
pub fn delete_record(db_path: &str, record: mdl::Records) -> bool {
  db::del_record(db_path, &record)
}

#[tauri::command]
pub fn delete_dictionary(db_path: &str, table: &str, dict: mdl::Dictionary) -> bool {
  db::del_dict(db_path, table, &dict)
}