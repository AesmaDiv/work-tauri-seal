import { getRecordData, createPowerPoints } from "../database/db_funcs";


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
export const PowerProps = {
  NAME: "Power Consumption",
  POINTS_MAX: 25,
  INITIAL: { power: [] }, // мощность
  TRACKED_STATE: 'test_power',
  refreshDB: async(tracked) => {
    try {
      const [raw, json] = tracked;
      let points_data = json?.length ?
      JSON.parse(
        json
        .replace('press_top', '"press_top"')
        .replace('press_btm', '"press_btm"')
        ) :
        await getRecordData(raw);
      let power = await createPowerPoints(points_data?.power_data, PowerProps.POINTS_MAX);

      return {power};
    } catch (err) {
      console.warn(`!!! ERROR:: ${PowerProps.NAME} points reading failed:`, err);
      return PowerProps.INITIAL;
    }
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