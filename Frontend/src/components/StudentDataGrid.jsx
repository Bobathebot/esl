// src/components/StudentDataGrid.jsx
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Typography } from '@mui/material';

export default function StudentDataGrid() {
  // Example “mock” rows
  const rows = [
    {
      id: 1,
      eslId: 'ESL-1001',
      partnerId: 'PT-123',
      firstName: 'John',
      secondName: 'Doe',
      cohort: 'Spring 2024',
    },
    {
      id: 2,
      eslId: 'ESL-1002',
      partnerId: 'PT-456',
      firstName: 'Jane',
      secondName: 'Smith',
      cohort: 'Fall 2023',
    },
    {
      id: 3,
      eslId: 'ESL-1003',
      partnerId: 'PT-789',
      firstName: 'Alice',
      secondName: 'Wong',
      cohort: 'Summer 2024',
    },
    // ... add more rows or fetch from your backend
  ];

  // Define the columns
  const columns = [
    { field: 'eslId', headerName: 'ESL ID', flex: 1 },
    { field: 'partnerId', headerName: 'Partner ID', flex: 1 },
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'secondName', headerName: 'Second Name', flex: 1 },
    { field: 'cohort', headerName: 'Cohort', flex: 1 },
  ];

  return (
    <Paper sx={{ width: '100%', p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Student Information
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          disableSelectionOnClick
        />
      </div>
    </Paper>
  );
}
