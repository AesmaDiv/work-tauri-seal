import { React, useState, createContext,
         useContext, useEffect, useRef} from 'react';


const HardwareContext = createContext();
export const useHardwareContext = () => { return useContext(HardwareContext) };

/** Провайдер контекста для данный с измерительных приборов */
export default function HardwareProvider({children}) {
  const [is_reading, setReading] = useState(false);
  const [hw_values, setHWValues] = useState({
    rpm:        0, // скорость вращения
    torque:     0, // момент
    power:      0, // мощность
    temper:     0, // температура
    press_sys:  0, // давление в системе
    press_top:  0, // давление верхней диафрагмы
    press_btm:  0  // давление нижней диафрагмы
  });

  const test_time = useRef(0);
  /** Обновление текущих точек */
  function _refreshHardwarePoints() {
    let timer = setTimeout(() => {
      if (is_reading) {
        const fnc = (val) => {
          let x = Math.random() - 0.5;
          x = x < 0 ? -x : x;
          let result = (val + x) > 2.5 ? val - x : val + x;
          return Math.round(result * 100) / 100;
        }
        // добавление случайной точки
        let new_values = {
          rpm:        fnc(hw_values.rpm),
          torque:     fnc(hw_values.torque),
          temper:     fnc(hw_values.temper),
          press_sys:  fnc(hw_values.press_sys),
          press_top:  fnc(hw_values.press_top),
          press_btm:  fnc(hw_values.press_btm),
        }
        new_values.ttime = ++test_time.current;
        new_values.power = new_values.torque * new_values.rpm / 63.025;
        setHWValues(new_values);
      }
    }, 10);
    return (() => {
      clearTimeout(timer)
    });
  }
  useEffect(() => _refreshHardwarePoints());

  /** Переключение состояния испытания */
  const switchReading = (state) => {
    console.warn("Switching running state, %o", state);
    !state && (() => test_time.current = 0)();
    setReading(state);
  }

  console.log("***HARDWARE-PROVIDER RENDER***");
  return (
    <HardwareContext.Provider value={{hw_values, is_reading, switchReading}}>
      {children}
    </HardwareContext.Provider>
  );
}