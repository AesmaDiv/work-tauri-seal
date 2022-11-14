import { Stack } from "@mui/system";

import TestingFormControls from "./TestingFormControls";
import { PointsProvider } from "../../contexts/PointsContext";

import { STYLES as CLS } from './_styles';


/** Компонент формы испытания давления диафрагм */
export default function TestingForm({ppprops, data_fields, children}) {
  console.log(`--- ${ppprops.NAME} FORM RENDER ---`);
  return (
    <Stack direction='row' sx={CLS.root}>
      <PointsProvider {...ppprops}>
        <TestingFormControls name={ppprops.NAME} tracked_state={ppprops.TRACKED_STATE} data_fields={data_fields}/>
        {children}
      </PointsProvider>
    </Stack>
  );
}