import {React, useState} from "react";
import cls from './Gauge2.module.css';

export const Gauge2 = ({size=200, maximum=100, value=50, title}) => {
  const [_value, _setValue] = useState(value);
  const _offset = 173;
  const _limit = maximum * 1.17;
  const _bar = _value >= 0 ? 
    (_value <= _limit ? _value * _offset / _limit : _offset) :
    0;

  const onMouse = (event) => {
    let currentTargetRect = event.currentTarget.getBoundingClientRect();
    const offsetY = event.pageY - currentTargetRect.top;
    const new_value = _limit * offsetY / size;
    _setValue(new_value);
  }

  return (
    <svg className={cls.svg} width={size} height={size} viewBox="0 0 120 120" onMouseMove={onMouse}>
      <defs>
        <linearGradient id="meter_gradient" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="50%" stopColor="#00ff00"/>
          <stop offset="80%" stopColor="#ffff00"/>
          <stop offset="100%" stopColor="#ff0000"/>
        </linearGradient>
      </defs>
      <clipPath id="rect">
        <rect x="2" y="2" width="115" height="115" fill="none" stroke="black"/>
      </clipPath>
      <path fill="none" strokeWidth={20} stroke="url(#meter_gradient)" clipPath="url(#rect)"
            d="M 20 120 A 80 80 0 0 1 120 20"
      />
      <path className={cls.bar} strokeWidth={18}
            strokeDashoffset={-_bar} strokeDasharray={_offset} clipPath="url(#rect)"
            d="M 20 120 A 80 80 0 0 1 120 20"
      />
      <polyline points="95,7 95,27 93,30 97,30, 95,27" stroke="white" fill="white"/>
      <text className={cls.title} x="117" y="70">
        {title}
      </text>
      <text className={cls.value} x="117" y="114">
        {Math.round(_value).toFixed(1)}
      </text>
      
    </svg>
  )
}