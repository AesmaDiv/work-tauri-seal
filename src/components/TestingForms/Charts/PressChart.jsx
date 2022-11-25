import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Area } from 'recharts';
import { Legend, ResponsiveContainer } from 'recharts';
import { Stack } from '@mui/system';

import { useSelector } from 'react-redux';
import { PRESS_LIMITS } from '../../../configs/cfg_press';
import { addLimits } from '../../../shared/funcs_common';


/** максимальное значение оси X */
const TIME_LIMIT = 180;
/** максимальные значения оси Y */
const AXIS_MAX = {
  top: PRESS_LIMITS.top[1] + 0.5,
  btm: PRESS_LIMITS.btm[1] + 0.5,
};

/** Компонент графиков давления диафрагм */
export default function PressureCharts() {
  const points = useSelector(state => state.recordReducer.points.test_press)

  // точки с добавлением пределов допусков
  const [press_top, press_btm] = [
    addLimits(points?.press_top, PRESS_LIMITS.top, TIME_LIMIT),
    addLimits(points?.press_btm, PRESS_LIMITS.btm, TIME_LIMIT)
  ];

  // общие свойства
  const props = {
    width: "100%",
    height: "50%",
    animation: 300
  }
  console.log("%c --- CHARTS RENDER %c Pressure ---", 'color: #9999ff', 'color: green');
  // console.warn(points);
  return (
    <Stack sx={{width: '80%', height: '100%'}} direction='column'>
      <PressChart {...props} name='верхняя диафрагма' color='#88f888'
        domain={[0, AXIS_MAX.top]} data={press_top}/>
      <PressChart {...props} name='нижняя диафрагма' color='#8888f8'
        domain={[0, AXIS_MAX.btm]} data={press_btm}/>
    </Stack>
  );
}

/** Компонент графика давления диафрагмы */
function PressChart(props) {
  // свойства для используемых компонентов
  const props_axis =  {
    stroke: '#fff',
    strokeWidth: 2,
    type: 'number'
  };
  const props_area_limit = {
    stroke: 0,
    fill: "#707000",
    type: "monotone",
    animationDuration: 0,
    connectNulls: true
  };
  const props_label_x = { 
    value: 'время, сек',
    position: 'insideBottomRight',
    fill: 'white',
    offset: -2
  };
  const props_label_y = { 
    value: 'давление, кгс/см2',
    position: 'insideLeft',
    fill: 'white',
    offset: 18,
    angle: -90,
    style: { textAnchor: 'middle' }
  };

  console.log("%c --- CHART RENDER %o", 'color: #bbbbff', props?.name);
  return (
    <ResponsiveContainer width={props?.width} height={props?.height} >
      <ComposedChart
        data={props?.data}
        margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
      >
        <CartesianGrid stroke='#777' strokeDasharray="5 5" />
        <Legend payload={[{ value: props.name, type: 'line', color: props.color}]} verticalAlign='top'/>

        <XAxis {...props_axis} domain={[0, 180]} dataKey="x" tickCount={10}
          label={{...props_label_x}}/>
        <YAxis {...props_axis} domain={props.domain} tickCount={props.domain[1] / 0.5 + 1}
          label={{...props_label_y}}/>

        <Area /* Верхний допуск */ dataKey="limit_top" {...props_area_limit}/>

        <Line /* Кривая графика */ type="monotone" name={props.name} animationDuration={props.animation}
          dataKey="y" stroke={props.color} strokeWidth={2} dot={false}/>

        <Area /* Нижний допуск */ dataKey="limit_btm" {...props_area_limit}/>
      </ComposedChart>
    </ResponsiveContainer>
  );
}