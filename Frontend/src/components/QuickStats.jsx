// src/components/QuickStats.js
import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';

const QuickStats = () => {
  const stats = [
    { title: 'Total Students', value: 150 },
    { title: 'Pending Submissions', value: 30 },
    { title: 'Completed Grading', value: 120 },
  ];

  return (
    <Grid container spacing={2}>
      {stats.map((stat, index) => (
        <Grid item xs={12} key={index}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              textAlign: 'center',
              backgroundColor: (theme) => theme.palette.background.default,
            }}
          >
            <Typography variant="h6" gutterBottom>
              {stat.title}
            </Typography>
            <Typography variant="h4" color="primary">
              {stat.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default QuickStats;
