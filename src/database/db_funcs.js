import { POINTS_STRUCT } from "./db_models";


/** Функция получения объекта содержащего информацию о точках испытания из полей БД.
 *  Из полей содержащих сериализованные данные или бинарного поля RawData */
export async function getPointsFromRecord(record) {
  try {
    // получаю данные из raw поля
    let {test_press, test_power} = await _parseRawData(record.rawdata);
    // получаю данные из json полей
    let press_json = record.test_press;
    let power_json = record.test_power;

    // console.warn(`getPointsFromRecord >>
    //   \tPRESS comes from ${press_json ? 'json' : 'raw'}
    //   \tPOWER comes from ${power_json ? 'json' : 'raw'}`);

    const press_data = press_json ?
      JSON.parse(press_json.replaceAll("#", '"')) :
      test_press;

    const power_data = power_json ?
      JSON.parse(power_json.replaceAll("#", '"')) :
      test_power;

    test_press = await _createPressPoints(press_data, 180, !press_json?.length);
    test_power = await _createPowerPoints(power_data, 10);

    return { test_press, test_power };
  } catch (err) {
    console.warn(`!!! ERROR:: points reading failed:`, err);
    return POINTS_STRUCT;
  }
}
/** Функция сериализации точек испытания для последующего сохранения в БД */
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

/** Функция парсинга массива байт из БД в структуру данных об испытании */
async function _parseRawData(rawdata) {
  const floats = _bytesToFloats(rawdata);
  if (floats) {
    return {
      // !!! Тут очень важен порядок, тк splice вырезает из массива
      // !!! указанное количество значения с 0-го индекса
      // первые 20 * 4 значений относятся к испытанию потребляемой мощности
      // следующие 300(!?) давление верхней диафрагмы посекундно
      // последние 300(?!) давление нижней диафрагмы посекундно
      test_power: {
        ..._floatsToPowerData(floats.splice(0, 20 * 4))
      },
      test_press: {
        press_top: floats.splice(0, 300),
        press_btm: floats.splice(0, 300),
      }
    }
  }

  return POINTS_STRUCT;
}
/** Функция создания массива точек для графика
 * давления диафрагмы из данных испытания */
async function _createPressPoints(points_data, length, from_raw = false ) {
  const parse = (array) => {
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
  const result = {
    press_top: parse(points_data.press_top),
    press_btm: parse(points_data.press_btm)
  }

  return result;
}
/** Функция создания массива точек для графика
 * потребляемой мощности из данных испытания */
async function _createPowerPoints(point_data, length) {
  let result = [];
  if (point_data?.time.length && length > 0) {
    point_data?.time.map((value, i) => {
      result.push({
        x:  value,
        y1: point_data?.power[i],
        y2: point_data?.temper[i],
        y3: point_data?.thrust[i],
      })
    })
  }

  return result;
}


const _serializePressPoints = (points_data) => {
  let press_top = _extractFloat(points_data.press_top, 'y');
  let press_btm = _extractFloat(points_data.press_btm, 'y');
  let result = JSON.stringify({ press_top, press_btm }).replaceAll('"',"#");

  return result;
}
const _serializePowerPoints = (power_data) => {
  let time   = _extractFloat(power_data, 'x');
  let power  = _extractFloat(power_data, 'y1');
  let temper = _extractFloat(power_data, 'y2');
  let thrust = _extractFloat(power_data, 'y3')
  let result = JSON.stringify({ time, power, thrust, temper }).replaceAll('"', "#");

  return result;
}
/** Парсинг массива float в структуру данных об потребляемой мощности */
const _floatsToPowerData = (floats) => {
  let result = {
    time:   [],
    power:  [],
    thrust: [],
    temper: [],    
  };
  let temp = [];
  for (let i = 0; i < floats.length; i+=4) {
    temp.push({
      thrust: floats[i],
      power:  floats[i + 1],
      temper: floats[i + 2],
      time:   floats[i + 3],
    })
  }
  temp = temp.filter((el, idx) => idx === 0 || el.time > 0).forEach(el => {
    result.time.push(el.time);
    result.power.push(el.power);
    result.thrust.push(el.thrust);
    result.temper.push(el.temper);
  })

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
const _extractFloat = (arr, key) =>
  arr.map(el => key in el ?
    Math.round(el[key] * 10000.0) / 10000.0 :
    -1
  );