// src/components/SideMenu.jsx
import React from 'react';
import { Drawer, Box, Typography, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const SideMenu = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Questions', icon: <QuestionAnswerIcon />, path: '/questions' },
    { text: 'Students', icon: <PeopleIcon />, path: '/students' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'primary.main', // color your sidebar
          color: '#fff',
        },
      }}
    >
      {/* Optional Logo/Title at the top */}
      <Box
        sx={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          px: 2,
          backgroundColor: 'primary.dark', // slightly darker
        }}
      >
        <Typography variant="h6" noWrap>
          ESL Dashboard
        </Typography>
      </Box>

      <List>
        {menuItems.map((item, i) => (
          <ListItemButton
            key={i}
            component={Link}
            to={item.path}
            sx={{
              '&:hover': {
                backgroundColor: 'primary.light',
              },
            }}
          >
            <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default SideMenu;
