export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function getCurrentDate() {
  return new Date().toLocaleString("ru").replace(',','');
}

export function createObj(keys) {
  return keys.reduce((obj, key) => {
    obj[key] = []; 
    return obj;
  }, {})
}

export function roundArray(floats, decnum) {
  let pow = Math.pow(10, decnum);
  let result = floats.map(x => Math.round(x * pow) / pow);
  console.log(result);
  return result;
}

export function addPressDataToRecord(record, press_data) {
  let press_top = _extractFloat(press_data.press_top, 'y');
  let press_btm = _extractFloat(press_data.press_btm, 'y');

  let result = {press_top, press_btm};
  record.test_press = JSON.stringify(result);

  return record;
}

export function addPowerDataToRecord(record, power_data) {
  let time   = _extractFloat(power_data.power, 'x');
  let power  = _extractFloat(power_data.power, 'y1');
  let temper = _extractFloat(power_data.power, 'y2');
 
  let result = {time, power, temper};
  record.test_power = JSON.stringify(result);

  return record;
}
/** Функция генерирования случайных значений для давления диафрагм */
export function generateRandomPressValues() {
  let count = 0;
  (function loop() {
    setTimeout(() => {
      console.log("Generating press values: step %o", count);
      count += 1;
      (count < 100) && loop();
    }, 250);
  })();
}

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

/** Функция генерирования случайных значений для эмуляции работы оборудования */
export async function generateRandomHWValues(hw_values) {
  let result = {
    ttime:      hw_values.ttime + 1,
    rpm:        _generateNextValue(hw_values.rpm),
    torque:     _generateNextValue(hw_values.torque),
    temper:     _generateNextValue(hw_values.temper),
    press_sys:  _generateNextValue(hw_values.press_sys),
    press_top:  _generateNextValue(hw_values.press_top),
    press_btm:  _generateNextValue(hw_values.press_btm),
  }
  result.power = Math.round(result.torque * result.rpm / 63.025 * 100) / 100;

  return result;
}

/** Функция генерирования следующего случайного значения */
function _generateNextValue(prev) {
  let x = Math.random() - 0.5;
  x = x < 0 ? -x : x;
  let result = (prev + x) > 2.5 ? prev - x : prev + x;
  return Math.round(result * 100) / 100;
}

function _extractFloat (arr, key) {
  return arr.map(el => key in el ? Math.round(el[key] * 10000.0) / 10000.0 : -1);
};