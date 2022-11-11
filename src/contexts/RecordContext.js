import { useContext, useState, startTransition } from "react";
import { createContext } from "react";

import { readRecord, updateRecord, deleteRecord } from "../database/DatabaseHelper";


const RecordContext = createContext();
export const useRecordContext = () => useContext(RecordContext);

export default function RecordProvider({children}) {
  const [record, setRecord] = useState({});

  const read = (recId) => {
    console.warn("RecordContext load");
    readRecord(recId).then(result => startTransition(() => setRecord(result)));
    // readRecord(recId).then(result => setRecord(result));
  }
  const update = (rec) => {
    console.warn("RecordContext update");
    updateRecord(rec).then(result => startTransition(() => setRecord(result)));
    // updateRecord(rec).then(result => setRecord(result));
  }
  const remove = (rec) => {
    console.warn("RecordContext delete");
    deleteRecord(rec).then(() =>  startTransition(() => setRecord({})));
    // deleteRecord(rec).then(() =>  setRecord({}));
  }

  return (
    <RecordContext.Provider value={{record, raw: record.rawdata, read, update, remove}}>
      {children}
    </RecordContext.Provider>
  )
}