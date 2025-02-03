import React from "react";
import { Box, useTheme } from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import Header from "../../Header";
import { tokens } from "../../../theme"; 
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';

const AddBanque = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const validationSchema = yup.object({
   
  
    banque: yup.string()
      .required("Le champ banque sociale est obligatoire.")
      .min(3,"Le champ banque doit avoir au minumum 3 caractères."),
  });

  const handleSubmit = async (values) => {
    try {
      console.log('Form values:', values); // Vérifiez les valeurs du formulaire avant l'envoi
  
      // Envoyer une requête GET pour vérifier si le nom de la banque existe déjà
      const response = await axios.get(`http://localhost:3002/banques/check/${values.banque}`);
      
      // Vérifier la réponse du serveur pour voir si la banque existe déjà
      if (response.data.exists) {
        // Afficher une alerte si la banque existe déjà
        alert("This banque already exists.");
        return; // Arrêtez l'exécution de la fonction si la banque existe déjà
      }
  
      // Si la banque n'existe pas déjà, alors envoyer une requête POST pour l'ajouter
      const addResponse = await axios.post('http://localhost:3002/banques', values);
  
      console.log('Response from server:', addResponse); // Vérifiez la réponse du serveur
  
      // Vérifier si la requête POST a réussi
      if (addResponse.status === 200) {
        // Afficher un message de succès et naviguer vers une autre page
        console.log('Banque added successfully:', addResponse.data);
        navigate('/'); // Assumant que cela navigue vers la page d'accueil
      } else {
        // Gérer un statut de réponse inattendu
        console.error('Unexpected response status:', addResponse.status);
      }
    } catch (error) {
      // Gérer les erreurs survenues pendant la requête
      console.error('Error adding banque:', error);
    }
  };
  
  

  const initialValues = { 
    banque: "", 
    nombreAgences: 1, 
    
    
  };

  return (
    <Box m="20px">
      <Header title="Add Banque" subtitle="Banque" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form style={styles.form}>
            <div style={styles.row}>
             
              <div style={styles.inputGroup}>
                <label htmlFor="banque">Name</label>
                <Field
                  type="text"
                  id="banque"
                  name="banque"
                  placeholder="banque"
                  style={styles.input}
                />
                <ErrorMessage name="banque" component="div" style={styles.error} />
              </div>
             </div>
            <div style={styles.row}>
             
              <div style={styles.inputGroup}>
                <label htmlFor="banque">Nombre D'agences</label>
                <Field
                  type="text"
                  id="nombreAgences"
                  name="nombreAgences"
                  placeholder="nombreAgences"
                  style={styles.input}
                />
                <ErrorMessage name="nombreAgences" component="div" style={styles.error} />
              </div>
             </div>
            <div style={styles.buttonGroup}>  
              <button type="submit" style={{ ...styles.button, backgroundColor: "#4db6ac" }}>Submit</button>
              <button type="reset" style={{ ...styles.button, backgroundColor: "grey" }}>Reset</button>
              <button type="button" style={{ ...styles.button, backgroundColor: "darkred" }} onClick={() => navigate('/')}>Annuler</button>
            </div>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

const styles = {
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
  },
  row: {
    display: 'contents', // Allow children to occupy their own grid cells
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  error: {
    color: 'red',
    fontSize: '12px',
  },
  buttonGroup: {
    gridColumn: 'span 2', // Make buttons span across both columns
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  },
  button: {
    flex: '1',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
  },
  '@media (max-width: 600px)': {
    form: {
      gridTemplateColumns: '1fr',
      padding: '10px',
    },
    buttonGroup: {
      flexDirection: 'column',
      gap: '10px',
    },
    button: {
      width: '100%',
    },
  },
};

export default AddBanque;
