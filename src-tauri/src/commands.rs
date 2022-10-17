use super::database as db;
// use super::database::models_tcs as mdl;
use super::database::models_seal as mdl;

#[tauri::command]
pub fn logging(message: String) {
  println!("Logging:: {:?}", message);
}

#[tauri::command]
pub fn read_testlist(condition: &str) -> Vec<mdl::TLRow> {
  db::get_testlist(condition)
}

#[tauri::command]
pub fn read_record(rec_id: i32) -> Vec<mdl::Tests> {
  db::get_record(rec_id)
}

#[tauri::command]
pub fn read_dictionary(table: &str) -> Vec<mdl::Dictionary> {
  db::get_dict(table)
}

#[tauri::command]
pub fn write_record(record: mdl::Tests) -> bool {
  db::set_record(&record)
}

#[tauri::command]
pub fn write_dictionary(table: &str, dict: mdl::Dictionary) -> bool {
  db::set_dict(table, &dict)
}

#[tauri::command]
pub fn delete_record(record: mdl::Tests) -> bool {
  println!("{:?}", record);
  db::del_record(&record)
}

#[tauri::command]
pub fn delete_dictionary(table: &str, dict: mdl::Dictionary) -> bool {
  db::del_dict(table, &dict)
}