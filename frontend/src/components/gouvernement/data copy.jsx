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

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff',
    },
  },
});

const DataTable = () => {
  const [gouvernements, setGouvernements] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newGouvernementName, setNewGouvernementName] = useState('');
  const [gouvernementToUpdate, setGouvernementToUpdate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGouvernements = async () => {
      try {
        const response = await axios.get('http://localhost:3002/gouvernements/get');
        const gouvernementsWithId = response.data.gouvernements.map(gouvernement => ({ ...gouvernement, id: gouvernement._id }));
        setGouvernements(gouvernementsWithId);
      } catch (error) {
        console.error('Error fetching Gouvernements:', error);
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

  const handleOpenDialog = (id) => {
    setOpenDialog(true);
    const gouvernement = gouvernements.find(gouvernement => gouvernement.id === id);
    setGouvernementToUpdate(gouvernement);
    setNewGouvernementName(gouvernement.name); // Set initial value to current bank name
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangeGouvernementnName = (event) => {
    setNewGouvernementName(event.target.value);
  };

  const handleSubmitUpdate = async () => {
    try {
      const updatedGouvernement = { ...gouvernementToUpdate, name: newGouvernementName }; // Updated to use 'name' property
      
      // Check if the updated region name already exists
      const response = await axios.get(`api/gouvernements/check/${newGouvernementName}`);
      const { exists } = response.data;
  
      if (exists) {
        alert("This gouvernement already exists.");
        return;
      }
  
      // Update the region if it doesn't already exist
      await axios.put(`api/gouvernements/update/${updatedGouvernement.id}`, updatedGouvernement);
   
      window.location.reload();
      handleCloseDialog();
    } catch (error) {
      console.error("Error updating gouvernement:", error);
    }
  };
  
  const handleShow = (id) => {
    navigate(`/show/${id}`);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Gouvernement', width: 200 },
   
  
    {
      field: 'actions',
      headerName: 'Actions',
      width: 400,
      renderCell: (params) => (
        <div style={{ width:"300px" }}>
          <button
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 12px',
             
              marginRight: '5px',
            }}
            onClick={() => handleEdit(params.row.id)}
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
            onClick={() => handleOpenDialog(params.row.id)}
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
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Update gouvernement</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the new name for the gouvernement:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="newGouvernementName"
              label="New gouvernement Name"
              type="text"
              fullWidth
              value={newGouvernementName}
              onChange={handleChangeGouvernementnName}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmitUpdate} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  );
};

export default DataTable;
