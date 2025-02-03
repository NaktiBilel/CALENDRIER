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
  const [banques, setBanques] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newBanqueName, setNewBanqueName] = useState('');
  const [newBanqueAgency, setNewBanqueAgency] = useState('');
  const [banqueToUpdate, setBanqueToUpdate] = useState(null);
  const [openShowDialog, setOpenShowDialog] = useState(false);
  const [selectedBanque, setSelectedBanque] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanques = async () => {
      try {
        const response = await axios.get('http://localhost:3002/banques/get');
        const usersWithId = response.data.banques.map(user => ({ ...user, id: user._id }));
        setBanques(usersWithId);
      } catch (error) {
        console.error('Error fetching banques:', error);
      }
    };
  
    fetchBanques();
  }, []);
  const handleShow = (id) => {
    const banque = banques.find(banque => banque.id === id);
    setSelectedBanque(banque);
    setOpenShowDialog(true);
  };

  const handleCloseShowDialog = () => {
    setOpenShowDialog(false);
  };
  const handleEdit = (id) => {
    navigate(`/show/${id}`);
  };

  const getBanqueName = (id) => {
    const banque = banques.find(banque => banque.id === id);
    return banque ? banque.banque : '';
  };
  
  const handleDelete = async (id) => {
    try {
      const banqueName = getBanqueName(id);
      const confirmDelete = window.confirm(`Are you sure you want to delete the bank "${banqueName}"?`);
      if (confirmDelete) {
        await axios.delete(`api/banques/${id}`);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting banque:", error);
    }
  };

  const handleOpenDialog = (id) => {
    setOpenDialog(true);
    const banque = banques.find(banque => banque.id === id);
    setBanqueToUpdate(banque);
    setNewBanqueName(banque.banque); // Set initial value to current bank name
    setNewBanqueAgency(banque.nombreAgences); // Set initial value to current bank name
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangeBanqueName = (event) => {
    setNewBanqueName(event.target.value);
  };
  const handleChangeBanqueAgency = (event) => {
    setNewBanqueAgency(event.target.value);
  };

  const handleSubmitUpdate = async () => {
    try {
      const updatedBanque = { ...banqueToUpdate, banque: newBanqueName , nombreAgences:newBanqueAgency };
      
      // Vérifier si le nom de la banque existe déjà dans la liste des banques
      const isBanqueExist = banques.some(banque => banque.banque === newBanqueName);
  
  
      // Mettre à jour la banque si elle n'existe pas déjà
      await axios.put(`api/banques/update/${updatedBanque.id}`, updatedBanque);
      navigate("/ListBanque");
      window.location.reload();
      handleCloseDialog();
    } catch (error) {
      console.error("Error updating banque:", error);
    }
  };
  

  const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'banque', headerName: 'Banque', width: 200 },
    { field: "nombre d'agences", headerName: 'nombreAgences', width: 200 },
   
  
    {
      field: 'actions',
      headerName: 'Actions',
      width: 400,
      renderCell: (params) => (
        <div style={{ width:"300px" }}>
          <button
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
            onClick={() => handleOpenDialog(params.row.id)}
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
        rows={banques}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />
      <ThemeProvider theme={theme}>



      <Dialog open={openShowDialog} onClose={handleCloseShowDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedBanque ? selectedBanque.banque : ''}</DialogTitle>
          <DialogContent>
            {selectedBanque && (
              <div>
                <DialogContentText>
                  {/* Insérer ici les détails spécifiques de la visite sélectionnée */}
                </DialogContentText>
                <p>ID: {selectedBanque.id}</p>
                <p>Banque: {selectedBanque.banque}</p>
                <p>nombre d'agences: {selectedBanque.nombreAgences}</p>
               
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseShowDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>








        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Update Bank</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the new name for the bank:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="newBanqueName"
              label="New Bank Name"
              type="text"
              fullWidth
              value={newBanqueName}
              onChange={handleChangeBanqueName}
            />
            <TextField
              autoFocus
              margin="dense"
              id="newAcency"
              label="New Bank Agency"
              type="text"
              fullWidth
              value={newBanqueAgency}
              onChange={handleChangeBanqueAgency}
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
