import { Stack } from "@mui/system";

import TestingFormControls from "./TestingFormControls";
import PressureCharts from "../Charts/PressChart";
import PowerConsumptionCharts from "../Charts/PowerChart";

import { STYLES as CLS } from './_styles';
import { PointsProvider } from "../../contexts/PointsContext";


/** Компонент формы испытания давления диафрагм */
export default function TestingForm({props, data_fields}) {
  const _chart = (props.TRACKED_STATE === "test_press") ?
    <PressureCharts /> :
    <PowerConsumptionCharts />

  const color = props.NAME === "Pressure" ? "green" : "red";
  console.log(`--- TESTING-FORM RENDER %c ${props.NAME} ---`, `color: ${color}`);
  return (
    <Stack direction='row' sx={CLS.root}>
      <PointsProvider {...props}>
        <TestingFormControls name={props.NAME} tracked_state={props.TRACKED_STATE} data_fields={data_fields}/>
        {_chart}
      </PointsProvider>
    </Stack>
  );
}