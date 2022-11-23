// import { getPointsData, createPowerPoints, deserializePoints } from "../database/db_funcs";


export const PowerProps = {
  NAME: "Power Consumption",
  TRACKED_STATE: 'test_power',
}
export const POWER_DATANAMES = [
  {name: 'time',   label: 'Время испытания'},
  {name: 'rpm',     label: 'Скорость, мин−1'},
  {name: 'torque',  label: 'Момент, Н*м'},
  {name: 'power',   label: 'Мощность, кВт'},
  {name: 'temper',  label: 'Температура, °C'},
]
export const POWER_LIMITS = {
  power: 0.6,
  temper: 120
}

const POINTS_MAX = 25;
const INITIAL = { 
  power: [],
};

// export async function refreshPowerDB(record) {
//   try {
//     const {rawdata, test_power} = record;
//     const from_raw = !test_power?.length;
//     console.warn('Getting POWER point data from', from_raw ? 'raw' : 'json');
//     let points_data = from_raw ?
//       (await getPointsData(rawdata)).power_data :
//       deserializePoints(test_power);
//     const result = await createPowerPoints(points_data, POINTS_MAX);

//     return result;
//   } catch (err) {
//     console.warn(`!!! ERROR:: Power points reading failed:`, err);
//     return INITIAL;
//   }
// }
export async function refreshPowerHW(points, hw_values) {
  let power = [...points];
  // добавление точки с приборов в массив
  power.push({
    x: power.length, //ttime,
    y1: hw_values.power,
    y2: hw_values.temper
  });

  return { power };
}