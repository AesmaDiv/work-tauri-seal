import { useReducer } from 'react';
import { createContainer } from 'react-tracked';


/** Флаги управления испытаниями */
const FLAGS = {
  press_test: false,
  power_test: false
};
/** Функция управления флагами
 * @param state - текущие флаги
 * @param action - передаваемый объект вида: {type: ?, param: ?}, где
 * - <i>type</i> имя изменяемого флага
 * - param новое значение
 */
const reducer = (state, action) => {
  console.warn("TestingContext: ", action);
  switch (action.type) {
    case 'press_test': {
      return {...state, press_test: action.param};
    }
    case 'power_test': {
      return {...state, power_test: action.param};
    }
    default:{
      console.warn("Testing default");
      throw new Error();
    }
  }
}

/** Провайдер данных из Базы данных */
function TestingContext() {
  const [states, manageStates] = useReducer(reducer, FLAGS);

  console.log("+++ TESTNING PROVIDER RENDER +++");
  return [states, manageStates]
}

export const {
  Provider: TestingProvider,
  useTrackedState: useTesting,
  useUpdate: updateTesting,
} = createContainer(TestingContext);
