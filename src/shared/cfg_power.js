// import { getPointsData, createPowerPoints, deserializePoints } from "../database/db_funcs";


export const POINTS_MAX = 25;
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

export function refreshPowerHW(points, hw_values) {
  // console.warn("refreshPowerHW", points, hw_values);
  const len = points.length;
  if (len < POINTS_MAX) points = [...points, {
    time: len,
    power:  hw_values.power + 0.2,
    temper: hw_values.temper + 23,
  }];

  return points;
}