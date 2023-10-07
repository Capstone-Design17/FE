import React from 'react';
import { AppBar } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
  return (
    <AppBar position="static" color="error">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Text
        </Typography>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          <MenuIcon onClick={alert('Text')} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
