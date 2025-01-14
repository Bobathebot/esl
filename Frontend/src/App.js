// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import SideMenu from './components/SideMenu';
import AppNavbar from './components/AppNavbar';
import Dashboard from './pages/Dashboard';
import Questions from './pages/Questions';
import Students from './pages/Students';
import Settings from './pages/Settings';

const App = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Sidebar */}
      <SideMenu />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <AppNavbar />
        <Toolbar />

        <Box sx={{ p: 3 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/students" element={<Students />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
