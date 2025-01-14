// src/components/PerformanceBarChart.jsx
import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';

const PerformanceBarChart = () => {
  const theme = useTheme();

  return (
    <BarChart
      xAxis={[
        {
          scaleType: 'band',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        },
      ]}
      series={[
        {
          id: 'gold',
          label: 'Gold',
          data: [30, 50, 40, 60, 70, 80, 90],
          stack: 'medals',
        },
        {
          id: 'silver',
          label: 'Silver',
          data: [20, 30, 25, 40, 50, 60, 70],
          stack: 'medals',
        },
        {
          id: 'bronze',
          label: 'Bronze',
          data: [10, 15, 20, 25, 30, 35, 40],
          stack: 'medals',
        },
      ]}
      height={300}
      colors={[
        theme.palette.warning.main,
        theme.palette.grey[500],
        theme.palette.primary.main,
      ]}
      slotProps={{
        legend: {
          position: 'bottom',
        },
      }}
    />
  );
};

export default PerformanceBarChart;
