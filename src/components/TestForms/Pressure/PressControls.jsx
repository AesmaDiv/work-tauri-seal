import { Stack } from "@mui/system";
import { ToggleButton, ToggleButtonGroup, Button } from "@mui/material";

import { useHardware, updateHardware } from "../../../contexts/HardwareContext";
import DataField from "../../DataField/DataField";

import { PRESS_DATANAMES } from "../_config";
import { STYLES as CLS } from '../_styles';


/** Компонент управления испытанием давления диафрагм */
export default function PressControls() {
  // callback переключения состояния испытания и сохранения точек
  const hw_values = useHardware();
  const changeHardware = updateHardware();

  /** Обработчик переключения состояния испытания */
  const _handleChangeTestMode = (_, new_state) => {
    (new_state !== hw_values.is_reading) &&
    (new_state !== null) &&
    changeHardware((prev) => ({...prev, is_reading: new_state}));
  }
  /** Обработчик кнопки сохранения испытания давления диафрагм */
  const _handleSavePress = (event) => {
    // props?.changeActive &&
    // props.changeActive(!props.is_active)
    // console.warn("PressControls is_active changed");
    // // savePoints();
  }

  console.log("--- Pressure CONTROLS RENDER ---");
  return (
    <Stack direction="column" sx={CLS.controls}>
      <Stack direction="column" sx={CLS.controls_data}>
        {
        PRESS_DATANAMES.map(item => {
          return <DataField key={item.name} data={item} value={hw_values[item.name].toString()}
            inputProps={{
              InputProps: { style: { color: '#ffc653'}, readOnly: true },
              InputLabelProps: { style: { color: 'white' }, shrink: true }
            }}/>
          }
        )}
      </Stack>
      <Stack sx={CLS.controls_btns}>
        <ToggleButtonGroup sx={CLS.controls_test} exclusive value={hw_values.is_reading} onChange={_handleChangeTestMode}>
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

