import { useContext, useState, useTransition, startTransition, useCallback } from "react";
import { createContext } from "react";

import { readRecord, updateRecord, deleteRecord } from "../database/DatabaseHelper";
import { addPressDataToRecord, addPowerDataToRecord } from "../shared/functions";


const RecordContext = createContext();
export const useRecordContext = () => useContext(RecordContext);

export default function RecordProvider({children}) {
  const [record, setRecord] = useState({});
  const [is_reading, startReading] = useTransition();

  const read = useCallback((recId) => {
    console.warn("RecordContext load");
    readRecord(recId).then(result => startReading(() => setRecord(result)));
  }, []);
  const update = useCallback((rec) => {
    console.warn("RecordContext update", rec);
    updateRecord(rec).then(result => read(rec.id));
  }, [read]);
  const remove = useCallback((rec) => {
    console.warn("RecordContext delete");
    deleteRecord(rec).then(() =>  startTransition(() => setRecord({})));
  }, []);
  const save = useCallback((points_data) => {
    console.warn("RecordContext saving points", points_data);
    if ('press_top' in points_data && 'press_btm' in points_data) {
      let new_record = addPressDataToRecord({...record}, points_data);
      console.warn(new_record.test_press);
      // update(new_record);
    } else if ('power' in points_data) {
      let new_record = addPowerDataToRecord({...record}, points_data);
      update(new_record);
    } else
    console.error("Точки испытания имеют неверный формат.", Object.keys(points_data))
  }, [record, update]);

  return (
    <RecordContext.Provider value={{record, raw: record.rawdata, is_reading, read, update, remove, save}}>
      {children}
    </RecordContext.Provider>
  )
}