import { getTestData, createPowerPoints } from "../_functions";

export const NAME = "Power Consumption";
const LIMIT = 25;
export const INITIAL = {
  power: [], // мощность
};
export async function refreshDB(raw) {
  const test_data = await getTestData(raw);
  let power = await createPowerPoints(test_data.power_data, LIMIT);

  return {power};
}
export async function refreshHW(points, hw_values) {
  let power = [...points];
  // добавление точки с приборов в массив
  power.push({
    x: power.length, //ttime,
    y1: hw_values.power,
    y2: hw_values.temper
  });
  return {power};
}

