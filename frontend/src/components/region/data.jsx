import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff',
    },
  },
});

const DataTable = () => {
  const [regions, setRegions] = useState([]);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openShowDialog, setOpenShowDialog] = useState(false);
  const [newRegionName, setNewRegionName] = useState('');
  const [regionToUpdate, setRegionToUpdate] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get('http://localhost:3002/regions/get');
        const regionsWithId = response.data.regions.map(region => ({ ...region, id: region._id }));
        setRegions(regionsWithId);
      } catch (error) {
        console.error('Error fetching regions:', error);
      }
    };

    fetchRegions();
  }, []);

  const handleEdit = (id) => {
    navigate(`/show/${id}`);
  };

  const getRegionName = (id) => {
    const region = regions.find(region => region.id === id);
    return region ? region.name : '';
  };
  
  const handleDelete = async (id) => {
    try {
      const regionName = getRegionName(id);
      const confirmDelete = window.confirm(`Are you sure you want to delete the region "${regionName}"?`);
      if (confirmDelete) {
        await axios.delete(`api/regions/${id}`);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting region:", error);
    }
  };

  const handleOpenUpdateDialog = (id) => {
    setOpenUpdateDialog(true);
    const region = regions.find(region => region.id === id);
    setRegionToUpdate(region);
    setNewRegionName(region.name); // Set initial value to current region name
  };

  const handleOpenShowDialog = async (id) => {
    try {
      const response = await axios.get(`api/regions/${id}`);
      if (response.status === 200) {
        setSelectedRegion(response.data);
        setOpenShowDialog(true);
      }
    } catch (error) {
      console.error("Error fetching region ok  details:", error);
    }
  };

  const handleChangeRegionName = (event) => {
    setNewRegionName(event.target.value);
  };

  const handleSubmitUpdate = async () => {
    try {
      const updatedRegion = { ...regionToUpdate, name: newRegionName }; // Updated to use 'name' property
      
      // Check if the updated region name already exists
      const response = await axios.get(`api/regions/check/${newRegionName}`);
      const { exists } = response.data;
  
      if (exists) {
        alert("This region already exists.");
        return;
      }
  
      // Update the region if it doesn't already exist
      await axios.put(`api/regions/update/${updatedRegion.id}`, updatedRegion);
   
      window.location.reload();
      handleCloseUpdateDialog();
    } catch (error) {
      console.error("Error updating region:", error);
    }
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };

  const handleCloseShowDialog = () => {
    setOpenShowDialog(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Region', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 400,
      renderCell: (params) => (
        <div style={{ width: "300px" }}>
          <button
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 12px',
              marginRight: '5px',
            }}
            onClick={() => handleOpenShowDialog(params.row.id)}
          >
            Show
          </button>
          <button
            style={{
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 12px',
              marginRight: '5px',
            }}
            onClick={() => handleOpenUpdateDialog(params.row.id)}
          >
            Update
          </button>
          <button
            style={{
              backgroundColor: '#dc3545',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 12px',
              marginRight: '5px',
            }}
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={regions}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />
      <ThemeProvider theme={theme}>
        <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
          <DialogTitle>Update Region</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the new name for the region:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="newRegionName"
              label="New Region Name"
              type="text"
              fullWidth
              value={newRegionName}
              onChange={handleChangeRegionName}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUpdateDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmitUpdate} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openShowDialog} onClose={handleCloseShowDialog} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedRegion ? selectedRegion.name : ''}</DialogTitle>
          <DialogContent>
            {selectedRegion && (
              <Card>
                <CardContent>
                  <Box mb={2}>
                    <Typography variant="h6">Region Name</Typography>
                    <Typography variant="body1">{selectedRegion.name}</Typography>
                    {/* Add other region details here if needed */}
                  </Box>
                </CardContent>
              </Card>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseShowDialog} variant="contained" color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  );
};

export default DataTable;
