extern crate rusqlite_helper;
// pub mod models_tcs;
pub mod models_seal;
use std::fmt::Debug;

use rusqlite_helper::reading::{read_where, read_table, read_table_where};
use rusqlite_helper::writing::{write, write_table};
use rusqlite_helper::deleting::{delete, delete_table};
// use models_tcs::{Tests, TLRow, Dictionary};
use models_seal::{Tests, TLRow, Dictionary};


pub fn get_testlist(condition: &str) -> Vec<TLRow> {
  let result = read_table_where::<TLRow>(super::DBPATH, "Tests", condition);
  _check_vec::<TLRow>(result, "TestList")
}

pub fn get_record(rec_id: i32) -> Vec<Tests> {
  let cond = format!("ID={}", rec_id);
  let result = read_where::<Tests>(super::DBPATH, cond.as_str());
  _check_vec::<Tests>(result, format!("Record {}", &rec_id).as_str())
}
pub fn set_record(record: &Tests) -> bool {
  let result = write(super::DBPATH, record);
  _check_usize(result, "Record write")
}
pub fn del_record(record: &Tests) -> bool {
  let result = delete(super::DBPATH, record);
  _check_usize(result, "Record delete")
}

pub fn get_dict(table: &str) -> Vec<Dictionary> {
  let result = read_table::<Dictionary>(super::DBPATH, &table);
  _check_vec::<Dictionary>(result, format!("dictionary {}", &table).as_str())
}
pub fn set_dict(table: &str, dict: &Dictionary) -> bool {
  let result = write_table::<Dictionary>(super::DBPATH, table, dict);
  _check_usize(result, "Dictionary write")
}
pub fn del_dict(table: &str, dict: &Dictionary) -> bool {
  let result = delete_table::<Dictionary>(super::DBPATH, table, dict);
  _check_usize(result, "Dictionary delete")
}

fn _check_usize(result_to_check: Result<usize, rusqlite::Error>, message: &str) -> bool {
  if result_to_check.is_ok() {
    let result = result_to_check.unwrap() > 0;
    println!("{} {}", 
      message,
      if result { "successfully" } else { "failed" }
    );
    result
  } else {
    println!("Error occured during {} => {:?}", message, result_to_check.unwrap_err());
    false
  }
}
fn _check_vec<T: Debug>(result_to_check: Result<Vec<T>, rusqlite::Error>, message: &str) -> Vec<T> {
  if result_to_check.is_ok() {
    println!("Loading {} successfully", message);
    result_to_check.unwrap()
  } else {
    println!("Loading {} failed: {:?}", message, result_to_check.unwrap_err());
    Vec::new()
  }
}