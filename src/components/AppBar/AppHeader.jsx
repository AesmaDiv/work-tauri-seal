import { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


const _HEIGHT = 50;
const _BCKCOLOR = '#1976d2';

export default function AppHeader({children}) {
  const [drawer_state, setDrawerState] = useState(false);

  const _onMenuClick = () => {
    console.log("AppBar menu clicked");
    setDrawerState(!drawer_state);
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
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      <Drawer
        variant='temporary'
        classes={{
          root: {paddingTop: 100, zIndex: 4}
        }}
        elevation={16}
        anchor='left'
        open={drawer_state}
        onClose={() => {}}
        onClick={() => setDrawerState(false)}
        PaperProps={{style: {backgroundColor: _BCKCOLOR, paddingTop: _HEIGHT, zIndex: 2}}}
        >
        {children}
      </Drawer>
      </AppBar>
    </Box>
  );
}