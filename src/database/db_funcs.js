import { RecordData, PowerData } from "./db_models";


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
export function serializePoints(data_name, points_data) {
  switch (data_name) {
    case 'test_press':
      return _serializePressPoints(points_data);
    case 'test_power':
      return _serializePowerPoints(points_data);
    default:
      console.error(`!!! ERROR:: Serializing ${data_name} points failed`)
  }
}

const _serializePressPoints = (points_data) => {
  let press_top = _extractFloat(points_data.press_top, 'y');
  let press_btm = _extractFloat(points_data.press_btm, 'y');
  let result = JSON.stringify({ press_top, press_btm }).replaceAll('"',"#");

  return result;
}
const _serializePowerPoints = (power_data) => {
  let time   = _extractFloat(power_data.power, 'x');
  let power  = _extractFloat(power_data.power, 'y1');
  let temper = _extractFloat(power_data.power, 'y2');
  let result = JSON.stringify({time, power, temper}).replace('"', "#");

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
const _extractFloat = (arr, key) => {
  console.warn(arr, key);
  return arr.map(el => key in el ? Math.round(el[key] * 10000.0) / 10000.0 : -1);
};