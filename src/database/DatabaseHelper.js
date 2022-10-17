import { invoke } from '@tauri-apps/api/tauri';

export const readTestList = async function(condition) {
  let result = [];
  console.log("DATABASE reading testList...");
  let object = await invoke('read_testlist', {condition: condition});
  if (Array.isArray(object)) {
    result.push(...object);
  } else {
    console.error("Data is not an array of TestListRows.");
  }
  console.log("DATABASE reading testlist...done! Items count %o", result.length);
  return result;
}

export const readDictionary = async function(table) {
  console.log("DATABASE reading dictionary...");
  let result = [];
  let object = await invoke('read_dictionary', {table: table});
  if (Array.isArray(object)) {
    result.push(...object);
  } else {
    console.error("DATABASE Error: Data is not an Dictionary.");
  }
  console.log("DATABASE reading dictionary...done! Items count %o", result.length);
  return result;
}

export const readRecord = async function(rec_id) {
  console.log("DATABASE reading test record...");
  let result = [];
  let object = await invoke('read_record', {recId: rec_id});
  if (Array.isArray(object)) {
    result.push(...object);
  } else {
    console.error("DATABASE Error: Data is not an array of TestRecords.");
  }
  console.log("DATABASE reading test record...done! Items count %o", result.length);
  return result;
}

export const updateRecord = async function(new_record) {
  console.log("DATABASE updating test record...");
  let result = await invoke('write_record', {record: new_record});
  console.log("DATABASE updating test record...done! Result %o", result);
  return result;
}

export const deleteRecord = async function(record) {
  console.log("DATABASE deleting test record...");
  console.log("deleteRecord %o", record);
  let result = await invoke('delete_dictionary', {table: "Tests", dict: record});
  console.log("DATABASE deleting test record...done! Result %o", result);
  return result;
}