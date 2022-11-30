export const PRESS_STYLE = {
  // общие свойства
  props_common: {
    width: "100%",
    height: "50%",
    animation: 300
  },
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
    fill: 'white',
    offset: -2
  },
  /** свойства подписей оси Y */
  props_label_y: {
    value: 'давление, кгс/см2',
    position: 'insideLeft',
    fill: 'white',
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
  props_area: {
    animationDuration: 300,
    type: 'monotone'
  },
  /* свойства осей */
  props_axis: {
    stroke: '#fff',
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
    value: 'время, сек',
    position: 'insideBottomRight',
    fill: 'white',
    offset: -2
  },
  /** свойства подписей оси Y */
  props_label_y: {
    fill: 'white',
    offset: 7,
    style: { textAnchor: 'middle' }
  },
}
