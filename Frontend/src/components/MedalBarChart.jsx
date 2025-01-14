// src/components/MedalBarChart.jsx
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';

export default function MedalBarChart() {
  const theme = useTheme();
  const colorPalette = [
    // You can customize these colors to match "bronze, silver, gold" more closely
    '#cd7f32',          // Bronze
    '#c0c0c0',          // Silver
    '#FFD700',          // Gold
  ];

  // Sample data for the chart
  // Feel free to replace with actual monthly stats from your backend
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const bronzeData = [30, 45, 20, 40, 35, 50, 25];
  const silverData = [25, 40, 30, 55, 20, 35, 30];
  const goldData = [35, 30, 40, 25, 45, 20, 50];

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Student Essay Performance
        </Typography>

        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography variant="h4" component="p">
              1.2k
            </Typography>
            <Chip size="small" color="success" label="+5%" />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Essays categorized by Gold, Silver, Bronze in the last 7 months
          </Typography>
        </Stack>

        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'band',
              categoryGapRatio: 0.5,
              data: months,
            },
          ]}
          series={[
            {
              id: 'bronze',
              label: 'Bronze',
              data: bronzeData,
              stack: 'medals',
            },
            {
              id: 'silver',
              label: 'Silver',
              data: silverData,
              stack: 'medals',
            },
            {
              id: 'gold',
              label: 'Gold',
              data: goldData,
              stack: 'medals',
            },
          ]}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: false, // Set to false so we see the legend
              position: 'bottom',
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
