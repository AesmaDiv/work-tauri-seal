import { useRef, useMemo } from 'react';
import { createContainer } from 'react-tracked';

import { useRecord } from '../RecordContext';
import { useHardware} from './HardwareContext';
import { getTestData, createPressPoints } from '../structures';

const CHART_LENGTH = 180;
const INITIAL = {
  press_top: [],    // давление верхней диафрагмы
  press_btm: []     // давление нижней диафрагмы
}

/** Провайдер точек для графика давления диафрагм */
const PressPointsContext = () => {
  const {record} = useRecord();
  const hw_values = useHardware();
  const points = useRef({...INITIAL});

  /** Точки получаемые из провайдера БД */
  const record_points = useMemo(() => {
    console.warn("Refreshing RECORD points");
    const test_data = getTestData(record);
    let press_top = createPressPoints(test_data?.press_top, CHART_LENGTH);
    let press_btm = createPressPoints(test_data?.press_btm, CHART_LENGTH);
    
    return {press_top, press_btm};
  }, [record]);

  /** Точки получаемые из провайдера данных с оборудования */
  const hardware_points = useMemo(() => {
    if (hw_values.is_reading) {
      if (points.current.press_top.length < CHART_LENGTH) {
        // добавление точки с приборов в массив
        points.current.press_top.push({
          x: points.current.press_top.length, //ttime,
          y: hw_values.press_top
        })
        points.current.press_btm.push({
          x: points.current.press_btm.length, //ttime,
          y: hw_values.press_btm
        });
      }
    } else {
      points.current = {...INITIAL};
    }
    let press_top = [...points.current.press_top];
    let press_btm = [...points.current.press_btm];
    return {press_top, press_btm};
  }, [hw_values])

  console.log("+++ PRESS POINTS PROVIDER +++");
  return [hw_values.is_reading ? hardware_points : record_points];
}

export const {
  Provider: PressPointsProvider,
  useTrackedState: usePressPoints,
  useUpdate: updatePressPoints,
} = createContainer(PressPointsContext);
