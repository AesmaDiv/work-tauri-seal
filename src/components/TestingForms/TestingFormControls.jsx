import { Stack } from "@mui/system";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";

import DataField from "../DataField/DataField";
import { useHardware } from "../../contexts/HardwareContext";
import { useTesting, updateTesting } from "../../contexts/TestingContext";

import { STYLES as CLS } from "./_styles";
import { updatePoints } from "../../contexts/PointsContext";


/** Универсальный компонент для управления испытанием
 * @param tracked_state имя отслеживаемого флага испытания
 * @param data_fields список параметров для полей отображения значений вида
 * - [.. ,{name: 'имя', label: 'заголовок'}, ..]
 */
export default function TestingFormControls({name, tracked_state, data_fields}) {
  // данные с оборудования
  const hw_values = useHardware();
  // callback сохранения точек
  const managePoints = updatePoints();
  // состояние испытания и callback переключения
  const states = useTesting();
  const manageStates = updateTesting();

  /** Обработчик переключения состояния испытания */
  const _handleChangeRecordMode = (_, new_state) => {
    (hw_values.is_reading) &&
    (new_state !== null) &&
    (new_state !== states[tracked_state]) &&
    manageStates({type: tracked_state, param: new_state});
  }
  /** Обработчик кнопки сохранения испытания давления диафрагм */
  const _handleSave = (event) => {
    // если запущен тест - не сохранять
    states[tracked_state] || managePoints({type: 'save'});
  }

  console.log(`--- ${name} CONTROLS RENDER ---`);
  return (
    <Stack direction="column" sx={CLS.controls}>
      <Stack direction="column" sx={CLS.controls_data}>
        {
        data_fields.map(item => {
          return <DataField key={item.name} data={item} value={hw_values[item.name].toString()}
            inputProps={{
              InputProps: { style: { color: '#ffc653'}, readOnly: true },
              InputLabelProps: { style: { color: 'white' }, shrink: true }
            }}/>
          }
        )}
      </Stack>
      <Stack sx={CLS.controls_btns}>
        <ToggleButtonGroup exclusive sx={CLS.controls_test}
          value={states[tracked_state]} onChange={_handleChangeRecordMode}>

          <ToggleButton sx={[CLS.btns, CLS.btn_start]} value={true}
            variant='contained' size='small' /*color="error"*/>
              СТАРТ
          </ToggleButton>
          <ToggleButton sx={[CLS.btns, CLS.btn_stop]} value={false}
            variant='contained' size='small' /*color="info"*/>
              СТОП
          </ToggleButton>

        </ToggleButtonGroup>
        <Button sx={CLS.btn_save} type='submit' onClick={_handleSave}
          variant='contained' size='small'>
            Сохранить
          </Button>
      </Stack>
    </Stack>
  );
}