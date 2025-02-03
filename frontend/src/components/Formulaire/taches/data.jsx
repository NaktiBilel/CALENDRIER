import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';



const DataTable = () => {
  const [taches, setTaches] = useState([]);
  const [openShowDialog, setOpenShowDialog] = useState(false);
  const [selectedTache, setSelectedTache] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTaches = async () => {
      try {
        const response = await axios.get('http://localhost:3002/taches/get');
        const tachesWithId = response.data.taches.map(tache => ({ ...tache, id: tache._id }));
        setTaches(tachesWithId);
      } catch (error) {
        console.error('Error fetching taches:', error);
      }
    };
  
    fetchTaches();
  }, []);

  const handleEdit = (id) => {
    navigate(`/show/${id}`);
  };

  const goToUpdate = (id) => {
    navigate(`/taches/updateTache/${id}`);
  };

  const getTacheName = (id) => {
    const tache = taches.find(tache => tache.id === id);
    return tache ? tache.libelle : '';
  };

  const handleDelete = async (id) => {
    try {
      const tacheName = getTacheName(id);
      const confirmDelete = window.confirm(`Are you sure you want to delete the user code "${tacheName}"?`);
      if (confirmDelete) {
        await axios.delete(`api/taches/${id}`);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleShow = (id) => {
    const tache = taches.find(tache => tache.id === id);
    setSelectedTache(tache);
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
    { field: 'type_tache', headerName: 'Type tache', width: 130 },
    { field: 'date_fin', headerName: 'Date fin', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 223,
      renderCell: (params) => (
        <div>
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
            variant="contained"
            style={{ backgroundColor: 'grey', color: '#fff', marginRight: '5px' }}
            onClick={() => goToUpdate(params.row.id)}
          >
            Update
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: 'darkred', color: '#fff' }}
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
        rows={taches}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />
        <Dialog open={openShowDialog} onClose={handleCloseShowDialog} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedTache ? selectedTache.libelle : ''}</DialogTitle>
          <DialogContent>
            {selectedTache && (
              <Card>
              <CardContent>
              <Box mb={2}>
                <Typography variant="body1">ID: {selectedTache.id}</Typography>
                <Typography variant="body1">Libelle: {selectedTache.libelle}</Typography>
                <Typography variant="body1">Code client: {selectedTache.code_client}</Typography>
                <Typography variant="body1">Temps debut: {selectedTache.temps_debut}</Typography>
                <Typography variant="body1">Temps fin: {selectedTache.temps_fin}</Typography>
                <Typography variant="body1">Type tache: {selectedTache.type_tache}</Typography>
                <Typography variant="body1">Date fin: {selectedTache.date_fin}</Typography>
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
