import { ComposedChart, XAxis, YAxis, CartesianGrid, Area } from 'recharts';
import { Legend, ResponsiveContainer } from 'recharts';

import { usePowerPoints } from '../../../contexts/Hardware/PowerPointsContext';
import { POWER_LIMITS } from '../_config';

// import { STYLES as CLS } from '../_styles' 


/** максимальное значение оси X */
const TIME_LIMIT = 25;
/** максимальные значения оси Y */
const AXIS_MAX = {
  power: POWER_LIMITS.power,
  temper: POWER_LIMITS.temper,
};

/** Компонент графиков давления диафрагм */
export default function PowerConsumptionCharts() {
  const points = usePowerPoints();

  // точки с добавлением пределов допусков
  // const [power, temper] = [
  //   addLimits(points?.power, LIMITS.top),
  //   addLimits(points?.temper, LIMITS.btm)
  // ];

  // общие свойства
  const props = {
    width: "80%",
    height: "100%",
    animation: 100
  }
  console.log("--- POWER CONSUMPTION CHARTS RENDER ---");
  return (
    <PowerChart {...props} name='потребляемая мощность' color='#88f888'
      domain={[0, AXIS_MAX.temper]} data={points.power}/>
  );
}

/** Компонент графика давления диафрагмы */
function PowerChart(props) {
  // свойства для используемых компонентов
  const props_area = {
    animationDuration: 300,
    type: 'monotone'
  }
  const props_axis =  {
    stroke: '#fff',
    strokeWidth: 2,
    type: 'number',
    tickCount: 13,
  };
  // const props_area_limit = {
  //   stroke: 0,
  //   fill: "#707000",
  //   type: "monotone",
  //   animationDuration: 0,
  //   connectNulls: true
  // };
  const props_label_x = { 
    value: 'время, сек',
    position: 'insideBottomRight',
    fill: 'white',
    offset: -2
  };
  const props_label_y = { 
    fill: 'white',
    offset: 7,
    style: { textAnchor: 'middle' }
  };

  console.log("--- CHART RENDER %o", props?.name);
  return (
    <ResponsiveContainer width={props?.width} height={props?.height} >
      <ComposedChart
        data={props?.data}
        margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.5}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.5}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid stroke='#777' strokeDasharray="5 5" />
        <Legend payload={[{ value: props.name, type: 'line', color: props.color}]} verticalAlign='top'/>

        <XAxis {...props_axis} domain={[0, TIME_LIMIT]} dataKey="x" tickCount={6}
          label={{...props_label_x}}/>
        <YAxis {...props_axis} domain={[0, AXIS_MAX.power]} yAxisId="power" orientation="left"
          label={{...props_label_y, angle: -90, value: "мощность, кВт", position: 'insideLeft'}}/>
        <YAxis {...props_axis} domain={[0, AXIS_MAX.temper]} yAxisId="temper" orientation="right"
          label={{...props_label_y, angle: 90,  value: "температура, °C", position: 'insideRight'}}/>

        <Area {...props_area} dataKey="y1" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" yAxisId="power" />
        <Area {...props_area} dataKey="y2" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" yAxisId="temper" />

      </ComposedChart>
    </ResponsiveContainer>
  );
}

// <Area /* Верхний допуск */ dataKey="limit_top" {...props_area_limit}/>

// <Line /* Кривая графика */ type="monotone" name={props.name} animationDuration={props.animation}
//   dataKey="y" stroke={props.color} strokeWidth={2} dot={false}/>

// <Area /* Нижний допуск */ dataKey="limit_btm" {...props_area_limit}/>