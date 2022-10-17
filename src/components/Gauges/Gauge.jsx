import React, { useState } from "react";
import cls from './Gauge.module.css';


export const Gauge = ({size = 200, maximum=100, value=50, title="Заголовок"}) => {
  const [_value, setValue] = useState(value)

  const R = 40;  // радиус дуги
  const C = 50;          // центральная точка x = y = c т.к. квадрат
  const E = [C + R, C];         // точка окончания дуги

  const normalize = (num) =>  (Math.round(num * 100) / 100).toFixed(1);
  const _limit = maximum * 5.0 / 4.0;

  const drawArc = (val) => {
    let angle = 225 * (val > 0 ? (val < _limit ? (_limit - val) / _limit : 0) : 1);
    let sX = C + (R * Math.cos(angle * Math.PI / 180.0));
    let sY = C - (R * Math.sin(angle * Math.PI / 180.0));
    return `M${sX} ${sY} A ${R} ${R} 0 ${angle > 180 ? 1 : 0} 1 ${E[0]} ${E[1]}`
  }

  const onMouse = (event) => {
    let currentTargetRect = event.currentTarget.getBoundingClientRect();
    const offsetY = event.pageY - currentTargetRect.top;
    const new_value = _limit * offsetY / size;
    setValue(new_value);
  }

  return (
    <svg className={cls.main} width={size} height={size} viewBox={`-5 -5 110 110`} onMouseMove={onMouse}>
      <defs>
        <linearGradient id="gauge_gradient" x1="0%" y1="15%" x2="100%" y2="85%">
          <stop offset="50%" stopColor="#00ff00"/>
          <stop offset="60%" stopColor="#ffff00"/>
          <stop offset="90%" stopColor="#ff0000"/>

        </linearGradient>
      </defs>
      <path className={cls.path_bkg} d={drawArc(0)}/>
      <path className={cls.path_frg} d={drawArc(_value)}/>
      <polyline points="72,28 85,15 85,12 88,15 85,15" stroke="white" fill="white"/> 
      <text className={cls.title} x="100" y="60">{title}</text>
      <text className={cls.value} x="100" y="100">{normalize(_value)}</text>
    </svg>
  )
}