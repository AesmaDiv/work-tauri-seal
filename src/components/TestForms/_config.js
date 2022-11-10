export const PRESS_DATANAMES = [
  {name: 'ttime',     label: 'Время испытания'},
  {name: 'press_sys', label: 'Давление в системе, кгс/м2'},
  {name: 'press_top', label: 'Давление верхней диафрагмы, кгс/м2'},
  {name: 'press_btm', label: 'Давление нижней диафрагмы, кгс/м2'}
];

export const POWER_DATANAMES = [
  {name: 'ttime',   label: 'Время испытания'},
  {name: 'rpm',     label: 'Скорость, мин−1'},
  {name: 'torque',  label: 'Момент, Н*м'},
  {name: 'power',   label: 'Мощность, кВт'},
  {name: 'temper',  label: 'Температура, °C'},
]

export const PRESS_LIMITS = {
  top: [0.5, 2],
  btm: [1, 3]
}
export const POWER_LIMITS = {
  power: 0.6,
  temper: 120
}

/** Cтруктура данных об испытаниях */
export class TestData {
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