import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';

const AppNavbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: 'transparent',
        boxShadow: 'none'
      }}
    >
      <Toolbar>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavbar;
