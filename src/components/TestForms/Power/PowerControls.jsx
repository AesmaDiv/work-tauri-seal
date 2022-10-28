import { Stack } from "@mui/system";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";

import DataField from "../../DataField/DataField";
import { usePowerValuesContext } from "../../../contexts/Hardware/Power/PowerValuesContext";

import { POWER_DATANAMES } from '../_config';
import { STYLES as CLS } from "../_styles";
import { useHardwareContext } from "../../../contexts/Hardware/HardwareContext";


export default function PowerControls() {
  // callback переключения состояния испытания и сохранения точек
  const {is_reading, switchReading} = useHardwareContext();
  const {values} = usePowerValuesContext();

  /** Обработчик переключения состояния испытания */
  const _handleChangeTestMode = (_, new_state) => {
    (new_state !== is_reading) && (new_state !== null) && switchReading(new_state);
  }
  /** Обработчик кнопки сохранения испытания давления диафрагм */
  const _handleSavePress = () => {
    // savePoints();
  }

  console.log("--- POWER CONTROLS RENDER");
  return (
    <Stack direction="column" sx={CLS.controls}>
      <Stack direction="column" sx={CLS.controls_data}>
        {
        POWER_DATANAMES.map(item => 
          <DataField key={item.name} data={item} value={values[item.name]}
            inputProps={{
              InputProps: { style: { color: '#ffc653'}, readOnly: true },
              InputLabelProps: { style: { color: 'white' }, shrink: true }
            }}/>
        )}
      </Stack>
      <Stack sx={CLS.controls_btns}>
        <ToggleButtonGroup sx={CLS.controls_test} exclusive value={is_reading} onChange={_handleChangeTestMode}>
          <ToggleButton sx={[CLS.btns, CLS.btn_start]} value={true}
            variant='contained' size='small' /*color="error"*/>
              СТАРТ
          </ToggleButton>
          <ToggleButton sx={[CLS.btns, CLS.btn_stop]} value={false}
            variant='contained' size='small' /*color="info"*/>
              СТОП
          </ToggleButton>
        </ToggleButtonGroup>
        <Button sx={CLS.btn_save} type='submit' onClick={_handleSavePress}
          variant='contained' size='small'>
            Сохранить
          </Button>
      </Stack>
    </Stack>
  );
}