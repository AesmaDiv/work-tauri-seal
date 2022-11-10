
import { useState, useEffect} from 'react';
import { createContainer } from 'react-tracked';

import { useHardware } from './HardwareContext';
import { useRecordContext } from './RecordContext';


/** Провайдер точек для графиков испытаний
 * @param NAME      -> имя провайдера (для отображения в консоли)
 * @param INITIAL   -> объект для инициализации значения для точек
 * @param LIMIT     -> максимальное кол-во точек
 * @param refreshDB -> ассинхронная функция получения точек из БД
 * @param refreshHW -> ассинхронная функция получения точек с оборудования
 */
export const PointsContext = ({NAME, LIMIT, INITIAL, refreshDB, refreshHW}) => {
  const {raw} = useRecordContext();
  const hw_values = useHardware();
  const [points, setPoints] = useState(INITIAL);

  /** Точки получаемые из провайдера БД */
  useEffect (() => {
    console.warn("PointsContext useEffect rawdata");
    refreshDB(raw).then(result => setPoints(result))
  }, [raw])

  /** Точки получаемые из провайдера данных с оборудования */
  useEffect(() => {
    console.warn("PointsContext useEffect hw_values");
    if (hw_values.is_reading) {
      // если достигнут лимит точек
      if (Object.keys(INITIAL).every(k => points[k].length < LIMIT)) {
        refreshHW(points, hw_values).then(result => setPoints(result));
      }
    }
  }, [...Object.keys(INITIAL).map(k => hw_values[k])]);

  useEffect(() => {
    console.warn("PointsContext useEffect is_reading");
    if (hw_values.is_reading) setPoints({...INITIAL});
  }, [hw_values.is_reading]);

  console.log(`+++ ${NAME} POINTS PROVIDER +++`);
  return [points];
}

export const {
  Provider: PointsProvider,
  useTrackedState: usePoints,
  useUpdate: updatePoints,
} = createContainer(PointsContext);
