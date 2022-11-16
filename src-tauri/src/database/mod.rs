extern crate rusqlite_helper;
// pub mod models_tcs;
pub mod models_seal;
pub mod processor_dta;

use std::fmt::Debug;

use rusqlite_helper::reading::{read_where, read_table, read_table_where};
use rusqlite_helper::writing::{write, write_table};
use rusqlite_helper::deleting::{delete, delete_table};
// use models_tcs::{Records, TLRow, Dictionary};
use models_seal::{Records, TLRow, Dictionary, SType};


pub fn get_testlist(db_path: &str, condition: &str) -> Vec<TLRow> {
  let result = read_table_where::<TLRow>(db_path, "Records", condition);
  _check_vec::<TLRow>(result, "RecordList")
}

pub fn get_record(db_path: &str, rec_id: i32) -> Vec<Records> {
  let cond = format!("ID={}", rec_id);
  let result = read_where::<Records>(db_path, cond.as_str());
  _check_vec::<Records>(result, format!("Record {}", &rec_id).as_str())
}
pub fn set_record(db_path: &str, record: &Records) -> bool {
  let fixed_record = _fix_test_points(record);
  let result = write(db_path, &fixed_record);
  _check_usize(result, "Record write")
}
pub fn del_record(db_path: &str, record: &Records) -> bool {
  let result = delete(db_path, record);
  _check_usize(result, "Record delete")
}

pub fn get_dict(db_path: &str, table: &str) -> Vec<Dictionary> {
  let result = read_table::<Dictionary>(db_path, &table);
  _check_vec::<Dictionary>(result, format!("dictionary {}", &table).as_str())
}
pub fn set_dict(db_path: &str, table: &str, dict: &Dictionary) -> bool {
  let result = write_table::<Dictionary>(db_path, table, dict);
  _check_usize(result, "Dictionary write")
}
pub fn del_dict(db_path: &str, table: &str, dict: &Dictionary) -> bool {
  let result = delete_table::<Dictionary>(db_path, table, dict);
  _check_usize(result, "Dictionary delete")
}

pub fn get_type(db_path: &str, table: &str) -> Vec<SType> {
  let result = read_table::<SType>(db_path, &table);
  _check_vec::<SType>(result, format!("sealtype {}", &table).as_str())
}
pub fn set_type(db_path: &str, table: &str, record: &SType) -> bool {
  let result = write_table::<SType>(db_path, table, record);
  _check_usize(result, "SealType write")
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
fn _floats_to_bytes(floats: Vec<f32>) -> Vec<u8> {
  let mut result = Vec::new();
  floats.iter().for_each(|x| { result.extend(x.to_le_bytes().iter()) });
  return result;
}
fn _fix_test_points(record: &Records) -> Records {
  let mut result = record.clone();
  if let Some(mut fixed_test_press) = result.test_press {
    fixed_test_press = fixed_test_press.replace('\"'," ");
    result.test_press = Some(fixed_test_press);
  }
  if let Some(mut fixed_test_power) = result.test_power {
    fixed_test_power = fixed_test_power.replace('\"'," ");
    result.test_power = Some(fixed_test_power);
  }

  return result;
}