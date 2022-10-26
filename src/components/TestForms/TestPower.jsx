import { List } from "@mui/material";
import { Stack } from "@mui/system";
import { useRecordContext } from "../../contexts/RecordContext";
import DataField from "../DataField/DataField";


const DATANAMES = [
  {name: 'ttime', label: 'Время испытания'},
  {name: 'rpm', label: 'Скорость, мин−1'},
  {name: 'torque', label: 'Момент, Н*м'},
  {name: 'power', label: 'Мощность, кВт'},
  {name: 'temp', label: 'Температура, °C'},
]

export default function TestPower() {
  const {context} = useRecordContext();

  const _createDataValues = () => {
    return (
      <List sx={{width: "17%", display: "flex", flexDirection: "column", gap: "30px"}}>
        {
        DATANAMES.map(item => 
          <DataField key={item.name} data={item}
            props={{
              InputProps: { style: { color: '#ffc653'}, readOnly: true },
              InputLabelProps: { style: { color: 'white' }, shrink: true }
            }}/>
          // <ListItem>
          //   <ListItemText primary='a' secondary={item}/>
          // </ListItem>
        )}
      </List>
    )
    
  }

  console.log("--- TEST-PROC");
  return (
    <Stack direction='row' sx={{width: "100%", height: '575px'}}>
        {_createDataValues()}
      {/* <MyChart width="80%" height="100%"/> */}
    </Stack>
  );
}