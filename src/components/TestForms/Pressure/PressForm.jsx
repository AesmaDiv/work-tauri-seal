import { useEffect, useMemo, useState } from "react";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";

import PressControls from "./PressControls";
import PressCharts from "./PressChart";

import { useRecordContext } from "../../../contexts/RecordContext";
import { getTestData, createPressPoints } from '../aux_funcs';
import { LIMITS, CHART_LENGTH } from "./_config";

import cls from './_style.module.css';


export default function PressForm() {
  // контекст (текущая запись БД)
  const {context} = useRecordContext();
  // состояние испытания (запущено / остановлено)
  const [running, setRunning] = useState({state: false, animation: 200});
  // точки, по данным с приборов
  const [current_points, setPoints] = useState({press_top: [], press_btm: []});

  let animation = 500;
  let limits = [
    LIMITS.top[1] + 0.5,
    LIMITS.btm[1] + 0.5,
  ];

  /** Точки полученные из контекста */
  let context_points = useMemo(() => {
    console.log("Calculating context points");
    let test_data = getTestData(context);
    let press_top = createPressPoints(test_data?.press_top, CHART_LENGTH, LIMITS.top);
    let press_btm = createPressPoints(test_data?.press_btm, CHART_LENGTH, LIMITS.btm);

    return {press_top, press_btm};
  }, [context]);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (running.state) _addPoint()
    }, 200);
    return (() => {
      clearTimeout(timer);
    })
  })

  const _addPoint = () => {
    if (current_points.press_top.length < 18) {
      let arr1 = [...current_points.press_top];
      let last = arr1.length ? arr1[arr1.length - 1] : {x: -10, y: 1.5};
      let rnd = (Math.random() - 0.5)  * 0.5;
      let newy = (last.y + rnd) < 0 ?
        0 :
        (last.y + rnd) > 2.5 ?
          2.5 :
          last.y + rnd;
      arr1.push({x: last.x + 10, y: newy});
      
      let arr2 = [...current_points.press_btm];
      last = arr2.length ? arr2[arr2.length - 1] : {x: -10, y: 2};
      rnd = (Math.random() - 0.5)  * 0.5;
      newy = (last.y + rnd) < 0 ?
        0 :
        (last.y + rnd) > 2.5 ?
          2.5 :
          last.y + rnd;
      arr2.push({x: last.x + 10, y: newy});
  
      let new_points = {
        press_top: arr1,
        press_btm: arr2
      };
  
      setPoints(prev => {return new_points});
    }
  }

  const _handleAddPoint = () => {
    console.log("Save button clicked, %o\n State is %o", current_points, running);
    _addPoint();
  }
  const _handleChangeState = () => {
    setRunning({
      state: !running.state,
      animation: !running.state ? 0 : 200
    })
  }

  console.log("--- TEST-PRESSURE RENDER %o, %o", running, animation);
  return (
    <Stack className={cls.press_root} direction='row'>
      <PressControls onChangeState={_handleChangeState} onSavePress={() => {}}/>
      <PressCharts
        points={running.state ? current_points : context_points}
        limits={limits}
        animation={running.animation}/>
      <Button onClick={e => _handleAddPoint()}>Add</Button>
    </Stack>
  );
}