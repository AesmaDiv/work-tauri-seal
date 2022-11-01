import { Stack } from "@mui/system";

import PressControls from "./PressControls";
import PressureCharts from "./PressChart";
import { HardwareProvider } from "../../../contexts/Hardware/HardwareContext";
import { PressPointsProvider } from "../../../contexts/Hardware/PressPointsContext";

import { STYLES as CLS } from '../_styles';



/** Компонент формы испытания давления диафрагм */
export default function PressForm() {
  console.log("--- PRESS FORM RENDER ---");
  return (
    <Stack direction='row' sx={CLS.root}>
      <HardwareProvider>
        <PressControls />
        <PressPointsProvider>
          <PressureCharts />
        </PressPointsProvider>
      </HardwareProvider>
    </Stack>
  );
}