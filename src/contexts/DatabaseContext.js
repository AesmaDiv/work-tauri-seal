import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

import { readRecord, updateRecord, deleteRecord } from '../database/DatabaseHelper';


const INITIAL = {};

/** Провайдер данных из Базы данных */
function DatabaseContext() {
  const [record, manageRecord] = useReducer((state, action) => {
    switch (action.type) {
      case 'load': {
        console.warn("DatabaseContext load");
        readRecord(action.param).then(result => {
          manageRecord({
            type: 'loaded',
            param: result
          });
        });
        return state;
      }
      case 'loaded': {
        console.warn("DatabaseContext loaded");
        return action.param;
      }
      case 'update': {
        console.warn("DatabaseContext update");
        updateRecord(action.param).then(() => {});
        return state;
      }
      case 'delete': {
        console.warn("DatabaseContext delete");
        deleteRecord(action.param).then(() =>  {});
        return INITIAL;
      }
      default:{
        console.warn("DatabaseContext default");
        throw new Error();
      }
    }
  }, INITIAL);

  console.log("+++ DATABASE PROVIDER RENDER +++");
  return [record, manageRecord]
}

export const {
  Provider: DatabaseProvider,
  useTrackedState: useDatabase,
  useUpdate: updateDatabase,
} = createContainer(DatabaseContext);
