import { AppBar, Toolbar, Typography, IconButton, FormControlLabel } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


import { switchReading } from '../../redux/testingReducer';
import { useDispatch } from 'react-redux';

import { Android12Switch } from './_styles';

// import { invoke } from '@tauri-apps/api';
// async function read_adam() {
//   invoke('read_adam', {address: '10.10.10.11:502'}).then(result => console.log(result));
// }

export default function AppHeader() {
  const dispatch = useDispatch();
  const _onMenuClick = () => {
    console.log("AppBar menu clicked");
  }

  const _handleChange = (event) => {
    dispatch(switchReading(event.target.checked));
  }

  return (
    <AppBar position="static" sx={{display: "flexbox", flexDirection: "row", height: "50px", border: "1px solid white", pl: "20px", alignItems: "center"}}>
      <IconButton
        size="medium"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={_onMenuClick}
      // sx={{ mr: 1 }}
      >
      <MenuIcon sx={{zIndex: 4}} />
      </IconButton>
      <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>ООО «ЭПУ Сервис» г.Когалым</Typography>
      <FormControlLabel control={<Android12Switch onChange={_handleChange} />} label="Adam" />
    </AppBar>
  );
}