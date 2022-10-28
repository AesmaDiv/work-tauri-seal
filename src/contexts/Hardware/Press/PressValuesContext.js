import { React, createContext, useContext } from 'react';
import { useHardwareContext } from '../HardwareContext';


const PressValuesContext = createContext();
export const usePressValuesContext = () => { return useContext(PressValuesContext) };

/** Провайдер контекста для данный с измерительных приборов */
export default function PressValuesProvider({children}) {
  const {hw_values, is_reading, switchReading} = useHardwareContext();

  const values = (({ ttime, press_sys, press_top, press_btm }) =>
  ({ ttime, press_sys, press_top, press_btm }))(hw_values);

  console.log("***PRESS VALUES-PROVIDER RENDER***");
  return (
    <PressValuesContext.Provider value={{values, is_reading, switchReading}}>
      {children}
    </PressValuesContext.Provider>
  );
}