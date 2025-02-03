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
  const [gouvernements, setGouvernements] = useState([]);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openShowDialog, setOpenShowDialog] = useState(false);
  const [newGouvernementName, setNewGouvernementName] = useState('');
  const [gouvernementToUpdate, setGouvernementToUpdate] = useState(null);
  const [selectedGouvernement, setSelectedGouvernement] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGouvernements = async () => {
      try {
        const response = await axios.get('http://localhost:3002/gouvernements/get');
        const gouvernementsWithId = response.data.gouvernements.map(gouvernement => ({ ...gouvernement, id: gouvernement._id }));
        setGouvernements(gouvernementsWithId);
      } catch (error) {
        console.error('Error fetching gouvernements:', error);
      }
    };

    fetchGouvernements();
  }, []);

  const handleEdit = (id) => {
    navigate(`/show/${id}`);
  };

  const getGouvernementName = (id) => {
    const gouvernement = gouvernements.find(gouvernement => gouvernement.id === id);
    return gouvernement ? gouvernement.name : '';
  };
  
  const handleDelete = async (id) => {
    try {
      const gouvernementName = getGouvernementName(id);
      const confirmDelete = window.confirm(`Are you sure you want to delete the gouvernement "${gouvernementName}"?`);
      if (confirmDelete) {
        await axios.delete(`api/gouvernements/${id}`);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting gouvernement:", error);
    }
  };

  const handleOpenUpdateDialog = (id) => {
    setOpenUpdateDialog(true);
    const gouvernement = gouvernements.find(gouvernement => gouvernement.id === id);
    setGouvernementToUpdate(gouvernement);
    setNewGouvernementName(gouvernement.name); // Set initial value to current gouvernement name
  };

  const handleOpenShowDialog = async (id) => {
    try {
      const response = await axios.get(`api/gouvernements/${id}`);
      if (response.status === 200) {
        setSelectedGouvernement(response.data);
        setOpenShowDialog(true);
      } else {
        console.error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching gouvernement details:", error.message);
      console.error("Error details:", error.response ? error.response.data : error);
    }
  };

  const handleChangeGouvernementName = (event) => {
    setNewGouvernementName(event.target.value);
  };

  const handleSubmitUpdate = async () => {
    try {
      const updatedGouvernement = { ...gouvernementToUpdate, name: newGouvernementName }; // Updated to use 'name' property
      
      // Check if the updated gouvernement name already exists
      const response = await axios.get(`api/gouvernements/check/${newGouvernementName}`);
      const { exists } = response.data;
  
      if (exists) {
        alert("This gouvernement already exists.");
        return;
      }
  
      // Update the gouvernement if it doesn't already exist
      await axios.put(`api/gouvernements/update/${updatedGouvernement.id}`, updatedGouvernement);
   
      window.location.reload();
      handleCloseUpdateDialog();
    } catch (error) {
      console.error("Error updating gouvernement:", error);
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
    { field: 'name', headerName: 'Gouvernement', width: 200 },
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
        rows={gouvernements}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />
      <ThemeProvider theme={theme}>
        <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
          <DialogTitle>Update Gouvernement</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the new name for the gouvernement:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="newGouvernementName"
              label="New Gouvernement Name"
              type="text"
              fullWidth
              value={newGouvernementName}
              onChange={handleChangeGouvernementName}
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
          <DialogTitle>{selectedGouvernement ? selectedGouvernement.name : ''}</DialogTitle>
          <DialogContent>
            {selectedGouvernement && (
              <Card>
                <CardContent>
                  <Box mb={2}>
                    <Typography variant="h6">Gouvernement Name</Typography>
                    <Typography variant="body1">{selectedGouvernement.name}</Typography>
                    {/* Add other gouvernement details here if needed */}
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
