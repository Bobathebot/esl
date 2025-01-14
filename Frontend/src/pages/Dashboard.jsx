// src/pages/Dashboard.jsx
import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BarChart } from '@mui/x-charts/BarChart';
import { DataGrid } from '@mui/x-data-grid';
import Sidebar from '../components/Sidebar'; 
import TopBar from '../components/TopBar'; 

// Function to render the Medal Bar Chart
function MedalBarChart() {
  const theme = useTheme();
  const colorPalette = ['#cd7f32', '#c0c0c0', '#ffd700']; // Bronze, Silver, Gold
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Replace with actual data fetching or data
  const bronzeData = [223, 387, 300, 412, 335, 278, 299, 213, 345, 432, 123, 342];
  const silverData = [309, 421, 238, 210, 475, 359, 238, 345, 123, 465, 345, 132];
  const goldData = [405, 227, 312, 469, 390, 203, 227, 432, 234, 123, 321, 434];

  const containerRef = React.useRef(null);
  const [chartDimensions, setChartDimensions] = React.useState({ width: 800, height: 300 });

  React.useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setChartDimensions({ width: width - 40, height: 300 }); // -40 for padding
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <Box sx={{ width: '100%' }} ref={containerRef}>
      <Typography 
        component="h2" 
        variant="h5"
        sx={{ 
          mb: 3,
          fontWeight: 600,
          color: 'text.primary'
        }}
      >
        Student Essay Performance
      </Typography>
      <Box sx={{ width: '100%', height: 300, display: 'flex', justifyContent: 'center' }}>
        <BarChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'band',
              categoryGapRatio: 0.5,
              data: months,
              tickLabelStyle: {
                fontSize: 12,
              },
            },
          ]}
          series={[
            {
              id: 'bronze',
              label: 'Bronze',
              data: bronzeData,
              stack: 'A',
            },
            {
              id: 'silver',
              label: 'Silver',
              data: silverData,
              stack: 'A',
            },
            {
              id: 'gold',
              label: 'Gold',
              data: goldData,
              stack: 'A',
            },
          ]}
          width={chartDimensions.width}
          height={chartDimensions.height}
          margin={{ left: 50, right: 20, top: 20, bottom: 30 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </Box>
    </Box>
  );
}

// Helper function to color-code cells in the DataGrid
function renderMedalCell(params) {
  const value = params.value || '';
  let bgColor = 'transparent';
  if (value.toLowerCase() === 'bronze') bgColor = '#cd7f32';
  if (value.toLowerCase() === 'silver') bgColor = '#c0c0c0';
  if (value.toLowerCase() === 'gold') bgColor = '#ffd700';

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: bgColor === 'transparent' ? 'inherit' : '#000',
        fontWeight: 600,
      }}
    >
      {value}
    </Box>
  );
}

// Function to render the DataGrid for student information
function CustomizedDataGrid() {
  // Define columns for DataGrid
  const columns = [
    { field: 'eslId', headerName: 'ESL ID', width: 150 },
    { field: 'firstName', headerName: 'Name', width: 150 },
    // Monthly columns with color-coded medals
    { field: 'jan', headerName: 'Jan', width: 100, renderCell: renderMedalCell },
    { field: 'feb', headerName: 'Feb', width: 100, renderCell: renderMedalCell },
    { field: 'mar', headerName: 'Mar', width: 100, renderCell: renderMedalCell },
    { field: 'apr', headerName: 'Apr', width: 100, renderCell: renderMedalCell },
    { field: 'may', headerName: 'May', width: 100, renderCell: renderMedalCell },
    { field: 'jun', headerName: 'Jun', width: 100, renderCell: renderMedalCell },
    { field: 'jul', headerName: 'Jul', width: 100, renderCell: renderMedalCell },
    { field: 'aug', headerName: 'Aug', width: 100, renderCell: renderMedalCell },
    { field: 'sep', headerName: 'Sep', width: 100, renderCell: renderMedalCell },
    { field: 'oct', headerName: 'Oct', width: 100, renderCell: renderMedalCell },
    { field: 'nov', headerName: 'Nov', width: 100, renderCell: renderMedalCell },
    { field: 'dec', headerName: 'Dec', width: 100, renderCell: renderMedalCell },
  ];

  // Example rows with random medals
  const rows = [
    {
      id: 1,
      partnerId: 'PT-999',
      eslId: 'ESL-1001',
      firstName: 'John',
      secondName: 'Doe',
      jan: 'Gold',
      feb: 'Silver',
      mar: 'Bronze',
      apr: 'Gold',
      may: 'Gold',
      jun: 'Bronze',
      jul: 'Silver',
      aug: 'Gold',
      sep: 'Bronze',
      oct: 'Gold',
      nov: 'Silver',
      dec: 'Gold',
    },
    {
      id: 2,
      partnerId: 'PT-888',
      eslId: 'ESL-1002',
      firstName: 'Jane',
      secondName: 'Smith',
      jan: 'Silver',
      feb: 'Gold',
      mar: 'Gold',
      apr: 'Bronze',
      may: 'Silver',
      jun: 'Gold',
      jul: 'Bronze',
      aug: 'Silver',
      sep: 'Gold',
      oct: 'Bronze',
      nov: 'Gold',
      dec: 'Silver',
    },
    {
      id: 3,
      partnerId: 'PT-777',
      eslId: 'ESL-1003',
      firstName: 'Alice',
      secondName: 'Wong',
      jan: 'Bronze',
      feb: 'Silver',
      mar: 'Gold',
      apr: 'Silver',
      may: 'Bronze',
      jun: 'Gold',
      jul: 'Gold',
      aug: 'Silver',
      sep: 'Bronze',
      oct: 'Gold',
      nov: 'Silver',
      dec: 'Bronze',
    },
  ];

  return (
    <Box sx={{ width: '100%', mt: 2, overflowX: 'auto' }}>
      <DataGrid
        autoHeight
        checkboxSelection
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        density="compact"
        sx={{
          '& .even': {
            backgroundColor: '#f9f9f9',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-cell': {
            border: 'none', // Remove cell borders
          },
          '& .MuiDataGrid-row': {
            '&:hover': {
              backgroundColor: '#f0f0f0', // Highlight row on hover
            },
          },
        }}
      />
    </Box>
  );
}

// Main Dashboard component
export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar />

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          overflow: 'hidden',
          bgcolor: 'background.default'
        }}
      >
        <Box sx={{ bgcolor: 'background.default' }}>
          <TopBar />
        </Box>

        <Box sx={{ p: 4, flex: 1 }}>
          <Stack 
            spacing={4} 
            sx={{ 
              maxWidth: 900,
              mx: 'auto',
              width: '100%',
              mb: 4,
              alignItems: 'center'
            }}
          >
              <Box
              sx={{
                bgcolor: 'background.paper',
                p: 4,
                borderRadius: 2,
                boxShadow: '0 0 10px rgba(0,0,0,0.05)',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <MedalBarChart />
            </Box>

            <Box
              sx={{
                bgcolor: 'background.paper',
                p: 4,
                borderRadius: 2,
                boxShadow: '0 0 10px rgba(0,0,0,0.05)',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{ 
                  mb: 3,
                  fontWeight: 600,
                  color: 'text.primary'
                }}
              >
                Student Monthly Performance
              </Typography>
              <CustomizedDataGrid />
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
