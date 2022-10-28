import { React, useState, createContext, useContext} from 'react';
import { readRecord, updateRecord, deleteRecord } from '../database/DatabaseHelper';

const RecordContext = createContext();

export const useRecordContext = () => { return useContext(RecordContext); }

export default function RecordProvider({children}) {
  const [context, setContext] = useState({});
  const [flagUpdate, setFlagUpdate] = useState(true);

  const loadContext = async (rec_id) => {
    let result = await readRecord(rec_id);
    if (result.length !== 0) setContext(result[0]);
  }

  const updateContext = async (new_record) => {
    let result = await updateRecord(new_record);
    console.log("Record update result: %o", result);
    setContext(new_record);
    setFlagUpdate(!flagUpdate);
  }

  const deleteContext = async (record) => {
    let result = await deleteRecord(record);
    setContext({});
    setFlagUpdate(!flagUpdate);
    return result;
  }

  console.log("***TEST-PROVIDER RENDER***");
  return (
    <RecordContext.Provider value={{context, flagUpdate, loadContext, updateContext, deleteContext}}>
      {children}
    </RecordContext.Provider>
  );
}