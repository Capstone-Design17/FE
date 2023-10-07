import React from 'react';
import { AppBar } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
  const openMenu = () => {
    alert('Text');
    // Modal?
  };

  return (
    <AppBar position="static" color="error">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Text
          {/* 로고 넣기 */}
        </Typography>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          <MenuIcon onClick={openMenu} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
