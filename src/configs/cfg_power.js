import { getRecordData, createPowerPoints } from "../database/DatabaseHelper";


export const POWER_DATANAMES = [
  {name: 'ttime',   label: 'Время испытания'},
  {name: 'rpm',     label: 'Скорость, мин−1'},
  {name: 'torque',  label: 'Момент, Н*м'},
  {name: 'power',   label: 'Мощность, кВт'},
  {name: 'temper',  label: 'Температура, °C'},
]
export const POWER_LIMITS = {
  power: 0.6,
  temper: 120
}
export const PowerProps = {
  NAME: "Power Consumption",
  POINTS_MAX: 25,
  INITIAL: {
    power: [], // мощность
  },
  TRACKED_STATE: 'power_test',
  refreshDB: async(raw) => {
    const test_data = await getRecordData(raw);
    let power = await createPowerPoints(test_data.power_data, PowerProps.POINTS_MAX);

    return {power};
  },
  refreshHW: async(points, hw_values) => {
    let power = [...points];
    // добавление точки с приборов в массив
    power.push({
      x: power.length, //ttime,
      y1: hw_values.power,
      y2: hw_values.temper
    });

    return {power};
  }
}