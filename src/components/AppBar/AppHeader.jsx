import { useState, useRef } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, FormControlLabel } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect } from 'react';


import { Android12Switch } from './_styles';
import { updateTesting } from '../../contexts/TestingContext';

const _HEIGHT = 50;
const _BCKCOLOR = '#1976d2';

export default function AppHeader({children}) {
  const manageStates = updateTesting();

  const _onMenuClick = () => {
    console.log("AppBar menu clicked");
  }

  const _handleChange = (event) => {
    console.warn("AppBar buttonCliked");
    manageStates({type: 'reading', param: event.target.checked})
  }

  return (
    <Box>
      <AppBar position="static" sx={{height: _HEIGHT, zIndex: 10}}>
        <Toolbar variant="dense" sx={{backgroundColor: _BCKCOLOR}}>
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
          <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
            ООО «ЛУКОЙЛ ЭПУ Сервис» г.Когалым
          </Typography>
          <FormControlLabel control={<Android12Switch onChange={_handleChange} />} label="Adam" />
        </Toolbar>
      </AppBar>
    </Box>
  );
}