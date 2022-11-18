import { getRecordData, createPressPoints } from "../database/db_funcs";


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
export const PressProps = {
  NAME: "Pressure",
  POINTS_MAX: 180,
  INITIAL: { 
    press_top: [],  // давление верхней диафрагмы
    press_btm: []   // давление нижней диафрагмы
  },
  TRACKED_STATE: 'test_press',
  refreshDB: async(tracked) => {
    let [raw, json] = tracked;
    try {
      const from_raw = !json?.length;
      let points_data = from_raw ?
        await getRecordData(raw) : 
        JSON.parse(json.replaceAll("#", '"'));
      let press_top = await createPressPoints(points_data?.press_top, PressProps.POINTS_MAX, from_raw);
      let press_btm = await createPressPoints(points_data?.press_btm, PressProps.POINTS_MAX, from_raw);

      return {press_top, press_btm};
    } catch (err) {
      console.warn(`!!! ERROR:: ${PressProps.NAME} points reading failed:`, err);
      return PressProps.INITIAL;
    }
  },
  refreshHW: async (points, hw_values) => {
    let press_top = [...points.press_top];
    let press_btm = [...points.press_btm];
    // добавление точки с приборов в массив
    press_top.push({
      x: press_top.length, //ttime,
      y: hw_values.press_top
    });
    press_btm.push({
      x: press_btm.length, //ttime,
      y: hw_values.press_btm
    });

    return {press_top, press_btm};
  }
}