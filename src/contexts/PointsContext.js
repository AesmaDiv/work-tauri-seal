import { React, useState, createContext, useContext, useMemo, useEffect} from 'react';
import { useRecordContext } from './RecordContext';

import { getTestData, createPressPoints } from '../components/TestForms/aux_funcs';
import { CHART_LENGTH, LIMITS } from '../components/TestForms/Pressure/_config';


const PointsContext = createContext();

export const usePointsContext = () => { return useContext(PointsContext); }

export default function PointsProvider({children}) {
  const {record} = useRecordContext();
  const [points, setPoints] = useState({});

  /** Точки полученные из контекста */
  let context_points = useMemo(() => {
    console.log("Calculating context points");
    let test_data = getTestData(record);
    let press_top = createPressPoints(test_data?.press_top, CHART_LENGTH, LIMITS.top);
    let press_btm = createPressPoints(test_data?.press_btm, CHART_LENGTH, LIMITS.btm);

    return {press_top, press_btm};
  }, [record]);

  useEffect(() => {
    setPoints(context_points);
  },[]);

  const updatePoints = async () => {
    // let result = await updateRecord(new_record);
    // setContext(new_record);
    // setFlagUpdate(!flagUpdate);
  }

  console.log("***TEST-PROVIDER RENDER***");
  return (
    <PointsContext.Provider value={{points, updatePoints}}>
      {children}
    </PointsContext.Provider>
  );
}