import { useState, useEffect } from 'react';
import { createContainer } from 'react-tracked';
import { generateRandomHWValues } from '../shared/funcs_common';


const PULLING_RATE = 1000; // период обновления в мс
const INITIAL = {
  is_reading: false,  // статус чтения
  test_press: {       // ДАВЛЕНИЕ ДИАФРАГМ
    time:       0,    // время испытания
    press_sys:  0,    // давление в системе
    press_top:  0,    // давление верхней диафрагмы
    press_btm:  0,    // давление нижней диафрагмы
  },
  test_power: {       // ПОТРЕБЛЯЕМАЯ МОЩНОСТЬ
    time:       0,
    rpm:        0,    // скорость вращения
    torque:     0,    // момент
    temper:     0,    // температура
    power:      0,    // мощность
  },
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