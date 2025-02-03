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
  const [rues, setrues] = useState([]);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openShowDialog, setOpenShowDialog] = useState(false);
  const [newrueName, setNewrueName] = useState('');
  const [rueToUpdate, setrueToUpdate] = useState(null);
  const [selectedrue, setSelectedrue] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchrues = async () => {
      try {
        const response = await axios.get('http://localhost:3002/rues/get');
        const ruesWithId = response.data.rues.map(rue => ({ ...rue, id: rue._id }));
        setrues(ruesWithId);
      } catch (error) {
        console.error('Error fetching rues:', error);
      }
    };

    fetchrues();
  }, []);

  const handleEdit = (id) => {
    navigate(`/show/${id}`);
  };

  const getrueName = (id) => {
    const rue = rues.find(rue => rue.id === id);
    return rue ? rue.name : '';
  };
  
  const handleDelete = async (id) => {
    try {
      const rueName = getrueName(id);
      const confirmDelete = window.confirm(`Are you sure you want to delete the rue "${rueName}"?`);
      if (confirmDelete) {
        await axios.delete(`api/rues/${id}`);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting rue:", error);
    }
  };

  const handleOpenUpdateDialog = (id) => {
    setOpenUpdateDialog(true);
    const rue = rues.find(rue => rue.id === id);
    setrueToUpdate(rue);
    setNewrueName(rue.name); // Set initial value to current rue name
  };

  const handleOpenShowDialog = async (id) => {
    try {
      const response = await axios.get(`api/rues/${id}`);
      if (response.status === 200) {
        setSelectedrue(response.data);
        setOpenShowDialog(true);
      }
    } catch (error) {
      console.error("Error fetching rue ok  details:", error);
    }
  };

  const handleChangerueName = (event) => {
    setNewrueName(event.target.value);
  };

  const handleSubmitUpdate = async () => {
    try {
      const updatedrue = { ...rueToUpdate, name: newrueName }; // Updated to use 'name' property
      
      // Check if the updated rue name already exists
      const response = await axios.get(`api/rues/check/${newrueName}`);
      const { exists } = response.data;
  
      if (exists) {
        alert("This rue already exists.");
        return;
      }
  
      // Update the rue if it doesn't already exist
      await axios.put(`api/rues/update/${updatedrue.id}`, updatedrue);
   
      window.location.reload();
      handleCloseUpdateDialog();
    } catch (error) {
      console.error("Error updating rue:", error);
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
    { field: 'name', headerName: 'rue', width: 200 },
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
        rows={rues}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />
      <ThemeProvider theme={theme}>
        <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
          <DialogTitle>Update rue</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the new name for the rue:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="newrueName"
              label="New rue Name"
              type="text"
              fullWidth
              value={newrueName}
              onChange={handleChangerueName}
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
          <DialogTitle>{selectedrue ? selectedrue.name : ''}</DialogTitle>
          <DialogContent>
            {selectedrue && (
              <Card>
                <CardContent>
                  <Box mb={2}>
                    <Typography variant="h6">rue Name</Typography>
                    <Typography variant="body1">{selectedrue.name}</Typography>
                    {/* Add other rue details here if needed */}
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
