import { useState, useEffect } from 'react';
import { createContainer } from 'react-tracked';


const PULLING_RATE = 1000; // период обновления в мс
const INITIAL = {
  is_reading: false,     // статус чтения
  ttime:      0,         // время испытания
  rpm:        0,         // скорость вращения
  torque:     0,         // момент
  power:      0,         // мощность
  temper:     0,         // температура
  press_sys:  0,         // давление в системе
  press_top:  0,         // давление верхней диафрагмы
  press_btm:  0          // давление нижней диафрагмы
}
/** Провайдер данных с оборудования */
function HardwareContext() {
  const [hw_values, setValues] = useState(INITIAL);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (hw_values.is_reading) {
        // Здесь должна быть функция чтения данных с оборудования,
        // а пока тут добавление случайных значений
        generateRandomHWValues(hw_values).then(
          result => setValues((prev) => ({...prev, ...result}))
        )
      }
    }, PULLING_RATE);
    return (() => clearTimeout(timer));
  })

  console.log("+++ HARDWARE PROVIDER RENDER +++");
  return [hw_values, setValues]
}

export const {
  Provider: HardwareProvider,
  useTrackedState: useHardware,
  useUpdate: updateHardware,
} = createContainer(HardwareContext);


/** Функция генерирования случайных значений для эмуляции работы оборудования */
async function generateRandomHWValues(hw_values) {
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