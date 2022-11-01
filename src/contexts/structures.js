/** Cтруктура данных об испытаниях */
export class TestData {
  constructor(power_data, press_top, press_btm) {
    this.power_data = power_data || {};
    this.press_top  = press_top || [];
    this.press_btm  = press_btm || [];
  }
}
/** Структура данных об испытании потребляемой мощности */
export class PowerData{
  constructor(psi, power, temp, etime) {
    this.etime  = etime;
    this.power  = power;
    this.psi    = psi;
    this.temp   = temp;
  }
}

/** Функция парсинга массива байт из БД в структуру данных об испытании */
export function getTestData(context) {
  const floats = _bytesToFloats(context.rawdata);

  return (floats) ?
    new TestData(
      _floatsToPowerData(floats.splice(0, 20 * 4)),
      floats.splice(0, 300),
      floats.splice(0, 300)
    ) : new TestData();
}

/** Функция создания массива точек для графика
 * давления диафрагмы из данных испытания */
export function createPressPoints(array, length) {
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
export function createPowerPoints(array, length) {
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

/** Функция генерирования следующего случайного значения */
export function generateNext(prev) {
  let x = Math.random() - 0.5;
  x = x < 0 ? -x : x;
  let result = (prev + x) > 2.5 ? prev - x : prev + x;
  return Math.round(result * 100) / 100;
}

/** Конвертация массива байт в массив float */
const _bytesToFloats = (rawdata) => {
  let result = [];
  if (rawdata) {
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