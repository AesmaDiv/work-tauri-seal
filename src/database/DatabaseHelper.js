import { invoke } from '@tauri-apps/api/tauri';

import { DBPATH } from './db_tables';


/** Запрос в бэкэнду - чтение списка записей */
export const readRecordList = async function(condition) {
  let result = [];
  let object = await invoke('read_testlist', {dbPath: DBPATH, condition: condition});
  if (Array.isArray(object)) {
    result.push(...object);
  } return result;
}
/** Запрос в бэкэнду - чтение таблицы типоразмеров */
export const readSealTypes = async function(condition) {
  let result = [];
  let object = await invoke('read_types', {dbPath: DBPATH, table: "SealTypes"});
  if (Array.isArray(object)) {
    result.push(...object);
  } return result;
}
/** Запрос в бэкэнду - чтение таблицы типа [ID, Name] */
export const readDictionary = async function(table) {
  let result = [];
  let object = await invoke('read_dictionary', {dbPath: DBPATH, table: table});
  if (Array.isArray(object)) {
    result.push(...object);
  } return result;
}
/** Запрос в бэкэнду - чтение записи */
export const readRecord = async function(rec_id) {
  let object = await invoke('read_record', {dbPath: DBPATH, recId: rec_id});
  return (object.length > 0) ? object[0] : {};
}
/** Запрос в бэкэнду - обновление записи */
export const updateRecord = async function(new_record) {
  console.warn("updating", new_record);
  let result = await invoke('write_record', {dbPath: DBPATH, record: new_record});
  return result;
}
/** Запрос в бэкэнду - удаление записи */
export const deleteRecord = async function(record) {
  let result = await invoke('delete_dictionary', {dbPath: DBPATH, table: "Records", dict: record});
  return result;
}