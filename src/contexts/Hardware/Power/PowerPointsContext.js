import { React, createContext, useContext, useMemo, useRef} from 'react';

import { TestData, getTestData, createPressPoints } from '../../structures';
import { useRecordContext } from '../../RecordContext';
import { useHardwareContext } from '../HardwareContext';
import { CHART_LENGTH } from '../../../components/TestForms/_config';


const PowerPointsContext = createContext();
export const usePowerPointsContext = () => { return useContext(PowerPointsContext); }

/** Провайдер контекста для точек */
export default function PowerPointsProvider({children}) {
  // контекс из провайдера значений данных БД
  const {context} = useRecordContext();
  // контекст из провайдера значений с приборов
  const {power_values, is_running, switchRunning} = useHardwareContext();


  /** Точки полученые с измерительных приборов */
  const hardware_points = useRef({
    ttime:    [], // время
    rpm:      [], // скорость
    torque:   [], // момент
    power:    [], // мощность
    temper:   [], // темперутура
  });
  /** Короткая ссылка на hardware_points.current */
  let hpc = hardware_points.current;
  if (is_running) {
    // если достигнут лимит точек
    if (hpc.rpm.length > CHART_LENGTH) {
      // прекращаем испытание
      switchRunning(false);
    } else {
      // добавление точки с приборов в массив
      Object.keys(hpc).forEach(key => {
        hpc[key].push({
          x: hpc[key].length,
          y: power_values[key]
        });
      })
    }
  }

  let test_data = useRef(new TestData());
  /** Точки полученные из контекста */
  const context_points = useMemo(() => {
    console.warn("Reseting hardware points");
    hardware_points.current = {ttime: [], rpm: [], torque: [], power: [], temper: []};
    console.warn("Calculating context points");
    test_data.current = getTestData(context);
    let rpm     = createPressPoints(test_data.current?.rpm,     CHART_LENGTH);
    let torque  = createPressPoints(test_data.current?.torque,  CHART_LENGTH);
    let power   = createPressPoints(test_data.current?.power,   CHART_LENGTH);
    let temper  = createPressPoints(test_data.current?.temper,  CHART_LENGTH);

    return {rpm, torque, power, temper};
  }, [context]);

  const savePoints = () => {
    console.warn("Saving power consumption points");
    // console.warn("TestData %o", test_data);
    // test_data.current.rpm = current_points.rpm.map(el => el.y);
    // test_data.current.torque = current_points.torque.map(el => el.y);
    // console.warn("TestData %o", test_data);
  }

  /** точки, отправляющиеся в компонент графика для отрисовки */
  const points = hpc.rpm.length ?
    hpc :
    context_points;
  /** скорость анимации графика */
  const animation = is_running? 0 : 200;

  console.log("***POWER POINTS-PROVIDER RENDER***");
  return (
    <PowerPointsContext.Provider value={{points, animation, savePoints}}>
      {children}
    </PowerPointsContext.Provider>
  );
}