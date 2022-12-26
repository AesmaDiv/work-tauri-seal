export const PRESS_STYLE = {
  /* свойства осей */
  props_axis: {
    stroke: '#fff',
    strokeWidth: 2,
    type: 'number'
  },
  /** свойства зон пределов допустимых значений */
  props_area_limit: {
    stroke: 0,
    fill: "#707000",
    type: "monotone",
    animationDuration: 0,
    connectNulls: true
  },
  /** свойства подписей оси X */
  props_label_x: {
    value: 'время, сек',
    position: 'insideBottomRight',
    offset: -2
  },
  /** свойства подписей оси Y */
  props_label_y: {
    value: 'давление, кгс/см2',
    position: 'insideLeft',
    offset: 18,
    angle: -90,
    style: { textAnchor: 'middle' }
  },
}
export const POWER_STYLE = {
  /** свойства отрисовки графиков */
  props_colors: {
    power: "#8884d8",
    temper: "#82ca9d"
  },
  /* свойства осей */
  props_axis: {
    strokeWidth: 2,
    type: 'number',
    tickCount: 9,
  },
  /** свойства зон пределов допустимых значений */
  props_area_limit: {
    stroke: 0,
    fill: "#707000",
    type: "monotone",
    animationDuration: 0,
    connectNulls: true
  },
  /** свойства подписей оси X */
  props_label_x: {
    value: 'время, мин',
    position: 'insideBottomRight',
    offset: -2
  },
  /** свойства подписей оси Y */
  props_label_y: {
    offset: 7,
    style: { textAnchor: 'middle' }
  },
}
export const VIBR_STYLE = {
  /* свойства осей */
  props_axis: {
    stroke: '#fff',
    strokeWidth: 2,
    type: 'number'
  },
  /** свойства зон пределов допустимых значений */
  props_area_limit: {
    stroke: 0,
    fill: "#707000",
    type: "monotone",
    animationDuration: 0,
    connectNulls: true
  },
  /** свойства подписей оси X */
  props_label_x: {
    value: 'время, мин',
    position: 'insideBottomRight',
    offset: -2
  },
  /** свойства подписей оси Y */
  props_label_y: {
    value: 'вибрация, мм/с',
    position: 'insideLeft',
    offset: 18,
    angle: -90,
    style: { textAnchor: 'middle' }
  },
}