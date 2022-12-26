import { invoke } from "@tauri-apps/api";

export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export const nextDividingOn = (value, divider) => {
  if (value) {
    let exp = value.toExponential(2);
    let pow = +exp.slice(exp.indexOf('e') + 1) - 1;
    let val = Math.ceil(
      +exp
        .slice(0, 3)
        .replace('.','') / divider
    ) * divider * Math.pow(10, pow);

    return val;
  } else {
    return 10;
  }

}
export function getCurrentDate() {
  return new Date().toLocaleString("ru").replace(',','');
}

export function decimal2time(minutes_decimal) {
  let result = new Date(null)
  result.setSeconds(minutes_decimal * 60);
  return result.toISOString().slice(11,19);
}

export function createObj(keys) {
  return keys.reduce((obj, key) => {
    obj[key] = []; 
    return obj;
  }, {})
}

export function roundArray(floats, decnum) {
  let result = floats.map(x => roundValue(x, decnum));
  return result;
}

export function roundValue(float, decnum) {
  let pow = Math.pow(10, decnum);
  return Math.round(float * pow) / pow;
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
export async function getHardwareValues(hw_values) {
  const adam_data = await invoke('read_adam', {address: '10.10.10.11:502'});
  console.warn("ADAM DATA >>", adam_data);
  let result = {
    test_press: {
      time:       hw_values.test_press.time + 1,
      press_sys:  roundValue(adam_data[0].slot0[0] * 50.0 / 65535, 4),
      press_top:  roundValue(adam_data[0].slot0[1] * 50.0 / 65535, 4),
      press_btm:  roundValue(adam_data[0].slot0[2] * 50.0 / 65535, 4),
    },
    test_power: {
      time:       hw_values.test_power.time + 1,
      rpm:        roundValue(adam_data[0].slot0[3] * 5.0 / 65535, 4),
      torque:     roundValue(adam_data[0].slot0[4] * 5.0 / 65535, 4),
      temper:     roundValue(adam_data[0].slot0[5] * 5.0 / 65535, 4),
    },
  }
  result.test_power.power = Math.round(result.test_power.torque * result.test_power.rpm / 63.025 * 100) / 100;
  console.warn("RESULT >>", result);

  return result;
}

function _generateRandom(hw_values) {
  return {
    test_press: {
      time:       hw_values.test_press.time + 1,
      press_sys:  _generateNextValue(hw_values.test_press.press_sys),
      press_top:  _generateNextValue(hw_values.test_press.press_top),
      press_btm:  _generateNextValue(hw_values.test_press.press_btm),
    },
    test_power: {
      time:       hw_values.test_power.time + 1,
      rpm:        _generateNextValue(hw_values.test_power.rpm),
      torque:     _generateNextValue(hw_values.test_power.torque),
      temper:     _generateNextValue(hw_values.test_power.temper),
    },
  }
}
/** Функция генерирования следующего случайного значения */
function _generateNextValue(prev) {
  let x = Math.random() - 0.5;
  x = x < 0 ? -x : x;
  let result = (prev + x) > 2.5 ? prev - x : prev + x;
  return Math.round(result * 100) / 100;
}