import * as React from 'react';
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@mui/material/styles';

export default function AppTheme({ children, themeComponents }) {
  let theme = createTheme({
    palette: {
      primary: {
        main: '#2196F3', // Blue for primary actions
        light: '#64B5F6',
        dark: '#1976D2',
      },
      secondary: {
        main: '#FFC107', // Amber for secondary elements
        light: '#FFD54F',
        dark: '#FFA000',
      },
      background: {
        default: '#F5F5F5',
        paper: '#FFFFFF',
      },
      success: {
        main: '#4CAF50', // Green for success states
      },
      warning: {
        main: '#FF9800', // Orange for warnings
      },
      error: {
        main: '#F44336', // Red for errors
      },
      text: {
        primary: '#2C3E50',
        secondary: '#607D8B',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 600,
        fontSize: '2.5rem',
      },
      h2: {
        fontWeight: 600,
        fontSize: '2rem',
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.75rem',
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.5rem',
      },
      h5: {
        fontWeight: 600,
        fontSize: '1.25rem',
      },
      h6: {
        fontWeight: 600,
        fontSize: '1rem',
      },
      subtitle1: {
        fontSize: '1rem',
        fontWeight: 500,
      },
      subtitle2: {
        fontSize: '0.875rem',
        fontWeight: 500,
      },
      body1: {
        fontSize: '1rem',
      },
      body2: {
        fontSize: '0.875rem',
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.04)',
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: 'none',
            backgroundColor: '#FFFFFF',
            '& .MuiDataGrid-cell': {
              borderColor: '#F0F0F0',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#F5F5F5',
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScrollerRenderZone': {
              '& .MuiDataGrid-row': {
                '&:nth-of-type(2n)': {
                  backgroundColor: '#FAFAFA',
                },
              },
            },
          },
        },
      },
      ...themeComponents,
    },
  });

  theme = responsiveFontSizes(theme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
