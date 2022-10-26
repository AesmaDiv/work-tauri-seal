import { React, useState, createContext, useContext, useMemo, useEffect, useRef} from 'react';
import { useRecordContext } from './RecordContext';

import { CHART_LENGTH, LIMITS } from '../components/TestForms/Pressure/_config';


const PointsContext = createContext();

export const usePointsContext = () => { return useContext(PointsContext); }

export default function PointsProvider({children}) {
  const {context} = useRecordContext();
  const [is_running, setRunning] = useState(false);
  const [current_points, setCurrentPoints] = useState({
    press_top:[], press_btm: []
  });

  /** Точки полученные из контекста */
  const context_points = useMemo(() => {
    console.warn("Calculating context points");
    let test_data = getTestData(context);
    let press_top = createPressPoints(test_data?.press_top, CHART_LENGTH, LIMITS.top);
    let press_btm = createPressPoints(test_data?.press_btm, CHART_LENGTH, LIMITS.btm);
    
    return {press_top, press_btm};
  }, [context]);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (is_running) {
        let current = addRandomPoint(current_points);
        setCurrentPoints(current);
      }
    }, 200);
    return (() => {
      clearTimeout(timer)
    });
  });

  const switchRunning = (state) => {
    console.warn("Switching running state");
    setRunning(state);
  }

  const points = is_running ? current_points : context_points;
  console.warn("Actual points %o", points.press_top);
  console.log("***POINTS-PROVIDER RENDER***");
  return (
    <PointsContext.Provider value={{points, switchRunning}}>
      {children}
    </PointsContext.Provider>
  );
}

/** Функция парсинга массива байт из БД в структуру данных об испытании */
function getTestData(context) {
  function TestData(psi, power, temp, etime) {
    this.etime = etime;
    this.power = power;
    this.psi = psi;
    this.temp = temp;
  }
  const _bytesToFloats = () => {
    let result = [];
    if (context.rawdata) {
      const data = context.rawdata.slice(0, 2720);
      for(let i = 0; i < data.length; i+=4) {
        let view = new DataView(new ArrayBuffer(4));
        let bytes = data.slice(i, i + 4).reverse();

        bytes.forEach((b, i) => view.setUint8(i, b));
        result.push(view.getFloat32(0));
      }
    }

    return result;
  }
  const _floatsToTestData = (floats) => {
    let result = [];
    for (let i = 0; i < floats.length; i+=4) {
      result.push(
        new TestData(
          floats[i],
          floats[i + 1],
          floats[i + 2],
          floats[i + 3],
        )
      )
    }

    return result;
  }
  const _processRawData = () => {
    const floats = _bytesToFloats();
    if (floats) {
      return (floats) ? {
        testdata: _floatsToTestData(floats.splice(0, 20 * 4)),
        press_top: floats.splice(0, 300),
        press_btm: floats.splice(0, 300)
      } : {}
    };
  }


  return _processRawData();
}

/** Функция создания массива точек для графика
 * давления диафрагмы из данных испытания */
function createPressPoints(array, length, limits) {
  let result = [];
  if (array?.length && length > 0) {
    array.length = length;
    array.map(v => v > 0 ? v * 0.070307 : 0)
      .forEach((item, index) => {
        result.push({
          x: index, y: item,
          limit_btm: [0, limits[0]],
          limit_top: [limits[1], limits[1] + 0.5]})
    });
  }

  return result;
}

/** Функция добавления точки со случайным значением */
function addRandomPoint(array) {
  console.log("Adding random point");
  if (array.press_top === undefined) array = { press_top: [], press_btm: [] }
  else if (array.press_top.length >= 4) return array;
  let arr1 = [...array.press_top];
  let last = arr1.length ? arr1[arr1.length - 1] : {x: -10, y: 1.5};
  let rnd = (Math.random() - 0.5)  * 0.5;
  let newy = (last.y + rnd) < 0 ?
    0 :
    (last.y + rnd) > 2.5 ?
      2.5 :
      last.y + rnd;
  arr1.push({x: last.x + 10, y: newy});
  
  let arr2 = [...array.press_btm];
  last = arr2.length ? arr2[arr2.length - 1] : {x: -10, y: 2};
  rnd = (Math.random() - 0.5)  * 0.5;
  newy = (last.y + rnd) < 0 ?
    0 :
    (last.y + rnd) > 2.5 ?
      2.5 :
      last.y + rnd;
  arr2.push({x: last.x + 10, y: newy});

  return {
    press_top: arr1,
    press_btm: arr2
  };
}