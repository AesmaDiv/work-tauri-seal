import { useState, useEffect } from 'react';
import { createContainer } from 'react-tracked';

import { generateNext } from '../structures';


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
        let new_values = {
          ttime:      hw_values.ttime + 1,
          rpm:        generateNext(hw_values.rpm),
          torque:     generateNext(hw_values.torque),
          temper:     generateNext(hw_values.temper),
          press_sys:  generateNext(hw_values.press_sys),
          press_top:  generateNext(hw_values.press_top),
          press_btm:  generateNext(hw_values.press_btm),
        }
        new_values.power = Math.round(new_values.torque * new_values.rpm / 63.025 * 100) / 100;
        setValues((prev) => ({...prev, ...new_values}));
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
