import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AccordionWrapper({direction, children}) {
  const default_key = children?.length ? children[0].props.accordion_key : '';
  const [is_expanded, setExpanded] = useState(default_key);

  const _createComponent = (item) =>
    <Accordion 
      key={item.props.accordion_key}
      expanded={is_expanded === item.props.accordion_key}
      sx={{
        backgroundColor: 'rgb(60,60,60)', color: 'white', border: '1px solid white',
        /* boxShadow: '3px 3px 5px black' */}}
      >
      <AccordionSummary 
        expandIcon={<ExpandMoreIcon/>}
        onClick={e => setExpanded(
          is_expanded !== item.props.accordion_key ? item.props.accordion_key : default_key
        )}>
        <Typography>{item.props.accordion_title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {item}
      </AccordionDetails>
    </Accordion>


  return (
    <Stack direction={direction} sx={{width: '100%', margin: '10px', gap: 1}}>
      { children.length ? 
          children.map(item => _createComponent(item)) :
          _createComponent(children)}
    </Stack>
  )
}