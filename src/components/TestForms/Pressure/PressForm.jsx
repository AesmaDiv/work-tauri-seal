import { Stack } from "@mui/system";

import PressControls from "./PressControls";
import PressureCharts from "./PressChart";
import { HardwareProvider } from "../../../contexts/HardwareContext";
import { PointsProvider } from "../../../contexts/PointsContext";

import * as props from './PressProps';
import { STYLES as CLS } from '../_styles';


/** Компонент формы испытания давления диафрагм */
export default function PressForm() {
  console.log("--- Pressure FORM RENDER ---");
  return (
    <Stack direction='row' sx={CLS.root}>
      <HardwareProvider>
        <PressControls />
        <PointsProvider {...props}>
          <PressureCharts />
        </PointsProvider>
      </HardwareProvider>
    </Stack>
  );
}