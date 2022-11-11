import { RecordData, PowerData } from "./_config";

/** Функция добавления информации для пределов */
export function addLimits(array, limits, length) {
  if (!array) return [];

  let result = [...array];
  const props = {
    limit_top: [limits[1], limits[1] + 0.5],
    limit_btm: [0, limits[0]]
  }
  let first = result.findIndex(el => el.x === 0);
  if (first >= 0) {
    result[first] = {...result[first], ...props};
  } else {
    result.unshift({x: 0, ...props})
  }
  result.push({x: length, ...props})

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