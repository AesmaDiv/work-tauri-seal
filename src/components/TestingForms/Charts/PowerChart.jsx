import { ComposedChart, XAxis, YAxis, CartesianGrid, Area, Line } from 'recharts';
import { Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';

import { nextDividingOn } from '../../../shared/funcs_common';
import { POINTS_MAX } from '../../../configs/cfg_power';
import { POWER_STYLE, VIBR_STYLE } from './_styles';
import { Stack } from '@mui/system';


/** Компонент графиков давления диафрагм */
export default function PowerConsumptionCharts(props) {
  const points = useSelector(state => state.recordReducer.points.test_power);
  const current_type = useSelector(state => state.recordReducer.current_type);
  const limits = {
    power:  nextDividingOn(current_type.limit_pwr * 1.1, POWER_STYLE.props_axis.tickCount - 1),
    temper: nextDividingOn(current_type.limit_tmp * 1.1, POWER_STYLE.props_axis.tickCount - 1),
  }

  // точки с добавлением пределов допусков
  // const [power, temper] = [
  //   addLimits(points?.power, LIMITS.top),
  //   addLimits(points?.temper, LIMITS.btm)
  // ];

  const common = {
    width: "100%",
    height: props?.for_protocol ? "29em" : "auto",
    animation: props?.for_protocol ? 0 : 300,
    fill: props?.for_protocol ? 'black' : 'white'
  }

  console.log("%c --- CHARTS RENDER %c Power Consumption ---", 'color: #9999ff', 'color: red');
  return (
    <Stack {...common}>
      <PowerChart {...common}
      name='потребляемая мощность' color='#88f888' limits={limits}
      domain={[0, limits.temper]} data={points}/>
      <VibrationChart {...common} height="30%" name='вибрация' color='#88f888' limits={limits}
      domain={[0, 4]}/>
    </Stack>
    );
  }
  
/** Компонент графика давления диафрагмы */
function PowerChart(props) {
  const clr_pwr = POWER_STYLE.props_colors.power;
  const clr_tmp = POWER_STYLE.props_colors.temper;

  console.log("%c --- CHART RENDER %o", 'color: #bbbbff', props?.name);
  return (
    <ResponsiveContainer>
      <ComposedChart data={props?.data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
        <defs>
          <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor={clr_pwr} stopOpacity={0.5}/>
            <stop offset="95%" stopColor={clr_pwr} stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorTemper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor={clr_tmp} stopOpacity={0.5}/>
            <stop offset="95%" stopColor={clr_tmp} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid stroke='#777' strokeDasharray="5 5" />

        <Legend verticalAlign='top' layout='vertical' payload={[
          { type: 'line', color: clr_pwr, value: 'потребляемая мощность'},
          { type: 'line', color: clr_tmp, value: 'температура'}
        ]} />

        <XAxis {...POWER_STYLE.props_axis} domain={[0, POINTS_MAX]} dataKey="x" tickCount={6}
          stroke={props.fill} label={{...POWER_STYLE.props_label_x, fill: props?.fill}}/>
        <YAxis {...POWER_STYLE.props_axis} domain={[0, props.limits.power]} yAxisId="power" orientation="left"
          stroke={props.fill} label={{...POWER_STYLE.props_label_y, angle: -90, value: "мощность, кВт", position: 'insideLeft', fill: props?.fill}}/>
        <YAxis {...POWER_STYLE.props_axis} domain={[0, props.limits.temper]} yAxisId="temper" orientation="right"
          stroke={props.fill} label={{...POWER_STYLE.props_label_y, angle: 90,  value: "температура, °C", position: 'insideRight', fill: props?.fill}}/>

        <Area animationDuration={props?.animation} 
          dataKey="y1" stroke={clr_pwr} fillOpacity={1} fill="url(#colorPower)" yAxisId="power" />
        <Area animationDuration={props?.animation}
          dataKey="y2" stroke={clr_tmp} fillOpacity={1} fill="url(#colorTemper)" yAxisId="temper" />

      </ComposedChart>
    </ResponsiveContainer>
  );
}

function VibrationChart(props) {
  console.log("%c --- CHART RENDER %o", 'color: #bbbbff', props?.name);
  return (
    <ResponsiveContainer>
      <ComposedChart
        data={props?.data}
        margin={{ top: 10, right: 70, left: 10, bottom: 20 }}
      >
        <CartesianGrid stroke='#777' strokeDasharray="5 5" />
        <Legend payload={[{ value: props.name, type: 'line', color: props.color}]} verticalAlign='top'/>

        <XAxis {...VIBR_STYLE.props_axis} domain={[0, 25]} dataKey="x" tickCount={6}
          stroke={props.fill} label={{...VIBR_STYLE.props_label_x, fill: props.fill}}/>
        <YAxis {...VIBR_STYLE.props_axis} domain={[0, 4]} tickCount={3}
          stroke={props.fill} label={{...VIBR_STYLE.props_label_y, fill: props.fill}}/>

        <Line /* Кривая графика */ type="monotone" name={props.name} animationDuration={props.animation}
          dataKey="y" stroke={props.color} strokeWidth={2} dot={false}/>

      </ComposedChart>
    </ResponsiveContainer>
  );
}

