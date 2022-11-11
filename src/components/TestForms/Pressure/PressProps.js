import { getRecordData, createPressPoints } from "../_functions";

export const NAME = "Pressure";
export const LIMIT = 180;
export const INITIAL = {
  press_top: [],  // давление верхней диафрагмы
  press_btm: []   // давление нижней диафрагмы
}
export const TRACKED_STATE = 'press_test';
export async function refreshDB(raw) {
  const test_data = await getRecordData(raw);
  let   press_top = await createPressPoints(test_data?.press_top, LIMIT);
  let   press_btm = await createPressPoints(test_data?.press_btm, LIMIT);

  return {press_top, press_btm};
}
export async function refreshHW(points, hw_values) {
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