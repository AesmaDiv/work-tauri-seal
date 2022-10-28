import { Stack } from "@mui/system";

import PowerControls from "./PowerControls";
// import PowerCharts from "./PowerChart";
import PowerPointsProvider from "../../../contexts/Hardware/Power/PowerPointsContext";
import HardwareProvider from "../../../contexts/Hardware/HardwareContext";

import { STYLES as CLS } from '../_styles';


/** Компонент формы испытания давления диафрагм */
export default function PowerForm() {
  console.log("--- POWER FORM RENDER");
  return (
    <Stack direction='row' sx={CLS.root}>
      {/* <HardwareProvider>
        <PowerPointsProvider>
          <PowerControls />
          {/* <PowerCharts /> }
        </PowerPointsProvider>
      </HardwareProvider> */}
    </Stack>
  );
}