// src/components/Sidebar.jsx
import * as React from 'react';
import {
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Analytics as AnalyticsIcon,
  QuestionAnswer as QuestionAnswerIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Feedback as FeedbackIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { text: 'Home', icon: <DashboardIcon /> },
  { text: 'Analytics', icon: <AnalyticsIcon /> },
  { text: 'Questions', icon: <QuestionAnswerIcon /> },
  { text: 'Students', icon: <PeopleIcon /> },
];

const bottomMenuItems = [
  { text: 'Settings', icon: <SettingsIcon /> },
  { text: 'Feedback', icon: <FeedbackIcon /> },
];

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, 
          boxSizing: 'border-box',
          bgcolor: '#FFEB3B', // Yellow background
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            fontWeight: 600,
            color: '#000000',
            mb: 1
          }}
        >
          ESL English
        </Typography>
      </Box>
      
      <Divider />
      
      <List sx={{ px: 2 }}>
        {menuItems.map((item) => (
          <ListItem 
            component="div"
            key={item.text}
            sx={{
              cursor: 'pointer',
              borderRadius: 1,
              mb: 0.5,
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{
                fontSize: '0.875rem',
                fontWeight: 500
              }}
            />
          </ListItem>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider />
      
      <List sx={{ px: 2 }}>
        {bottomMenuItems.map((item) => (
          <ListItem 
            component="div"
            key={item.text}
            sx={{
              cursor: 'pointer',
              borderRadius: 1,
              mb: 0.5,
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              primaryTypographyProps={{
                fontSize: '0.875rem',
                fontWeight: 500
              }}
            />
          </ListItem>
        ))}
      </List>

      <Box 
        sx={{ 
          p: 2, 
          borderTop: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Avatar sx={{ bgcolor: 'primary.main' }}>JD</Avatar>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            John Doe
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Teacher
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}
