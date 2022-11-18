import { useCallback, useState } from 'react';
import { createContainer } from 'react-tracked';

import { readRecord, updateRecord, deleteRecord } from '../database/DatabaseHelper';
import { addPressDataToRecord, addPowerDataToRecord } from '../database/db_funcs';


const INITIAL = {};

/** Провайдер данных из Базы данных */
function DatabaseContext() {
  const [record, setRecord] = useState(INITIAL);
  
  const manageRecord = useCallback((action, param) => {
    switch (action) {
      case 'read': {
        console.warn("DatabaseProvider record read");
        readRecord(param).then(result => setRecord(result));
        break;
      }
      case 'update': {
        console.warn("DatabaseProvider record update");
        // let modified = {...record, ...param}
        updateRecord(param).then(() => manageRecord('read', param.id));
        break;
      }
      case 'delete': {
        console.warn("DatabaseProvider record delete");
        deleteRecord(param).then(() =>  setRecord(INITIAL));
        break;
      }
      case 'save points': {
        console.warn("DataProvider record saving points", param);
        if ('press_top' in param && 'press_btm' in param) {
          manageRecord('update', addPressDataToRecord({id: record.id}, param));
        } else if ('power' in param) {
          manageRecord('update', addPowerDataToRecord({id: record.id}, param));
          // let new_record = ;
        }
        break;
      }
      default:{
        console.warn("DatabaseContext default");
        throw new Error();
      }
    }
  },[]);

  console.log("%c +++ DATABASE PROVIDER RENDER +++", 'color: #55aa55');
  return [record, manageRecord]
}

export const {
  Provider: DatabaseProvider,
  useTrackedState: useDatabase,
  useUpdate: updateDatabase,
} = createContainer(DatabaseContext);
