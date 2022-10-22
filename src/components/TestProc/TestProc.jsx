import { List, ListItem, ListItemText, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { useTestContext } from "../../contexts/TestContext";
import MyChart from "../Chart/Chart";


const DATANAMES = [
  'давление в системе',
  'давление верхней диафрагмы',
  'давление нижней диафрагмы'
]

export default function TestProc() {
  const {context} = useTestContext();

  const _createDataValues = () => {
    return (
      <List dense sx={{width: "20%"}}>
        {
        DATANAMES.map(item => 
          <ListItem>
            <ListItemText primary='a' secondary={item}/>
          </ListItem>)
        }
      </List>
    )
    
  }

  console.log("--- TEST-PROC");
  return (
    <Stack direction='row' sx={{width: "100%", height: '475px'}}>
        {_createDataValues()}
      <MyChart width="80%" height="100%"/>
    </Stack>
  );
}