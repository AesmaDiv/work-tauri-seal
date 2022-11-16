import { useState } from 'react';
import { createContainer } from 'react-tracked';

import { readRecord, updateRecord, deleteRecord } from '../database/DatabaseHelper';


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
