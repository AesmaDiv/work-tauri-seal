import { React, useState, createContext, useContext} from 'react';
import { useHardwareContext } from '../HardwareContext';


const PowerValuesContext = createContext();
export const usePowerValuesContext = () => { return useContext(PowerValuesContext) };

/** Провайдер контекста для данный с измерительных приборов */
export default function PowerValuesProvider({children}) {
  const [hw_values, is_reading, switchReading] = useHardwareContext();
  const [values, setValues] = useState(
    (({ ttime, rpm, torque, power, temper }) =>
    ({ ttime, rpm, torque, power, temper }))(hw_values));

  console.log("***PRESS VALUES-PROVIDER RENDER***");
  return (
    <PowerValuesContext.Provider value={{values, is_reading, switchReading}}>
      {children}
    </PowerValuesContext.Provider>
  );
}