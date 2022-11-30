import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Area } from 'recharts';
import { Legend, ResponsiveContainer } from 'recharts';
import { Stack } from '@mui/system';

import { useSelector } from 'react-redux';
import { PRESS_LIMITS, POINTS_MAX, AXIS_MAX } from '../../../configs/cfg_press';
import { PRESS_STYLE } from './_styles';
import { addLimits } from '../../../shared/funcs_common';


/** Компонент графиков давления диафрагм */
export default function PressureCharts() {
  const points = useSelector(state => state.recordReducer.points.test_press)

  // точки с добавлением пределов допусков
  const [press_top, press_btm] = [
    addLimits(points?.press_top, PRESS_LIMITS.top, POINTS_MAX),
    addLimits(points?.press_btm, PRESS_LIMITS.btm, POINTS_MAX)
  ];

  console.log("%c --- CHARTS RENDER %c Pressure ---", 'color: #9999ff', 'color: green');
  // console.warn(points);
  return (
    <Stack sx={{width: '80%', height: '100%'}} direction='column'>
      <PressChart {...PRESS_STYLE.props_common} name='верхняя диафрагма' color='#88f888'
        domain={[0, AXIS_MAX.top]} data={press_top}/>
      <PressChart {...PRESS_STYLE.props_common} name='нижняя диафрагма' color='#8888f8'
        domain={[0, AXIS_MAX.btm]} data={press_btm}/>
    </Stack>
  );
}

/** Компонент графика давления диафрагмы */
function PressChart(props) {
  // свойства для используемых компонентов

  console.log("%c --- CHART RENDER %o", 'color: #bbbbff', props?.name);
  return (
    <ResponsiveContainer width={props?.width} height={props?.height} >
      <ComposedChart
        data={props?.data}
        margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
      >
        <CartesianGrid stroke='#777' strokeDasharray="5 5" />
        <Legend payload={[{ value: props.name, type: 'line', color: props.color}]} verticalAlign='top'/>

        <XAxis {...PRESS_STYLE.props_axis} domain={[0, 180]} dataKey="x" tickCount={10}
          label={{...PRESS_STYLE.props_label_x}}/>
        <YAxis {...PRESS_STYLE.props_axis} domain={props.domain} tickCount={props.domain[1] / 0.5 + 1}
          label={{...PRESS_STYLE.props_label_y}}/>

        <Area /* Верхний допуск */ dataKey="limit_top" {...PRESS_STYLE.props_area_limit}/>

        <Line /* Кривая графика */ type="monotone" name={props.name} animationDuration={props.animation}
          dataKey="y" stroke={props.color} strokeWidth={2} dot={false}/>

        <Area /* Нижний допуск */ dataKey="limit_btm" {...PRESS_STYLE.props_area_limit}/>
      </ComposedChart>
    </ResponsiveContainer>
  );
}
