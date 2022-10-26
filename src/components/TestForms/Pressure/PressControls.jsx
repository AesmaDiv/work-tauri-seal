import { useState } from "react";
import { Stack } from "@mui/system";
import { ToggleButton, ToggleButtonGroup, Button } from "@mui/material";

import DataField from "../../DataField/DataField";
import { DATANAMES } from "./_config";

import cls from './_style.module.css';
import { usePointsContext } from "../../../contexts/PointsContext";

const STATES = {
  START: 'СТАРТ',
  STOP:  'СТОП'
}

export default function PressControls(props) {
  const {switchRunning} = usePointsContext();
  const [state, setState] = useState(STATES.STOP); // кнопка управления испытанием

  /** Обработчик переключения состояния испытания */
  const _handleChangeTestMode = (_, new_state) => {
    // изменение нажатой кнопки
    if ((new_state !== state) && (new_state !== null)) {
      setState(new_state);
      // передача сигнала об изменении состояния испытания
      switchRunning(new_state === STATES.START);
    }
  }
  /** Обработчик кнопки сохранения испытания давления диафрагм */
  const _handleSavePress = (event) => {
    // передача сигнала о нажатии кнопки сохранения
    props?.onSavePress();
  }

  console.log("--- PRESS CONTROLS RENDER");
  return (
    <Stack className={cls.press_controls}>
      <Stack className={cls.press_controls_data}>
        {
        DATANAMES.map(item => 
          <DataField key={item.name} data={item}
            inputProps={{
              InputProps: { style: { color: '#ffc653'}, readOnly: true },
              InputLabelProps: { style: { color: 'white' }, shrink: true }
            }}/>
        )}
      </Stack>
      <Stack className={cls.press_controls_buttons}>
        <ToggleButtonGroup exclusive value={state} onChange={_handleChangeTestMode}>
          <ToggleButton className={cls.press_btn_start} value={STATES.START}
            variant='contained' size='small' color="error">
              {STATES.START}
          </ToggleButton>
          <ToggleButton className={cls.press_btn_start} value={STATES.STOP}
            variant='contained' size='small' color="info">
              {STATES.STOP}
          </ToggleButton>
        </ToggleButtonGroup>
        <Button className={cls.press_btn_save} type='submit' onClick={_handleSavePress}
          variant='contained' size='small'>
            Сохранить
          </Button>
      </Stack>
    </Stack>
  )
}