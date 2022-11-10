import { Stack } from "@mui/system";

import FormControls from "../FromControls";
import PressureCharts from "./PressChart";
import { HardwareProvider } from "../../../contexts/HardwareContext";
import { PointsProvider } from "../../../contexts/PointsContext";

import { PRESS_DATANAMES } from "../_config";
import * as props from './PressProps';
import { STYLES as CLS } from '../_styles';


/** Компонент формы испытания давления диафрагм */
export default function PressForm() {
  console.log("--- Pressure FORM RENDER ---");
  return (
    <Stack direction='row' sx={CLS.root}>
      <HardwareProvider>
        <FormControls data_fields={PRESS_DATANAMES}/>
        <PointsProvider {...props}>
          <PressureCharts />
        </PointsProvider>
      </HardwareProvider>
    </Stack>
  );
}