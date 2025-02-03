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
  const [secteurs, setSecteurs] = useState([]);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openShowDialog, setOpenShowDialog] = useState(false);
  const [newSecteurName, setNewSecteurName] = useState('');
  const [secteurToUpdate, setSecteurToUpdate] = useState(null);
  const [selectedSecteur, setSelectedSecteur] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSecteurs = async () => {
      try {
        const response = await axios.get('http://localhost:3002/secteurs/get');
        const secteursWithId = response.data.secteurs.map(secteur => ({ ...secteur, id: secteur._id }));
        setSecteurs(secteursWithId);
      } catch (error) {
        console.error('Error fetching secteur:', error);
      }
    };
  
    fetchSecteurs();
  }, []);

  const handleEdit = (id) => {
    navigate(`/show/${id}`);
  };

  const getSecteurName = (id) => {
    const secteur = secteurs.find(secteur => secteur.id === id);
    return secteur ? secteur.name : '';
  };
  
  const handleDelete = async (id) => {
    try {
      const secteurName = getSecteurName(id);
      const confirmDelete = window.confirm(`Are you sure you want to delete the secteur "${secteurName}"?`);
      if (confirmDelete) {
        await axios.delete(`api/secteurs/${id}`);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting secteur:", error);
    }
  };

  const handleOpenUpdateDialog = (id) => {
    setOpenUpdateDialog(true);
    const secteur = secteurs.find(secteur => secteur.id === id);
    setSecteurToUpdate(secteur);
    setNewSecteurName(secteur.name); // Set initial value to current secteur name
  };

  const handleOpenShowDialog = async (id) => {
    try {
      const response = await axios.get(`api/secteurs/${id}`);
      if (response.status === 200) {
        setSelectedSecteur(response.data);
        setOpenShowDialog(true);
      }
    } catch (error) {
      console.error("Error fetching secteur details:", error);
    }
  };

  const handleChangeSecteurName = (event) => {
    setNewSecteurName(event.target.value);
  };

  const handleSubmitUpdate = async () => {
    try {
      const updatedSecteur = { ...secteurToUpdate, name: newSecteurName }; // Updated to use 'name' property
      
      // Check if the updated secteur name already exists
      const response = await axios.get(`api/secteurs/check/${newSecteurName}`);
      const { exists } = response.data;
  
      if (exists) {
        alert("This secteur already exists.");
        return;
      }
  
      // Update the secteur if it doesn't already exist
      await axios.put(`api/secteurs/update/${updatedSecteur.id}`, updatedSecteur);
   
      window.location.reload();
      handleCloseUpdateDialog();
    } catch (error) {
      console.error("Error updating secteur:", error);
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
    { field: 'name', headerName: 'Secteur', width: 200 },
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
        rows={secteurs}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />
      <ThemeProvider theme={theme}>
        <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
          <DialogTitle>Update Secteur</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the new name for the secteur:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="newSecteurName"
              label="New Secteur Name"
              type="text"
              fullWidth
              value={newSecteurName}
              onChange={handleChangeSecteurName}
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
          <DialogTitle>{selectedSecteur ? selectedSecteur.name : ''}</DialogTitle>
          <DialogContent>
            {selectedSecteur && (
              <Card>
                <CardContent>
                  <Box mb={2}>
                    <Typography variant="h6">Secteur Name</Typography>
                    <Typography variant="body1">{selectedSecteur.name}</Typography>
                    {/* Add other secteur details here if needed */}
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
