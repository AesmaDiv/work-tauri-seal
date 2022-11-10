import { Stack } from "@mui/system";

import PowerControls from "./PowerControls";
import PowerConsumptionCharts from "./PowerChart";
import { HardwareProvider } from "../../../contexts/HardwareContext";
import { PointsProvider } from "../../../contexts/PointsContext";

import * as props from './PowerProps';
import { STYLES as CLS } from '../_styles';


/** Компонент формы испытания давления диафрагм */
export default function PowerForm() {
  console.log("--- Power Consumption FORM RENDER ---");
  return (
    <Stack direction='row' sx={CLS.root}>
      <HardwareProvider>
        <PowerControls />
        <PointsProvider {...props}>
          <PowerConsumptionCharts />
        </PointsProvider>
      </HardwareProvider>
    </Stack>
  );
}