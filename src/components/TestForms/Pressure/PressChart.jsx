import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Area } from 'recharts';
import { Legend, ResponsiveContainer } from 'recharts';
import { Stack } from '@mui/system';

import { usePressPointsContext } from '../../../contexts/Hardware/Press/PressPointsContext';
import { addLimits, LIMITS } from '../_config';

import { STYLES as CLS } from '../_styles' 

/** максимальные значения оси Y */
const AXIS_MAX = {
  top: LIMITS.top[1] + 0.5,
  btm: LIMITS.btm[1] + 0.5,
};

/** Компонент графиков давления диафрагм */
export default function PressCharts() {
  const {points} = usePressPointsContext();

  // точки с добавлением пределов допусков
  const [points_top, points_btm] = [
    addLimits(points?.press_top, LIMITS.top),
    addLimits(points?.press_btm, LIMITS.btm)
  ];

  // общие свойства
  const props = {
    width: "100%",
    height: "50%",
    animation: 100
  }
  console.log("--- PRESSURE CHARTS RENDER");
  return (
    <Stack sx={CLS.charts} direction='column'>
      <PChart {...props} name='верхняя диафрагма' color='#88f888'
        domain={[0, AXIS_MAX.top]} data={points_top}/>
      <PChart {...props} name='нижняя диафрагма' color='#8888f8'
        domain={[0, AXIS_MAX.btm]} data={points_btm}/>
    </Stack>
  );
}

/** Компонент графика давления диафрагмы */
function PChart(props) {
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

  console.log("--- CHART RENDER %o", props?.name);
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
