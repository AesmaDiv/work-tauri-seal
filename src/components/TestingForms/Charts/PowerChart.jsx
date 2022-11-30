import { ComposedChart, XAxis, YAxis, CartesianGrid, Area } from 'recharts';
import { Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';

import { nextDividingOn } from '../../../shared/funcs_common';
import { POINTS_MAX } from '../../../configs/cfg_power';
import { POWER_STYLE } from './_styles';


/** Компонент графиков давления диафрагм */
export default function PowerConsumptionCharts() {
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

  console.log("%c --- CHARTS RENDER %c Power Consumption ---", 'color: #9999ff', 'color: red');
  return (
    <PowerChart sx={{width: '80%', height: '100%', animation: '100'}}
    name='потребляемая мощность' color='#88f888' limits={limits}
    domain={[0, limits.temper]} data={points}/>
    );
  }
  
/** Компонент графика давления диафрагмы */
function PowerChart(props) {
  const clr_pwr = POWER_STYLE.props_colors.power;
  const clr_tmp = POWER_STYLE.props_colors.temper;

  console.log("%c --- CHART RENDER %o", 'color: #bbbbff', props?.name);
  return (
    <ResponsiveContainer width={props?.width} height={props?.height} >
      <ComposedChart
        data={props?.data}
        margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor={clr_pwr} stopOpacity={0.5}/>
            <stop offset="95%" stopColor={clr_pwr} stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
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
          label={{...POWER_STYLE.props_label_x}}/>
        <YAxis {...POWER_STYLE.props_axis} domain={[0, props.limits.power]} yAxisId="power" orientation="left"
          label={{...POWER_STYLE.props_label_y, angle: -90, value: "мощность, кВт", position: 'insideLeft'}}/>
        <YAxis {...POWER_STYLE.props_axis} domain={[0, props.limits.temper]} yAxisId="temper" orientation="right"
          label={{...POWER_STYLE.props_label_y, angle: 90,  value: "температура, °C", position: 'insideRight'}}/>

        <Area {...POWER_STYLE.props_area} dataKey="y1" stroke={clr_pwr} fillOpacity={1} fill="url(#colorUv)" yAxisId="power" />
        <Area {...POWER_STYLE.props_area} dataKey="y2" stroke={clr_tmp} fillOpacity={1} fill="url(#colorPv)" yAxisId="temper" />

      </ComposedChart>
    </ResponsiveContainer>
  );
}

// <Area /* Верхний допуск */ dataKey="limit_top" {...props_area_limit}/>

// <Line /* Кривая графика */ type="monotone" name={props.name} animationDuration={props.animation}
//   dataKey="y" stroke={props.color} strokeWidth={2} dot={false}/>

// <Area /* Нижний допуск */ dataKey="limit_btm" {...props_area_limit}/>

