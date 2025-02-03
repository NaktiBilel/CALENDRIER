import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import Header from "../../Header";
import { tokens } from "../../../theme";

const ListBonDeCommande = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State for EBC and LBC data
  const [ebcData, setEbcData] = useState([]);
  const [lbcData, setLbcData] = useState([]);

  // State for forms
  const [ebcForm, setEbcForm] = useState({
    intBc: '',
    codeclt: '',
    RaisonSociale: ''
  });
  const [lbcForm, setLbcForm] = useState({
    codeart: '',
    libelle: '',
    prixHT: '',
    TVA: '',
    prixTVA: ''
  });

  // Fetch EBC data
  useEffect(() => {
    const fetchEbcData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ebcs');
        setEbcData(response.data);
      } catch (error) {
        console.error('Error fetching EBC data:', error);
      }
    };

    fetchEbcData();
  }, []);

  // Fetch LBC data
  useEffect(() => {
    const fetchLbcData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/lbcs');
        setLbcData(response.data);
      } catch (error) {
        console.error('Error fetching LBC data:', error);
      }
    };

    fetchLbcData();
  }, []);

  const handleEbcFormChange = (event) => {
    const { name, value } = event.target;
    setEbcForm({
      ...ebcForm,
      [name]: value
    });
  };

  const handleLbcFormChange = (event) => {
    const { name, value } = event.target;
    setLbcForm({
      ...lbcForm,
      [name]: value
    });
  };

  const handleEbcSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/ebcs', ebcForm);
      setEbcForm({ intBc: '', codeclt: '', RaisonSociale: '' });
      const response = await axios.get('http://localhost:5000/ebcs');
      setEbcData(response.data); // Refresh data
    } catch (error) {
      console.error('Error adding EBC:', error);
    }
  };

  const handleLbcSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/lbcs', lbcForm);
      setLbcForm({ codeart: '', libelle: '', prixHT: '', TVA: '', prixTVA: '' });
      const response = await axios.get('http://localhost:5000/lbcs');
      setLbcData(response.data); // Refresh data
    } catch (error) {
      console.error('Error adding LBC:', error);
    }
  };

  return (
    <Box m="20px" sx={{
      "& .MuiTable-root": {
        border: "none",
      },
      "& .MuiTableCell-root": {
        borderBottom: "none",
      },
      "& .MuiTypography-h4": {
        color: colors.greenAccent[300],
      },
      "& .MuiTableHead-root": {
        backgroundColor: colors.blueAccent[700],
      },
      "& .MuiTableBody-root": {
        backgroundColor: colors.primary[400],
      },
      "& .MuiButton-containedPrimary": {
        backgroundColor: '#04AA6D', // Primary color
      },
      "& .MuiButton-containedSecondary": {
        backgroundColor: '#B0B0B0', // Grey color for secondary button
      }
    }}>
      <Header title="Bon de Commande" subtitle="Managing Bon de Commande Entries" />

      {/* EBC Table */}
      <Box mb="20px">
        <Typography variant="h5" gutterBottom>EBC Entries</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Int BC</TableCell>
                <TableCell>Code Client</TableCell>
                <TableCell>Raison Sociale</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ebcData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{data.intBc}</TableCell>
                  <TableCell>{data.codeclt}</TableCell>
                  <TableCell>{data.RaisonSociale}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* EBC Form */}
      <Box mb="20px">
        <Typography variant="h5" gutterBottom>Add New EBC</Typography>
        <form onSubmit={handleEbcSubmit}>
          <TextField
            label="Int BC"
            name="intBc"
            value={ebcForm.intBc}
            onChange={handleEbcFormChange}
            required
            sx={{ mb: '10px', mr: '10px' }}
          />
          <TextField
            label="Code Client"
            name="codeclt"
            value={ebcForm.codeclt}
            onChange={handleEbcFormChange}
            required
            sx={{ mb: '10px', mr: '10px' }}
          />
          <TextField
            label="Raison Sociale"
            name="RaisonSociale"
            value={ebcForm.RaisonSociale}
            onChange={handleEbcFormChange}
            required
            sx={{ mb: '10px', mr: '10px' }}
          />
          <Button type="submit" variant="contained" color="primary">
            Add EBC
          </Button>
        </form>
      </Box>

      {/* LBC Table */}
      <Box mb="20px">
        <Typography variant="h5" gutterBottom>LBC Entries</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Code Article</TableCell>
                <TableCell>Libelle</TableCell>
                <TableCell>Prix HT</TableCell>
                <TableCell>TVA</TableCell>
                <TableCell>Prix TVA</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lbcData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{data.codeart}</TableCell>
                  <TableCell>{data.libelle}</TableCell>
                  <TableCell>{data.prixHT}</TableCell>
                  <TableCell>{data.TVA}</TableCell>
                  <TableCell>{data.prixTVA}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* LBC Form */}
      <Box mb="20px">
        <Typography variant="h5" gutterBottom>Add New LBC</Typography>
        <form onSubmit={handleLbcSubmit}>
          <TextField
            label="Code Article"
            name="codeart"
            value={lbcForm.codeart}
            onChange={handleLbcFormChange}
            required
            sx={{ mb: '10px', mr: '10px' }}
          />
          <TextField
            label="Libelle"
            name="libelle"
            value={lbcForm.libelle}
            onChange={handleLbcFormChange}
            required
            sx={{ mb: '10px', mr: '10px' }}
          />
          <TextField
            label="Prix HT"
            name="prixHT"
            value={lbcForm.prixHT}
            onChange={handleLbcFormChange}
            required
            sx={{ mb: '10px', mr: '10px' }}
          />
          <TextField
            label="TVA"
            name="TVA"
            value={lbcForm.TVA}
            onChange={handleLbcFormChange}
            required
            sx={{ mb: '10px', mr: '10px' }}
          />
          <TextField
            label="Prix TVA"
            name="prixTVA"
            value={lbcForm.prixTVA}
            onChange={handleLbcFormChange}
            required
            sx={{ mb: '10px', mr: '10px' }}
          />
          <Button type="submit" variant="contained" color="primary">
            Add LBC
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ListBonDeCommande;
