import { Stack } from "@mui/system";

import PressControls from "./PressControls";
import PressCharts from "./PressChart";
import HardwareProvider from "../../../contexts/Hardware/HardwareContext";
import PressValuesProvider from "../../../contexts/Hardware/Press/PressValuesContext";
import PressPointsProvider from "../../../contexts/Hardware/Press/PressPointsContext";

import { STYLES as CLS } from '../_styles';


/** Компонент формы испытания давления диафрагм */
export default function PressForm() {
  console.log("--- PRESS FORM RENDER");
  return (
    <Stack direction='row' sx={CLS.root}>
      <HardwareProvider>
        <PressValuesProvider>
          <PressControls />
          <PressPointsProvider>
            <PressCharts />
          </PressPointsProvider>
        </PressValuesProvider>
      </HardwareProvider>
    </Stack>
  );
}