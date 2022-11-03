import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

import { readRecord, updateRecord, deleteRecord } from '../database/DatabaseHelper';


const INITIAL = {};

/** Провайдер данных из Базы данных */
function DatabaseContext() {
  const [record, manageRecord] = useReducer((state, action) => {
    switch (action.type) {
      case 'load': {
        readRecord(action.param).then(result => {
          manageRecord({
            type: 'loaded',
            param: result
          });
        });
        return state;
      }
      case 'loaded': {
        return action.param;
      }
      case 'update': {
        updateRecord(action.param).then(() => {});
        return state;
      }
      case 'delete': {
        deleteRecord(action.param).then(() =>  {});
        return INITIAL;
      }
      default:
        return state;
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
