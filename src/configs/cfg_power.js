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