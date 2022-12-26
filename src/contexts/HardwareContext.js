import { useState, useEffect, useCallback, startTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createContainer } from 'react-tracked';
import { getHardwareValues } from '../shared/funcs_common';
import { updatePoints } from '../redux/recordReducer';


const PULLING_RATE = 250; // период обновления в мс
const INITIAL = {
  test_press: {         // ДАВЛЕНИЕ ДИАФРАГМ
    time:       0,      // время испытания
    press_sys:  0,      // давление в системе
    press_top:  0,      // давление верхней диафрагмы
    press_btm:  0,      // давление нижней диафрагмы
  },
  test_power: {         // ПОТРЕБЛЯЕМАЯ МОЩНОСТЬ
    time:       0,
    rpm:        0,      // скорость вращения
    torque:     0,      // момент
    temper:     0,      // температура
    power:      0,      // мощность
  },
}

/** Провайдер данных с оборудования */
function HardwareContext() {
  const dispatch = useDispatch();
  const { is_reading, test_press, test_power } = useSelector(state => state.testingReducer);
  const [hw_values, setValues] = useState(INITIAL);

  useEffect(() => {
    if (is_reading) {
      const state_name = test_press ? 'test_press' : test_power ? 'test_power' : undefined;
      state_name && dispatch(updatePoints({ state_name, state_value: hw_values[state_name]}));
    }
  }, [hw_values]);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (is_reading) {
        // Здесь должна быть функция чтения данных с оборудования,
        // а пока тут добавление случайных значений
        getHardwareValues(hw_values)
          .then(result => startTransition(() =>setValues((prev) => ({...prev, ...result}))));
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