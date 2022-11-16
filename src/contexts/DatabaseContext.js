import { useState } from 'react';
import { createContainer } from 'react-tracked';

import { readRecord, updateRecord, deleteRecord } from '../database/DatabaseHelper';
import { addPressDataToRecord, addPowerDataToRecord } from '../shared/functions';


const INITIAL = {};

/** Провайдер данных из Базы данных */
function DatabaseContext() {
  const [record, setRecord] = useState(INITIAL);
  
  const manageRecord = (action, param) => {
    switch (action) {
      case 'read': {
        console.warn("DatabaseContext load");
        readRecord(param).then(result => setRecord(result));
        break;
      }
      case 'update': {
        console.warn("DatabaseContext update");
        // let modified = {...record, ...param}
        updateRecord(param).then(() => manageRecord('read', param.id));
        break;
      }
      case 'delete': {
        console.warn("DatabaseContext delete");
        deleteRecord(param).then(() =>  setRecord(INITIAL));
        break;
      }
      case 'save points': {
        console.warn("DataContext saving points", param);
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
  };

  console.log("+++ DATABASE PROVIDER RENDER +++");
  return [record, manageRecord]
}

export const {
  Provider: DatabaseProvider,
  useTrackedState: useDatabase,
  useUpdate: updateDatabase,
} = createContainer(DatabaseContext);
