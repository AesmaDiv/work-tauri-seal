import { useState, startTransition } from "react";
import { Accordion, AccordionDetails, AccordionSummary, LinearProgress } from "@mui/material";
import { Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { updateHardware } from "../../contexts/HardwareContext";
import { useRecordContext } from "../../contexts/RecordContext";


const READING_ALOWED = true;

/** Оборачиватель в разворачиваемые группы */
export default function AccordionWrapper({direction, children}) {
  const changeHardware = updateHardware();
  const default_key = children?.length ? children[0].props.accordion_key : '';
  const [expanded_key, setExpanded] = useState(default_key);
  const {is_reading} = useRecordContext();

  /** Обработчик выбора группы */
  const _handleSelect = (item) => {
    if (item.props.accordion_key === expanded_key) return;
    // в зависимости от того, выбрана группа с испытанием или нет
    // запускаем или останавливаем чтение с оборудования
    let new_state = ['key_testpress', 'key_testpower'].includes(item.props.accordion_key);
    if (READING_ALOWED) {
      startTransition(() => changeHardware(
        (prev) => (
          {...prev, is_reading: new_state}
        )
      ));
    }
    // разворачиваем выбранную группу
    setExpanded(item.props.accordion_key);
  }

  /** Оборачивание переданного компонента в разворачиваемую группу */
  const _createComponent = (item) => {
    const is_expanded = expanded_key === item.props.accordion_key;
    return (
      <Accordion 
      key={item.props.accordion_key}
      expanded={is_expanded}
      sx={{backgroundColor: 'rgb(60,60,60)', color: 'white', border: '1px solid white'}}>
        <AccordionSummary sx={{width: '100%'}} expandIcon={<ExpandMoreIcon/>} onClick={e => _handleSelect(item)}>
          <Stack sx={{width: '100%', justifyContent: 'space-between', alignItems: 'baseline'}} direction={'row'}>
            <Typography>{item.props.accordion_title}</Typography>
            {is_expanded && is_reading && <LinearProgress sx={{width: '50px', height: '3px'}}/>}
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          {item}
        </AccordionDetails>
    </Accordion>
    )
  }
    


  return (
    <Stack direction={direction} sx={{width: '100%', margin: '10px', gap: 1}}>
      { children.length ? 
          children.map(item => _createComponent(item)) :
          _createComponent(children)}
    </Stack>
  )
}