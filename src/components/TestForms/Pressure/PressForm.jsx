import { useState } from "react";
import { Stack } from "@mui/system";

import PressControls from "./PressControls";
import PressCharts from "./PressChart";

import { LIMITS, CHART_LENGTH } from "./_config";

import cls from './_style.module.css';
import PointsProvider from "../../../contexts/PointsContext";


let limits = [
  LIMITS.top[1] + 0.5,
  LIMITS.btm[1] + 0.5,
];

export default function PressForm() {
  console.log("--- TEST-PRESSURE RENDER");
  return (
    <Stack className={cls.press_root} direction='row'>
      <PointsProvider>
        <PressControls onSavePress={() => {}}/>
        <PressCharts limits={limits}/>
      </PointsProvider>
    </Stack>
  );
}