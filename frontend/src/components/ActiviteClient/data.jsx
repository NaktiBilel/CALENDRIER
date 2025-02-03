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
  const [activites, setActivites] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newActiviteName, setNewActiviteName] = useState('');
  const [activiteToUpdate, setActiviteToUpdate] = useState(null);
  const [openShowDialog, setOpenShowDialog] = useState(false); // Nouvelle variable d'état
  const [selectedActivite, setSelectedActivite] = useState(null); // Nouvelle variable d'état pour stocker les détails de l'activité sélectionnée
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivites = async () => {
      try {
        const response = await axios.get('api/activites/get');
        const activitesWithId = response.data.activites.map(activite => ({ ...activite, id: activite._id }));
        setActivites(activitesWithId);
      } catch (error) {
        console.error('Error fetching activites:', error);
      }
    };
  
    fetchActivites();
  }, []);

  const handleEdit = (id) => {
    navigate(`/show/${id}`);
  };

  const getActiviteName = (id) => {
    const activite = activites.find(activite => activite.id === id);
    return activite ? activite.name : '';
  };
  
  const handleDelete = async (id) => {
    try {
      const activiteName = getActiviteName(id);
      const confirmDelete = window.confirm(`Are you sure you want to delete the activite "${activiteName}"?`);
      if (confirmDelete) {
        await axios.delete(`api/activites/${id}`);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting activites:", error);
    }
  };

  const handleOpenDialog = (id) => {
    setOpenDialog(true);
    const activite = activites.find(activite => activite.id === id);
    setActiviteToUpdate(activite);
    setNewActiviteName(activite.name);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangeActiviteName = (event) => {
    setNewActiviteName(event.target.value);
  };

  const handleSubmitUpdate = async () => {
    try {
      const updatedActivite = { ...activiteToUpdate, name: newActiviteName };
      
      const response = await axios.get(`api/activites/check/${newActiviteName}`);
      const { exists } = response.data;
  
      if (exists) {
        alert("This activite already exists.");
        return;
      }
  
      await axios.put(`api/activites/update/${updatedActivite.id}`, updatedActivite);
   
      window.location.reload();
      handleCloseDialog();
    } catch (error) {
      console.error("Error updating activites:", error);
    }
  };

  const handleShow = (id) => {
    const activite = activites.find(activite => activite.id === id);
    setSelectedActivite(activite); // Met à jour les détails de l'activité sélectionnée
    setOpenShowDialog(true); // Ouvre le dialogue pour afficher les détails
  };

  const handleCloseShowDialog = () => {
    setOpenShowDialog(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Activite', width: 200 },
  
    {
      field: 'actions',
      headerName: 'Actions',
      width: 400,
      renderCell: (params) => (
        <div style={{ width:"300px" }}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: '5px',backgroundColor: '#007bff' }}
            onClick={() => handleShow(params.row.id)} // Utilise handleShow pour afficher les détails
          >
            Show
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: '#28a745', color: '#fff', marginRight: '5px' }}
            onClick={() => handleOpenDialog(params.row.id)}
          >
            Update
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: '#dc3545', color: '#fff' }}
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={activites}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />
      <ThemeProvider theme={theme}>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Update activite</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the new name for the activite:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="newActiviteName"
              label="New activite Name"
              type="text"
              fullWidth
              value={newActiviteName}
              onChange={handleChangeActiviteName}
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
        
        {/* Dialogue pour afficher les détails de l'activité sélectionnée */}
        <Dialog open={openShowDialog} onClose={handleCloseShowDialog} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedActivite ? selectedActivite.name : ''}</DialogTitle>
          <DialogContent>
            {selectedActivite && (
              <div>
                <DialogContentText>
                  {/* Insérer ici les détails spécifiques de l'activité sélectionnée */}
                </DialogContentText>
                <p>ID: {selectedActivite.id}</p>
                <p>Name: {selectedActivite.name}</p>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseShowDialog} color="primary">
Close
</Button>
</DialogActions>
</Dialog>
</ThemeProvider>
</div>
);
};

export default DataTable;
