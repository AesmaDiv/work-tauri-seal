
import { useEffect, useRef, useState, useCallback } from 'react';
import { createContainer } from 'react-tracked';

// import { useRecordContext } from './RecordContext';
import { useDatabase, updateDatabase } from './DatabaseContext';
import { useHardware } from './HardwareContext';
import { useTesting } from './TestingContext';

import { createObj } from '../shared/functions';


const tracked_hw = 'press_top';
/** Провайдер точек для графиков испытаний
 * @param NAME      имя провайдера (для отображения в консоли)
 * @param INITIAL   объект для инициализации значения для точек
 * @param LIMIT     максимальное кол-во точек
 * @param refreshDB ассинхронная функция получения точек из БД
 * @param refreshHW ассинхронная функция получения точек с оборудования
 */
const PointsContext = ({NAME, POINTS_MAX, INITIAL, TRACKED_STATE, refreshDB, refreshHW}) => {
  // const {raw, save} = useRecordContext();
  const record = useDatabase();
  const manageRecord = updateDatabase();
  const hw_values = useHardware();
  const states = useTesting();
  const [points, setPoints] = useState(INITIAL);


  const managePoints = useCallback(action => {
   action.type === 'save' && manageRecord('save_points', points);
  }, []);

  /** отслеживаемое поле БД */
  const tracked_db = record.rawdata;
  /** отслеживаемые поля значений с оборудования */
  const tracked_hw   = Object.keys(INITIAL).map(k => hw_values[k]);
  /** отслеживаемый флаг состояния испытания */
  const tracked_read = states[TRACKED_STATE];
  /** отслеживаемый размер массива точек */
  const tracked_size = Object.keys(INITIAL).every(k => points[k].length < POINTS_MAX);

  /** Точки получаемые из провайдера БД */
  useEffect (() => {
    console.warn("PointsContext DB record changed", NAME);
    refreshDB(tracked_db).then(result => setPoints(result))
  }, [tracked_db])

  /** Точки получаемые из провайдера данных с оборудования */
  useEffect(() => {
    hw_values.is_reading &&
    tracked_read &&
    tracked_size &&
    refreshHW(points, hw_values).then(result => setPoints(result));

    console.warn("PointsContext HW values changed", NAME);
  }, [...tracked_hw]);

  useEffect(() => {
    hw_values.is_reading &&
    tracked_read &&
    setPoints(INITIAL);

    console.warn("PointsContext HW values reading ->", tracked_read);
  }, [tracked_read]);

  console.log(`+++ ${NAME} POINTS PROVIDER +++`);
  return [points, managePoints];
}

export const {
  Provider: PointsProvider,
  useTrackedState: usePoints,
  useUpdate: updatePoints,
} = createContainer(PointsContext);
