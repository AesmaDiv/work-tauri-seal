import React from 'react';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Area } from 'recharts';
import { Legend, ResponsiveContainer } from 'recharts';
import { Stack } from '@mui/system';

import { usePointsContext } from '../../../contexts/PointsContext';


export default function PressCharts({limits}) {
  const {points} = usePointsContext();

  const props = {
    width: "100%", height: "50%",
    animation: 200
  }
  console.log("--- PRESSURE CHARTS RENDER");
  return (
    <Stack direction='column' sx={{width: '80%', height: '100%'}}>
      <PChart {...props} name='верхняя диафрагма' color='#88f888'
        domain={[0, limits[0]]} data={points?.press_top}/>
      <PChart {...props} name='нижняя диафрагма' color='#8888f8'
        domain={[0, limits[1]]} data={points?.press_btm}/>
    </Stack>
  );
}

function PChart(props) {
  const limit_props = { stroke: 0, fill: "#707000", type: "monotone", animationDuration: 0 };
  const axis_props =  { stroke: '#fff', strokeWidth: 2, type: 'number' };
  const label_x_props = { 
    value: 'время, сек', position: 'insideBottomRight',
    fill: 'white', offset: -2
  };
  const label_y_props = { 
    value: 'давление, кгс/см2', position: 'insideLeft',
    fill: 'white',style: { textAnchor: 'middle' }, angle: -90, offset: 18
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

        <XAxis {...axis_props} domain={[0, 180]} dataKey="x" tickCount={10}
          label={{...label_x_props}}/>
        <YAxis {...axis_props} domain={props.domain} tickCount={props.domain[1] / 0.5 + 1}
          label={{...label_y_props}}/>

        <Area dataKey="limit_top" {...limit_props}/>

        <Line type="monotone" name={props.name} animationDuration={props.animation} strokeWidth={2}
          dataKey="y" stroke={props.color} dot={false}/>

        <Area dataKey="limit_btm" {...limit_props}/>
      </ComposedChart>
    </ResponsiveContainer>
  );
}
