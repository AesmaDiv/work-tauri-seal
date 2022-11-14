/** Cтруктура данных об испытаниях */
export class RecordData {
  constructor(power_data, press_top, press_btm) {
    this.power_data = power_data || {};
    this.press_top  = press_top || [];
    this.press_btm  = press_btm || [];
  }
}
/** Структура данных об испытании потребляемой мощности */
export class PowerData{
  constructor(psi, power, temp, etime) {
    this.etime  = etime;
    this.power  = power;
    this.psi    = psi;
    this.temp   = temp;
  }
}