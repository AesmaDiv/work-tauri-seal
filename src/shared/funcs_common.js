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
  console.warn("time", result);
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
  result.test_power.power = roundValue(result.test_power.torque * result.test_power.rpm / 63.025, 8);
  console.warn("RESULT >>", result);

  return result;
}