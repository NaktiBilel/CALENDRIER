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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const DataTable = () => {
  const [visites, setVisites] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newVisiteName, setNewVisiteName] = useState('');
  const [visiteToUpdate, setVisiteToUpdate] = useState(null);
  const [openShowDialog, setOpenShowDialog] = useState(false);
  const [selectedVisite, setSelectedVisite] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVisites = async () => {
      try {
        const response = await axios.get('http://localhost:3002/visites/get');
        const visitesWithId = response.data.visites.map(visite => ({ ...visite, id: visite._id }));
        setVisites(visitesWithId);
      } catch (error) {
        console.error('Error fetching visites:', error);
      }
    };
  
    fetchVisites();
  }, []);

  const handleEdit = (id) => {
    navigate(`/show/${id}`);
  };

  const getVisiteName = (id) => {
    const visite = visites.find(visite => visite.id === id);
    return visite ? visite.libelle : '';
  };
  
  const handleDelete = async (id) => {
    try {
      const visiteName = getVisiteName(id);
      const confirmDelete = window.confirm(`Are you sure you want to delete the visite "${visiteName}"?`);
      if (confirmDelete) {
        await axios.delete(`api/visites/${id}`);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting visite:", error);
    }
  };

  const handleOpenDialog = (id) => {
    setOpenDialog(true);
    const visite = visites.find(visite => visite.id === id);
    setVisiteToUpdate(visite);
    setNewVisiteName(visite.libelle);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangeVisiteName = (event) => {
    setNewVisiteName(event.target.value);
  };

  const handleSubmitUpdate = async () => {
    try {
      const updatedVisite = { ...visiteToUpdate, libelle: newVisiteName };
      
      const response = await axios.get(`api/visites/check/${newVisiteName}`);
      const { exists } = response.data;
  
      if (exists) {
        alert("This visite already exists.");
        return;
      }
  
      await axios.put(`api/visites/update/${updatedVisite.id}`, updatedVisite);
   
      window.location.reload();
      handleCloseDialog();
    } catch (error) {
      console.error("Error updating visite:", error);
    }
  };

  const handleShow = (id) => {
    const visite = visites.find(visite => visite.id === id);
    setSelectedVisite(visite);
    setOpenShowDialog(true);
  };

  const handleCloseShowDialog = () => {
    setOpenShowDialog(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'libelle', headerName: 'Libelle', width: 130 },
    { field: 'code_client', headerName: 'Code client', width: 130 },
   
    { field: 'temps_debut', headerName: 'Temps debut', width: 130 },
    { field: 'temps_fin', headerName: 'Temps fin', width: 130 },
    { field: 'type_visite', headerName: 'Type visite', width: 130 },
    { field: 'date_fin', headerName: 'Date fin', width: 130 },
   
  
    {
      field: 'actions',
      headerName: 'Actions',
      width: 223,
      renderCell: (params) => (
        <div style={{  }}>
          <Button
            style={{
              backgroundColor: '#04AA6D',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 12px',
              marginRight: '5px',
            }}
            onClick={() => handleShow(params.row.id)}
          >
            +
          </Button>
          <Button
            style={{
              backgroundColor: 'grey',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 12px',
              marginRight: '5px',
            }}
            onClick={() => handleOpenDialog(params.row.id)}
          >
            Update
          </Button>
          <Button
            style={{
              backgroundColor: 'darkred',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 12px',
              marginRight: '5px',
            }}
            onClick={() => handleDelete(params.row.id)}
          >
            -
          </Button>
        
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={visites}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Update visite</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the new name for the visite:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="newVisiteName"
              label="New visite Name"
              type="text"
              fullWidth
              value={newVisiteName}
              onChange={handleChangeVisiteName}
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
        
        <Dialog open={openShowDialog} onClose={handleCloseShowDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedVisite ? selectedVisite.libelle : ''}</DialogTitle>
          <DialogContent>
            {selectedVisite && (
              <Card>
              <CardContent>
                <Box mb={2}>
                  {/* Insérer ici les détails spécifiques de la visite sélectionnée */}
                <Typography variant="body1">ID: {selectedVisite.id}</Typography>
                <Typography variant="body1">Libelle: {selectedVisite.libelle}</Typography>
                <Typography variant="body1">Code client: {selectedVisite.code_client}</Typography>
                <Typography variant="body1">Temps debut: {selectedVisite.temps_debut}</Typography>
                <Typography variant="body1">Temps fin: {selectedVisite.temps_fin}</Typography>
                <Typography variant="body1">Type visite: {selectedVisite.type_visite}</Typography>
                <Typography variant="body1">Date fin: {selectedVisite.date_fin}</Typography>
                </Box>
                </CardContent>
            </Card>
            )}
          </DialogContent>
          <DialogActions>
          <Button onClick={handleCloseShowDialog} variant="contained" color="primary">
            Fermer
          </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
};

export default DataTable;
