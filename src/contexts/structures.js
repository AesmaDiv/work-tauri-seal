/** Cтруктура данных об испытаниях */
export class TestData {
  constructor(test_data, press_top, press_btm) {
    this.test_data = test_data || {};
    this.press_top = press_top || [];
    this.press_btm = press_btm || [];
  }
}
/** Структура данных об испытании потребляемой мощности */
export class PowerData{
  constructor(psi, power, temp, etime) {
    this.etime = etime;
    this.power = power;
    this.psi = psi;
    this.temp = temp;
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
    array.map(v => v > 0 ? v * 0.070307 : 0)
      .forEach((item, index) => {
        result.push({x: index, y: item})
    });
  }

  return result;
}

/** Функция добавления точки со случайным значением */
export function addRandomPoint(array) {
  console.log("Adding random point");
  let [num, step] = [100, 1]
  if (array.press_top === undefined) array = { press_top: [], press_btm: [] }
  else if (array.press_top.length > num) return array;
  let arr1 = [...array.press_top];
  let last = arr1.length ? arr1[arr1.length - 1] : {x: -step, y: 1.5};
  let rnd = (Math.random() - 0.5)  * 0.5;
  let newy = (last.y + rnd) < 0 ?
    0 :
    (last.y + rnd) > 2.5 ?
      2.5 :
      last.y + rnd;
  arr1.push({x: last.x + step, y: newy});
  
  let arr2 = [...array.press_btm];
  last = arr2.length ? arr2[arr2.length - 1] : {x: -step, y: 2};
  rnd = (Math.random() - 0.5)  * 0.5;
  newy = (last.y + rnd) < 0 ?
    0 :
    (last.y + rnd) > 2.5 ?
      2.5 :
      last.y + rnd;
  arr2.push({x: last.x + step, y: newy});

  return {
    press_top: arr1,
    press_btm: arr2
  };
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