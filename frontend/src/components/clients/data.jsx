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
  const [clients, setClients] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('api/clients/get');
        const clientsWithId = response.data.clients.map(client => ({ ...client, id: client._id }));
        setClients(clientsWithId);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const handleEdit = (id) => {
    navigate(`/show/${id}`);
  };

  const goToUpdate = (id) => {
    navigate(`/clients/updateClient/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(`Are you sure you want to delete this client?`);
      if (confirmDelete) {
        await axios.delete(`api/clients/${id}`);
        const updatedClients = clients.filter(client => client.id !== id);
        setClients(updatedClients);
      }
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const handleShowDetails = async (id) => {
    try {
      const response = await axios.get(`api/clients/${id}`);
      if (response.status === 200) {
        setSelectedClient(response.data);
        setOpenDialog(true);
      }
    } catch (error) {
      console.error("Error fetching client details:", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'code', headerName: 'Code client', width: 130 },
    { field: 'banque', headerName: 'Banque', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'region', headerName: 'Region', width: 130 },
    { field: 'telephone', headerName: 'Telephone', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <div style={{ width: "210px" }}>
          <button
            style={{
              backgroundColor: '#007bff',
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
        rows={clients}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle style={{backgroundColor:"white",color:'black'}}>Code Client :{selectedClient ? selectedClient.code : ''}</DialogTitle>
        <DialogContent>
          {selectedClient && (
            <Card>
              <CardContent>
               
                <Box mb={2}>
                  <Typography variant="h6">Banque</Typography>
                  <Typography variant="body1">{selectedClient.banque}</Typography>
                </Box>

                <Box mb={2}>
                  <Typography variant="h6">RIB</Typography>
                  <Typography variant="body1">{selectedClient.rib}</Typography>
                </Box>

                <Box mb={2}>
                  <Typography variant="h6">suspendu_tva_au</Typography>
                  <Typography variant="body1">{selectedClient.suspendu_tva_au}</Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="h6">suspendu_tva_du</Typography>
                  <Typography variant="body1">{selectedClient.suspendu_tva_du}</Typography>
                </Box>

                <Box mb={2}>
                  <Typography variant="h6">suspendu_tva_du</Typography>
                  <Typography variant="body1">{selectedClient.suspendu_tva_du}</Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="h6">Secteur</Typography>
                  <Typography variant="body1">{selectedClient.secteur}</Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="h6">Type</Typography>
                  <Typography variant="body1">{selectedClient.type}</Typography>
                </Box>







                <Box mb={2}>
                  <Typography variant="h6">Email</Typography>
                  <Typography variant="body1">{selectedClient.email}</Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="h6">Region</Typography>
                  <Typography variant="body1">{selectedClient.region}</Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="h6">Telephone</Typography>
                  <Typography variant="body1">{selectedClient.telephone}</Typography>
                </Box>
                {/* Add more client details here if necessary */}
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
