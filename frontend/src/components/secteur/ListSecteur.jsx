import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme"; 
import Header from "../Header";  
import DataTable from "./data";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const ListSecteur = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation

  const handleAddUsersClick = () => {
    navigate('/addSecteur'); // Navigation vers la page du formulaire lors du clic sur le bouton
  };

  return (

  


    <Box m="20px"  sx={{
      "& .MuiDataGrid-root": {
        border: "none",
      },
      "& .MuiDataGrid-cell": {
        borderBottom: "none",
      },
      "& .name-column--cell": {
        color: colors.greenAccent[300],
      },
      "& .MuiDataGrid-columnHeaders": {
        backgroundColor: colors.blueAccent[700],
        borderBottom: "none",
      },
      "& .MuiDataGrid-virtualScroller": {
        backgroundColor: colors.primary[400],
      },
      "& .MuiDataGrid-footerContainer": {
        borderTop: "none",
        backgroundColor: colors.blueAccent[700],
      },
      "& .MuiCheckbox-root": {
        color: `${colors.greenAccent[200]} !important`,
      },
      "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
        color: `${colors.grey[100]} !important`,
      },
    }}>
      <Header title="Secteurs" subtitle="secteurs" />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {/* Left section */}
        <Typography variant="h5" sx={{ marginTop: 2, marginBottom: 1 }}>
        Secteur List
        </Typography>
        
        {/* Right section */}
        <Box display="flex" alignItems="center">
          <AddCircleOutlinedIcon sx={{ color: 'green', fontSize: '36px', marginRight: '5px' }} />
          <button onClick={handleAddUsersClick} style={{ 
            marginRight: '20px', 
            padding: '8px 16px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
          }}>Add secteur</button>
        </Box>
      </Box>
      <DataTable />
    </Box>
  );
};

export default ListSecteur;
