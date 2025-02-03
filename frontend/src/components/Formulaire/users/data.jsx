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
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3002/users/get');
        const usersWithId = response.data.users.map(user => ({ ...user, id: user._id }));
        setUsers(usersWithId);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchUsers();
  }, []);

  const getUserName = (id) => {
    const user = users.find(user => user.id === id);
    return user ? user.name : '';
  };
  
  const handleEdit = (id) => {
    navigate(`/show/${id}`);
  };

  const goToUpdate = (id) => { // Ajoutez l'argument ID ici
    navigate(`/users/update/${id}`); // Naviguez vers la page de mise à jour avec l'ID dans l'URL
  };

  const handleDelete = async (id) => {
    try {
      const userName = getUserName(id);
      const confirmDelete = window.confirm(`Are you sure you want to delete the user "${userName}"?`);
      if (confirmDelete) {
        await axios.delete(`api/users/${id}`);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const handleShowDetails = async (id) => {
    try {
      const response = await axios.get(`api/users/${id}`);
      if (response.status === 200) {
        setSelectedUser(response.data);
        setOpenDialog(true);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


  	
  	
  	
  	
  	
  	
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'name', width: 130 },
    { field: 'username', headerName: 'username', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'code', headerName: 'code', width: 130 },
    { field: 'telephone', headerName: 'telephone', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <div style={{ width: "210px" }}>
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
        rows={users}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle style={{backgroundColor:"white",color:'black'}}>Code Client :{selectedUser ? selectedUser.code : ''}</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Card>
              <CardContent>
               
                <Box mb={2}>
                  <Typography variant="h6">Users</Typography>
                  <Typography variant="body1">{selectedUser.name}</Typography>
                </Box>

                <Box mb={2}>
                  <Typography variant="h6">RIB</Typography>
                  <Typography variant="body1">{selectedUser.username}</Typography>
                </Box>

                <Box mb={2}>
                  <Typography variant="h6">email</Typography>
                  <Typography variant="body1">{selectedUser.email}</Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="h6">telephone</Typography>
                  <Typography variant="body1">{selectedUser.telephone}</Typography>
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
