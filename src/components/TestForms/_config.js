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

/** Функция добавления информации для пределов */
export function addLimits(array, limits, length) {
  if (!array) return [];

  let result = [...array];
  const props = {
    limit_top: [limits[1], limits[1] + 0.5],
    limit_btm: [0, limits[0]]
  }
  let first = result.findIndex(el => el.x === 0);
  if (first >= 0) {
    result[first] = {...result[first], ...props};
  } else {
    result.unshift({x: 0, ...props})
  }
  result.push({x: length, ...props})

  return result;
}