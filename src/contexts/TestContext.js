import { React, useState, createContext, useContext, useEffect} from 'react';
import { readRecord, updateRecord, deleteRecord } from '../database/DatabaseHelper';

const TestContext = createContext();

export const useTestContext = () => { return useContext(TestContext); }

export const TestProvider = ({children}) => {
  const [context, setContext] = useState({});
  const [flag, setFlag] = useState(true);

  const loadContext = async (rec_id) => {
    console.log("TEST-PROVIDER loading record %o...", rec_id);
    let result = await readRecord(rec_id);
    if (result.length !== 0) setContext(result[0]);
    console.log("TEST-PROVIDER loading record...done! %o", result[0]);
  }

  const updateContext = async (new_record) => {
    console.log("TEST-PROVIDER updating record...");
    let result = await updateRecord(new_record);
    setContext(new_record);
    console.log("TEST-PROVIDER updating record...done! %o", result);
    setFlag(!flag);
    console.log("Flag is %o", flag);
  }

  const deleteContext = async (record) => {
    console.log("TEST-PROVIDER deleting record...");
    console.log("deleteContext %o", record);
    let result = await deleteRecord(record);
    setContext({});
    console.log("TEST-PROVIDER deleting record...done! %o", result);
    setFlag(!flag);
    return result;
  }

  console.log("***TEST-PROVIDER RENDER***");
  return (
    <TestContext.Provider value={{record: context, flag, loadContext, updateContext, deleteContext}}>
      {children}
    </TestContext.Provider>
  );
}