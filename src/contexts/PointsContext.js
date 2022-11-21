
import { useEffect, useState, useCallback } from 'react';
import { createContainer } from 'react-tracked';

// import { useRecordContext } from './RecordContext';
import { useDatabase, updateDatabase } from './DatabaseContext';
import { useHardware } from './HardwareContext';
import { useTesting } from './TestingContext';


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

  /** отслеживаемое поле БД */
  const tracked_db = record[TRACKED_STATE];
  /** отслеживаемые поля значений с оборудования */
  const tracked_hw = hw_values[TRACKED_STATE];
  /** отслеживаемый флаг состояния испытания */
  const tracked_rd = states[TRACKED_STATE];
  /** отслеживаемый размер массива точек */
  const tracked_sz = points[Object.keys(INITIAL)[0]]?.length < POINTS_MAX;

  /** Функция передачи провайдеру БД комманды на сохранение точек,
   *  Передаётся в качестве callback в дочерние компоненты */
  const managePoints = useCallback((action) => {
    action === 'save points' &&
    manageRecord('save points', {...points});
  }, []);

  /** Точки получаемые из провайдера данных с оборудования */
  useEffect(() => {
    console.warn(`PointProvider HW values changed ${NAME}`);
    states.is_reading &&
    tracked_rd && tracked_sz &&
    refreshHW(points, tracked_hw).then(result => setPoints(result));    
  }, [tracked_hw]);
  
  /** Точки получаемые из провайдера БД */
  useEffect(() => {
    console.warn(`PointProvider DB record changed ${NAME}`);
    refreshDB([record.rawdata, tracked_db]).then(result => setPoints(result));
  }, [record.rawdata, tracked_db]);

  /** Запуск испытания - сброс точек */
  useEffect(() => {
    console.warn(`PointProvider ${NAME} reading changed -> ${tracked_rd}`);
    states.is_reading &&
    tracked_rd &&
    setPoints(INITIAL);
  }, [tracked_rd]);

  const color = NAME === "Pressure" ? 'green' : 'red'
  console.log(`%c +++ POINTS PROVIDER %c ${NAME} +++`, 'color: #5555ff', `color: ${color}`);
  return [points, managePoints];
}

export const {
  Provider: PointsProvider,
  useTrackedState: usePoints,
  useUpdate: updatePoints,
} = createContainer(PointsContext);
