import React from 'react';
import { useTestContext } from '../../contexts/TestContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getTestData } from '../../aux/aux';


export default function MyChart(props) {
  const {context} = useTestContext();

  const test_data = getTestData(context);

  const pressure_data = () => {
    let result = [];
    let press1 = test_data.pressure1?.filter(v => v !== 0);
    let press2 = test_data.pressure2?.filter(v => v !== 0);
    let new_length = Math.min(press1.length, press2.length);
    press1.length = new_length;
    press2.length = new_length;
    for (let i = 0; i < new_length; i++) {
      result.push({ttime: i, value1: press1[i], value2: press2[i]})
    }

    return result;
  } 
  console.log("--- PRESSURE CHART RENDER");
  return (
    <ResponsiveContainer width={props?.width} height={props?.height} >
      <LineChart
        data={pressure_data()}
        margin={{
          top: 20,
          right: 20,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid stroke='#777' strokeDasharray="5 5" />
        <XAxis stroke='#fff' strokeWidth={2} type='number' domain={[0, 180]} dataKey="ttime" tickCount={10}/>
        <YAxis stroke='#fff' strokeWidth={2} type='number' domain={[-5, 40]} tickCount={11}/>
        <Tooltip />
        <Legend  />
        <Line name='давление' type="monotone" animationDuration={250} strokeWidth={2} dataKey="value1" stroke="#8888d8" dot={false}/>
        <Line name='давление' type="monotone" animationDuration={250} strokeWidth={2} dataKey="value2" stroke="#88d888" dot={false}/>
      </LineChart>
    </ResponsiveContainer>
  );
}
