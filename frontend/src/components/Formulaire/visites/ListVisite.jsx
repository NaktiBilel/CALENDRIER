import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme"; 
import Header from "../../Header"; 
import DataTable from "./data";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { useNavigate } from 'react-router-dom';

const ListVisite = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation

  const handleAddVisitesClick = () => {
    navigate('/visite'); // Navigation vers la page du formulaire lors du clic sur le bouton
  };

  return (
    <Box m="20px">
      <Header title="Visite" subtitle="Managing visite" />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {/* Left section */}
        <Typography variant="h5" sx={{ marginTop: 2, marginBottom: 1 }}>
          Visite List
        </Typography>
        
        {/* Right section */}
        <Box display="flex" alignItems="center">
          <AddCircleOutlinedIcon sx={{ color: '#04AA6D', fontSize: '36px', marginRight: '5px' }} />
          <button onClick={handleAddVisitesClick} style={{ 
            marginRight: '20px', 
            padding: '8px 16px', 
            backgroundColor: '#04AA6D', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
          }}>Add Visite</button>
        </Box>
      </Box>
      <DataTable />
    </Box>
  );
};

export default ListVisite;
