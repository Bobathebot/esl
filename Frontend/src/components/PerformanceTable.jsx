// src/components/PerformanceTable.jsx
import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Box,
} from '@mui/material';

const mockPerformanceData = [
  { month: 'Jan', gold: 12, silver: 8, bronze: 5 },
  { month: 'Feb', gold: 9, silver: 11, bronze: 7 },
  { month: 'Mar', gold: 15, silver: 9, bronze: 10 },
  { month: 'Apr', gold: 10, silver: 14, bronze: 6 },
];

export default function PerformanceTable() {
  return (
    <Paper sx={{ width: '100%', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Monthly Medal Counts
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Month</TableCell>
            <TableCell>Gold</TableCell>
            <TableCell>Silver</TableCell>
            <TableCell>Bronze</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockPerformanceData.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>{row.month}</TableCell>
              <TableCell>{row.gold}</TableCell>
              <TableCell>{row.silver}</TableCell>
              <TableCell>{row.bronze}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
