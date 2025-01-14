import React from 'react';
import { Card as MuiCard, CardContent, Typography } from '@mui/material';

const DashboardCard = ({ title, value }) => (
  <MuiCard sx={{ boxShadow: 3, borderRadius: 2 }}>
    <CardContent>
      <Typography variant="h6" color="textSecondary">
        {title}
      </Typography>
      <Typography variant="h4">{value}</Typography>
    </CardContent>
  </MuiCard>
);

export default DashboardCard;
