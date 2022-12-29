import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Area } from 'recharts';
import { Legend, ResponsiveContainer } from 'recharts';
import { Stack } from '@mui/system';

import { addLimits, AXIS_MAX } from '../../../shared/cfg_press';
import { PRESS_STYLE } from './_styles';


/** Компонент графиков давления диафрагм */
export default function PressureCharts(props) {
  const points = useSelector(state => state.recordReducer.points.test_press);

  // точки с добавлением пределов допусков
  let _points = addLimits(points);

  const common = {
    width: "100%",
    height: props?.for_protocol ? "29em" : "auto",
    animation: props?.for_protocol ? 0 : 300,
    fill: props?.for_protocol ? "black" : "white",
  }

  // console.warn("Press points %o", _points);
  console.log("%c --- CHARTS RENDER %c Pressure ---", 'color: #9999ff', 'color: green');
  return (
    <Stack {...common} direction={'column'}>
      <PressChart {...common} name='верхняя диафрагма' color='#88f888'
        domain={[0, AXIS_MAX.top]} data={_points} x_key="time" y_key="press_top" stroke={common.fill} />
      <PressChart {...common} name='нижняя диафрагма' color='#8888f8'
        domain={[0, AXIS_MAX.btm]} data={_points} x_key="time" y_key="press_btm" stroke={common.fill}/>
    </Stack>
  );
}

/** Компонент графика давления диафрагмы */
const PressChart = (props) => {
  console.log("%c --- CHART RENDER %o", 'color: #bbbbff', props?.name);
  return (
    <ResponsiveContainer>
      <ComposedChart
        data={props?.data}
        margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
      >
        <CartesianGrid stroke='#777' strokeDasharray="5 5" />
        <Legend payload={[{ value: props.name, type: 'line', color: props.color}]} verticalAlign='top'/>

        <XAxis {...PRESS_STYLE.props_axis} dataKey={props.x_key} domain={[0, 180]} tickCount={10}
          stroke={props.fill} label={{...PRESS_STYLE.props_label_x, fill: props.fill}}/>
        <YAxis {...PRESS_STYLE.props_axis} domain={props.domain} tickCount={props.domain[1] / 0.5 + 1}
          stroke={props.fill} label={{...PRESS_STYLE.props_label_y, fill: props.fill}}/>

        <Area /* Верхний допуск */ dataKey={`${props.y_key}_limit_up`} {...PRESS_STYLE.props_area_limit}/>

        <Line /* Кривая графика */ dataKey={props.y_key} type="monotone" name={props.name} animationDuration={props.animation}
          stroke={props.color} strokeWidth={2} dot={false}/>

        <Area /* Нижний допуск */ dataKey={`${props.y_key}_limit_dw`} {...PRESS_STYLE.props_area_limit}/>
      </ComposedChart>
    </ResponsiveContainer>
  );
}
