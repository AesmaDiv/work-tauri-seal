import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function MuiAppBar() {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton
          size="medium"
          edge="start"
          color="inherit"
          aria-label="menu"
          // sx={{ mr: 1 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}