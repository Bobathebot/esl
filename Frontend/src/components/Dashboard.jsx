// src/components/Dashboard.js
import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import PerformanceBarChart from './PerformanceBarChart';

const Dashboard = () => {
  return (
    <Grid container spacing={3}>
      {/* Performance Chart */}
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Monthly Performance
          </Typography>
          <PerformanceBarChart />
        </Paper>
      </Grid>
      {/* Additional Stats */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Quick Stats
          </Typography>
          {/* Add quick stats components here */}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
