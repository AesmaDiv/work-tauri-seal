import { _createPressPoints, _deserializePoints } from "../database/db_funcs";


export const POINTS_MAX = 180;
export const PressProps = {
  NAME: "Pressure",
  TRACKED_STATE: 'test_press',
}
export const PRESS_DATANAMES = [
  {name: 'time',      label: 'Время испытания'},
  {name: 'press_sys', label: 'Давление в системе, кгс/м2'},
  {name: 'press_top', label: 'Давление верхней диафрагмы, кгс/м2'},
  {name: 'press_btm', label: 'Давление нижней диафрагмы, кгс/м2'}
];
export const PRESS_LIMITS = {
  top: [0.5, 2],
  btm: [1, 3]
}
/** максимальные значения оси Y */
export const AXIS_MAX = {
  top: PRESS_LIMITS.top[1] + 0.5,
  btm: PRESS_LIMITS.btm[1] + 0.5,
};

export function refreshPressHW(points, hw_values) {
  // console.warn("refreshPressHW", points, hw_values);
  const len = points.length;
  if (len < POINTS_MAX) points = [...points, {
    time: len,
    press_top: hw_values.press_top,
    press_btm: hw_values.press_btm,
  }];

  return points;
}

/** Функция добавления информации для пределов */
export function addLimits(points) {
  return [{
    time: 0,
    press_top_limit_up: [PRESS_LIMITS.top[1], AXIS_MAX.top],
    press_top_limit_dw: [0, PRESS_LIMITS.top[0]],
    press_btm_limit_up: [PRESS_LIMITS.btm[1], AXIS_MAX.btm],
    press_btm_limit_dw: [0, PRESS_LIMITS.btm[0]],
  }, ...points, {
    time: POINTS_MAX,
    press_top_limit_up: [PRESS_LIMITS.top[1], AXIS_MAX.top],
    press_top_limit_dw: [0, PRESS_LIMITS.top[0]],
    press_btm_limit_up: [PRESS_LIMITS.btm[1], AXIS_MAX.btm],
    press_btm_limit_dw: [0, PRESS_LIMITS.btm[0]],
  }];
}