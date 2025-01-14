// src/components/MainGrid.jsx
import React from 'react';
import { Stack } from '@mui/material';
import PerformanceTable from './PerformanceTable';
import StudentDataGrid from './StudentDataGrid';

export default function MainGrid() {
  return (
    <Stack
      direction="column"
      spacing={3}
      sx={{ width: '100%', maxWidth: '1200px', mt: 2 }}
    >
      {/* 1) The "table on top" */}
      <PerformanceTable />

      {/* 2) The "excel-like" data grid on bottom */}
      <StudentDataGrid />
    </Stack>
  );
}
