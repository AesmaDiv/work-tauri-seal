import { invoke } from '@tauri-apps/api/tauri';

import { DBPATH } from './db_tables';
import { RecordData, PowerData } from './models';


export const readRecordList = async function(condition) {
  let result = [];
  let object = await invoke('read_testlist', {dbPath: DBPATH, condition: condition});
  if (Array.isArray(object)) {
    result.push(...object);
  } return result;
}

export const readSealTypes = async function(condition) {
  let result = [];
  let object = await invoke('read_types', {dbPath: DBPATH, table: "SealTypes"});
  if (Array.isArray(object)) {
    result.push(...object);
  } return result;
}

export const readDictionary = async function(table) {
  let result = [];
  let object = await invoke('read_dictionary', {dbPath: DBPATH, table: table});
  if (Array.isArray(object)) {
    result.push(...object);
  } return result;
}

export const readRecord = async function(rec_id) {
  let object = await invoke('read_record', {dbPath: DBPATH, recId: rec_id});
  return (object.length > 0) ? object[0] : {};
}

export const updateRecord = async function(new_record) {
  let result = await invoke('write_record', {dbPath: DBPATH, record: new_record});
  return result;
}

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
export async function createPressPoints(array, length) {
  let result = [];
  if (array?.length && length > 0) {
    array.length = length;
    array.map(val => val > 0 ? val * 0.070307 : 0)
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