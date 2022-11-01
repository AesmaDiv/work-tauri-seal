import { Stack } from "@mui/system";

import PowerControls from "./PowerControls";
import PowerConsumptionCharts from "./PowerChart";
import { PowerPointsProvider } from "../../../contexts/Hardware/PowerPointsContext";
import { HardwareProvider } from "../../../contexts/Hardware/HardwareContext";

import { STYLES as CLS } from '../_styles';


/** Компонент формы испытания давления диафрагм */
export default function PowerForm() {
  console.log("--- POWER FORM RENDER ---");
  return (
    <Stack direction='row' sx={CLS.root}>
      <HardwareProvider>
        <PowerControls />
        <PowerPointsProvider>
          <PowerConsumptionCharts />
        </PowerPointsProvider>
      </HardwareProvider>
    </Stack>
  );
}