// src/components/TopBar.jsx
import * as React from 'react';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function TopBar() {
  return (
    <Box 
      sx={{ 
        py: 1,
        px: 1
      }}
    >
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link
          underline="hover"
          color="inherit"
          href="#"
          sx={{ 
            fontSize: '0.875rem',
            color: 'text.secondary',
            '&:hover': { color: 'primary.main' }
          }}
        >
          Home
        </Link>
        <Typography
          sx={{ 
            fontSize: '0.875rem',
            color: 'text.primary'
          }}
        >
          Dashboard
        </Typography>
      </Breadcrumbs>
    </Box>
  );
}
