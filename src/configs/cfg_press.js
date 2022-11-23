import { getPointsData, _createPressPoints, _deserializePoints } from "../database/db_funcs";


export const PressProps = {
  NAME: "Pressure",
  TRACKED_STATE: 'test_press',
}
export const PRESS_DATANAMES = [
  {name: 'time',     label: 'Время испытания'},
  {name: 'press_sys', label: 'Давление в системе, кгс/м2'},
  {name: 'press_top', label: 'Давление верхней диафрагмы, кгс/м2'},
  {name: 'press_btm', label: 'Давление нижней диафрагмы, кгс/м2'}
];
export const PRESS_LIMITS = {
  top: [0.5, 2],
  btm: [1, 3]
}

const POINTS_MAX = 180;
const INITIAL = {
  press_top: [],  // давление верхней диафрагмы
  press_btm: []   // давление нижней диафрагмы
}

// export async function refreshPressDB(record) {
//   try {
//     const {rawdata, test_press} = record;
//     const from_raw = !test_press?.length;
//     console.warn('Getting PRESS point data from', from_raw ? 'raw' : 'json');
//     let points_data = from_raw ?
//       await getPointsData(rawdata) : 
//       deserializePoints(test_press);
//     const result = await createPressPoints(points_data, POINTS_MAX, from_raw);

//     return result;
//   } catch (err) {
//     console.warn(`!!! ERROR:: PressProps points reading failed:`, err);

//     return INITIAL;
//   }
// }

export function refreshPressHW(points, hw_values) {
  console.warn("refreshPressHW", points, hw_values);
  const len = points.press_top.length;
  if (len < POINTS_MAX) {
    let press_top = [...points.press_top, { x: len, y: hw_values.press_top }];
    let press_btm = [...points.press_btm, { x: len, y: hw_values.press_btm }];

    return { press_top, press_btm };
  }

  return points;
}