import { useSelector, useDispatch } from "react-redux";
import { Stack } from "@mui/system";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";

import DataField from "../DataField/DataField";
import { useHardware } from "../../contexts/HardwareContext";
import { switchTesting } from "../../redux/testingReducer";
import { resetPoints } from "../../redux/pointsReducer";
import { writePoints } from "../../redux/recordReducer";

import { STYLES as CLS } from "./_styles";
import { useEffect } from "react";


/** Универсальный компонент для управления испытанием
 * @param tracked_state имя отслеживаемого флага испытания
 * @param data_fields список параметров для полей отображения значений вида
 * - [.. ,{name: 'имя', label: 'заголовок'}, ..]
 */
export default function TestingFormControls({name, tracked_state, data_fields}) {
  // данные с оборудования
  const hw_values = useHardware();
  // состояние испытания и callback переключения
  const is_reading = useSelector(state => state.testingReducer.is_reading);
  const is_testing = useSelector(state => state.testingReducer[tracked_state]);
  const points = useSelector(state => state.pointsReducer[tracked_state]);
  // const record = useSelector(state => state.recordReducer.record);

  const dispatch = useDispatch();


  /** Обработчик переключения состояния испытания */
  const _handleChangeRecordMode = (_, new_state) => {
    if (is_reading && new_state !== null && new_state !== is_testing) {
      new_state && dispatch(resetPoints(tracked_state));
      dispatch(switchTesting({
        state_name: tracked_state,
        state_value: new_state
      }));
    }
  }
  /** Обработчик кнопки сохранения испытания давления диафрагм */
  const _handleSave = (event) => {
    // если запущен тест - не сохранять
    is_testing || dispatch(writePoints({
      state_name: tracked_state,
      state_value: points
    }));
  }

  const color = name === "Pressure" ? "green" : "red";
  console.log(`%c --- CONTROLS RENDER %c ${name} ---`, 'color: #7777ff', `color: ${color}`);
  return (
    <Stack direction="column" sx={CLS.controls}>
      <Stack direction="column" sx={CLS.controls_data}>
        {
        data_fields.map(item => {
          return <DataField key={item.name} data={item}
            value={hw_values[tracked_state][item.name].toString()}
            inputProps={{
              InputProps: { style: { color: '#ffc653'}, readOnly: true },
              InputLabelProps: { style: { color: 'white' }, shrink: true }
            }}/>
          }
        )}
      </Stack>
      <Stack sx={CLS.controls_btns}>
        <ToggleButtonGroup exclusive sx={CLS.controls_test}
          value={is_testing} onChange={_handleChangeRecordMode}>

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