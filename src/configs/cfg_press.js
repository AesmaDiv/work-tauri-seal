import { getRecordData, createPressPoints } from "../database/db_funcs";


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

export async function refreshPressDB(record) {
  let {rawdata, test_press} = record;
  try {
    const from_raw = !test_press?.length;
    let points_data = from_raw ?
      await getRecordData(rawdata) : 
      JSON.parse(test_press.replaceAll("#", '"'));
    let press_top = await createPressPoints(points_data?.press_top, POINTS_MAX, from_raw);
    let press_btm = await createPressPoints(points_data?.press_btm, POINTS_MAX, from_raw);

    return { press_top, press_btm };
  } catch (err) {
    console.warn(`!!! ERROR:: PressProps points reading failed:`, err);

    return INITIAL;
  }
}

export function refreshPressHW(points, hw_values) {
  const len = points.press_top.length;
  if (len < POINTS_MAX) {
    let press_top = [...points.press_top, { x: len, y: hw_values.press_top }];
    let press_btm = [...points.press_btm, { x: len, y: hw_values.press_btm }];

    return { press_top, press_btm };
  }

  return points;
}