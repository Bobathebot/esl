// src/components/StudentTable.jsx
import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
} from '@mui/material';

const StudentTable = ({ students }) => {
  // "students" is an array of objects like:
  // [
  //   { eslId: '123', partnerId: 'ABC', firstName: 'John', secondName: 'Doe', cohort: '2023' },
  //   ...
  // ]

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Student List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ESL ID</TableCell>
            <TableCell>Partner ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Second Name</TableCell>
            <TableCell>Cohort</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students && students.length > 0 ? (
            students.map((student, index) => (
              <TableRow key={index}>
                <TableCell>{student.eslId || '-'}</TableCell>
                <TableCell>{student.partnerId || '-'}</TableCell>
                <TableCell>{student.firstName || '-'}</TableCell>
                <TableCell>{student.secondName || '-'}</TableCell>
                <TableCell>{student.cohort || '-'}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No students found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentTable;
