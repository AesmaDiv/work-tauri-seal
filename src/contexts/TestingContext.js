import { useReducer } from 'react';
import { createContainer } from 'react-tracked';


/** Флаги управления испытаниями */
const FLAGS = {
  test_press: false,
  test_power: false
};
/** Провайдер данных из Базы данных */
function TestingContext() {
  const [states, manageStates] = useReducer((state, action) => {
    console.warn(`Testing state changes: ${action.type} -> ${action.param}`);
    switch (action.type) {
      case 'test_press': {
        return {...state, test_press: action.param};
      }
      case 'test_power': {
        return {...state, test_power: action.param};
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
