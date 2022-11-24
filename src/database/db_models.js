/** Cтруктура данных о точках испытаниях */
export const POINTS_STRUCT = {
  test_press: {
    press_top: [],
    press_btm: [],
  },
  test_power: {
    time:   [],
    temper: [],
    power:  [],
    thrust: [],
  },
};
// /** Структура данных об испытаниях общая */
// export class RecordData {
//   constructor(power_data, press_top, press_btm) {
//     this.power_data = power_data || {};
//     this.press_top  = press_top  || [];
//     this.press_btm  = press_btm  || [];
//   }
// }
// /** Структура данных об испытании потребляемой мощности */
// export class PowerData{
//   constructor(thrust, power, temper, time) {
//     this.thrust = thrust;
//     this.power  = power;
//     this.temper = temper;
//     this.time   = time;
//   }
// }