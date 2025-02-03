import React from "react";
import { Box, useTheme } from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import Header from "../Header";
import { tokens } from "../../theme"; 
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';

const AddActiviteClient = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const validationSchema = yup.object({
    name: yup.string()
      .required("Le champ Activite Client est obligatoire.")
      .min(3, "Le champ regions doit avoir au minumum 3 caractères."),
  });

  const handleSubmit = async (values) => {
    try {
      console.log('Form values:', values);

      // Check if the activity name already exists using the API route
      const response = await axios.get(`/api/activites/check/${values.name}`);
      
      if (response.data.exists) {
        alert("This activites already exists.");
        return;
      }
  
      // Add the activity using the API route
      const addResponse = await axios.post('/api/activites', values);
  
      console.log('Response from server:', addResponse);
  
      if (addResponse.status === 200) {
        console.log('Activites added successfully:', addResponse.data);
        navigate('/');
      } else {
        console.error('Unexpected response status:', addResponse.status);
      }
    } catch (error) {
      console.error('Error adding activites:', error);
    }
  };

  const initialValues = { 
    name: "", 
  };

  return (
    <Box m="20px">
      <Header title="Add Activites" subtitle="Activites" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form style={styles.form}>
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label htmlFor="name">Name</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="name"
                  style={styles.input}
                />
                <ErrorMessage name="name" component="div" style={styles.error} />
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
    display: 'contents',
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
    gridColumn: 'span 2',
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

export default AddActiviteClient;
