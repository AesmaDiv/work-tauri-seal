import { React, useState, createContext, useContext, useRef} from 'react';
import { readRecord, updateRecord, deleteRecord } from '../database/DatabaseHelper';

const TestContext = createContext();

export const useTestContext = () => { return useContext(TestContext); }

export const TestProvider = ({children}) => {
  const [context, setContext] = useState({});
  const [flagUpdate, setFlagUpdate] = useState(true);

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
    setFlagUpdate(!flagUpdate);
    console.log("Flag is %o", flagUpdate);
  }

  const deleteContext = async (record) => {
    console.log("TEST-PROVIDER deleting record...");
    console.log("deleteContext %o", record);
    let result = await deleteRecord(record);
    setContext({});
    console.log("TEST-PROVIDER deleting record...done! %o", result);
    setFlagUpdate(!flagUpdate);
    return result;
  }

  console.log("***TEST-PROVIDER RENDER***");
  return (
    <TestContext.Provider value={{context, flagUpdate, loadContext, updateContext, deleteContext}}>
      {children}
    </TestContext.Provider>
  );
}