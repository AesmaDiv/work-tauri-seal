import { useMemo, useRef} from 'react';
import { createContainer } from 'react-tracked';

import { getTestData, createPowerPoints } from '../structures';
import { useRecord } from '../RecordContext';
import { useHardware } from './HardwareContext';


const CHART_LENGTH = 25;
const INITIAL = {
  power:    [], // мощность
};

/** Провайдер точек для графика давления диафрагм */
const PowerPointsContext = () => {
  const {record} = useRecord();
  const hw_values = useHardware();
  const points = useRef({...INITIAL});

  /** Точки получаемые из провайдера БД */
  const record_points = useMemo(() => {
    console.warn("Refreshing RECORD points");
    const test_data = getTestData(record);
    let power   = createPowerPoints(test_data.power_data, CHART_LENGTH);

    return {power};
  }, [record]);

  /** Точки получаемые из провайдера данных с оборудования */
  const hardware_points = useMemo(() => {
    if (hw_values.is_reading) {
        // если достигнут лимит точек
      if (points.current.power.length < CHART_LENGTH) {
        // добавление точки с приборов в массив
        points.current.power.push({
          x: points.current.power.length, //ttime,
          y1: hw_values.power,
          y2: hw_values.temper
        });
      }
    } else {
      points.current = {...INITIAL};
    }
    let power   = [...points.current.power];

    return {power};
  }, [hw_values])

  console.log("+++ PRESS POINTS PROVIDER +++");
  return [hw_values.is_reading ? hardware_points : record_points];
}

export const {
  Provider: PowerPointsProvider,
  useTrackedState: usePowerPoints,
  useUpdate: updatePowerPoints,
} = createContainer(PowerPointsContext);