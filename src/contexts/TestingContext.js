import { useReducer } from 'react';
import { createContainer } from 'react-tracked';


/** Флаги управления испытаниями */
const FLAGS = {
  press_test: false,
  power_test: false
};
/** Провайдер данных из Базы данных */
function TestingContext() {
  const [states, manageStates] = useReducer((state, action) => {
    console.warn(`Testing state changes: ${action.type} -> ${action.param}`);
    switch (action.type) {
      case 'press_test': {
        return {...state, press_test: action.param};
      }
      case 'power_test': {
        return {...state, power_test: action.param};
      }
      default:{
        throw new Error();
      }
    }
  }, FLAGS);

  console.log("+++ TESTNING PROVIDER RENDER +++");
  return [states, manageStates]
}

export const {
  Provider: TestingProvider,
  useTrackedState: useTesting,
  useUpdate: updateTesting,
} = createContainer(TestingContext);
