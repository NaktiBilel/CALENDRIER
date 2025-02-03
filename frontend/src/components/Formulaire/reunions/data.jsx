import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const DataTable = () => {
  const [reunions, setReunions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReunion, setSelectedReunion] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReunions = async () => {
      try {
        const response = await axios.get('http://localhost:3002/reunions/get');
        const reunionsWithId = response.data.reunions.map(Reunion => ({ ...Reunion, id: Reunion._id }));
        setReunions(reunionsWithId);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchReunions();
  }, []);

  const handleEdit = (id) => {
    navigate(`/show/${id}`);
  };

  const goToUpdate = (id) => {
    navigate(`/reunions/updateReunion/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3002/reunions/${id}`);
      if (response.status === 200) {
        const updatedReunions = reunions.filter(reunion => reunion.id !== id);
        setReunions(updatedReunions);
      }
    } catch (error) {
      console.error("Error deleting reunion:", error);
    }
  };

  const handleShowDetails = (id) => {
    
    const reunion = reunions.find(reunion => reunion.id === id);
    setSelectedReunion(reunion);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'libelle', headerName: 'libelle', width: 130 },
    { field: 'code_client', headerName: 'code_client', width: 130 },
    { field: 'description', headerName: 'description', width: 130 },
    { field: 'date_debut', headerName: 'date_debut', width: 130 },
    { field: 'temps_debut', headerName: 'temps_debut', width: 130 },
    { field: 'type_reunion', headerName: 'type_reunion', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <div>
          <button
            style={{
              backgroundColor: '#04AA6D',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 12px',
              marginRight: '5px',
            }}
            onClick={() => handleShowDetails(params.row.id)}
          >
            +
          </button>
          <button
            style={{
              backgroundColor: 'grey',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 12px',
              marginRight: '5px',
            }}
            onClick={() => goToUpdate(params.row.id)}
          >
            Update
          </button>
          <button
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
          </button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={reunions}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedReunion ? selectedReunion.libelle : ''}</DialogTitle>
        <DialogContent>
          {selectedReunion && (
            <Card>
              <CardContent>
                <Box mb={2}>
                  <Typography variant="body1">Code client:  {selectedReunion.code_client}</Typography>
                  <Typography variant="body1">date_debut :  {selectedReunion.date_debut}</Typography>
                  <Typography variant="body1">description :  {selectedReunion.description}</Typography>
                  <Typography variant="body1">Libelle :  {selectedReunion.libelle}</Typography>
                  <Typography variant="body1">Raison sociale :  {selectedReunion.raison_sociale}</Typography>
                  <Typography variant="body1">Temps debut :  {selectedReunion.temps_debut}</Typography>
                  <Typography variant="body1">Temps fin :  {selectedReunion.temps_fin}</Typography>
                  <Typography variant="body1">Type reunion :  {selectedReunion.type_reunion}</Typography>
                </Box>
                
                
              </CardContent>
            </Card>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained" color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DataTable;
