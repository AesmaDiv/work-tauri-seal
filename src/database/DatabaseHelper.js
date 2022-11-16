import { invoke } from '@tauri-apps/api/tauri';

import { DBPATH } from './db_tables';
import { RecordData, PowerData } from './models';


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


/** Функция парсинга массива байт из БД в структуру данных об испытании */
export async function getRecordData(rawdata) {
  const floats = _bytesToFloats(rawdata);

  return (floats) ?
    new RecordData(
      _floatsToPowerData(floats.splice(0, 20 * 4)),
      floats.splice(0, 300),
      floats.splice(0, 300)
    ) : new RecordData();
}
/** Функция создания массива точек для графика
 * давления диафрагмы из данных испытания */
export async function createPressPoints(array, length, from_raw = false ) {
  let result = [];
  let coef = from_raw ? 0.070307 : 1;
  if (array?.length && length > 0) {
    array.length = length;
    array.map(val => val > 0 ? val * coef : 0)
    .forEach((item, index) => {
      result.push({x: index, y: item})
    });
  }
  
  return result;
}
/** Функция создания массива точек для графика
 * потребляемой мощности из данных испытания */
export async function createPowerPoints(array, length) {
  let result = [];
  if (array?.length && length > 0) {
    if (array.length > length) array.length = length;
    array.filter(item => Object.values(item).some(val => val > 0))
    .forEach(item => {
      result.push({x: item.etime, y1: item.power, y2: item.temp})
    })
  }

  return result;
}
/** Конвертация точек графика испытания давления диафрагм
 * в массивы байт */
export function convertPressToBytes(points_data) {
  return {
    press_top: _floatsToBytes(points_data.press_top.map(({_, y}) => y)),
    press_btm: _floatsToBytes(points_data.press_btm.map(({_, y}) => y))
  }
}
/** Конвертация точек графика испытания потребляемой мощности
 * в массивы байт */
export function convertPowerToBytes(points_data) {
  return {
    power: _floatsToBytes(points_data.power.map(({_, y}) => y))
  }
}

/** Конвертация массива байт в массив float */
const _bytesToFloats = (rawdata) => {
  let result = [];
  if (rawdata?.length) {
    const data = rawdata.slice(0, 2720);
    for(let i = 0; i < data.length; i+=4) {
      let view = new DataView(new ArrayBuffer(4));
      let bytes = data.slice(i, i + 4).reverse();

      bytes.forEach((b, i) => view.setUint8(i, b));
      result.push(view.getFloat32(0));
    }
  }

  return result;
}
/** Конвертация массива float в массив байт */
const _floatsToBytes = (floats) => {
  let result = [];
  if (floats?.length) {
    let f_arr = new Float32Array(floats);
    let b_arr = new Uint8Array(f_arr.buffer);
    result = [...b_arr];
  }

  return result;
}
/** Парсинг массива float в структуру данных об потребляемой мощности */
const _floatsToPowerData = (floats) => {
  let result = [];
  for (let i = 0; i < floats.length; i+=4) {
    result.push(
      new PowerData(
        floats[i],
        floats[i + 1],
        floats[i + 2],
        floats[i + 3],
      )
    )
  }

  return result;
}