import { React, createContext, useContext, useState, useMemo, useRef, useEffect} from 'react';

import { useRecordContext } from '../../RecordContext';
import { useHardwareContext } from '../HardwareContext';
import { TestData, getTestData, createPressPoints } from '../../structures';
import { CHART_LENGTH } from '../../../components/TestForms/_config';
import { usePressValuesContext } from './PressValuesContext';


const _clearPoints = () => { 
  return {
    press_top: [], // верхняя диафрагма
    press_btm: []  // нижняя диафрагма
  }
}

const PressPointsContext = createContext();
export const usePressPointsContext = () => { return useContext(PressPointsContext); }

/** Провайдер контекста для точек */
export default function PressPointsProvider({children}) {
  // контекс из провайдера значений данных БД
  const {context} = useRecordContext();
  // контекст из провайдера значений с приборов
  const {values, is_reading, switchReading} = usePressValuesContext();


  /** Точки полученые с измерительных приборов */
  const ref_hw_points = useRef(_clearPoints());
  /** Короткая ссылка нв hardware_points.current */
  let hardware_points = ref_hw_points.current;
  if (is_reading) {
    // если достигнут лимит точек
    if (hardware_points.press_top.length > CHART_LENGTH) {
      switchReading(false);
    } else {
      if (values.ttime) hardware_points = _clearPoints();
      // добавление точки с приборов в массив
      hardware_points.press_top.push({
        x: values.ttime,
        y: values.press_top
      })
      hardware_points.press_btm.push({
        x: values.ttime,
        y: values.press_btm
      })
    }
  }

  let test_data = useRef(new TestData());
  /** Точки полученные из контекста */
  const record_points = useMemo(() => {
    console.warn("Calculating context points");
    test_data.current = getTestData(context);
    let press_top = createPressPoints(test_data.current?.press_top, CHART_LENGTH);
    let press_btm = createPressPoints(test_data.current?.press_btm, CHART_LENGTH);

    return {press_top, press_btm};
  }, [context]);

  // const points = is_active ? hpc : record_points;

  const savePoints = () => {
    console.warn("Saving pressure points");
    // console.warn("TestData %o", test_data);
    // test_data.current.press_top = current_points.press_top.map(el => el.y);
    // test_data.current.press_btm = current_points.press_btm.map(el => el.y);
    // console.warn("TestData %o", test_data);
  }


  console.log("***PRESS POINTS-PROVIDER RENDER***");
  return (
    <PressPointsContext.Provider value={{ points: record_points, savePoints }}>
      {children}
    </PressPointsContext.Provider>
  );
}