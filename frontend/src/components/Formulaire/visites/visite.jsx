import React from "react";
import { Box, useTheme } from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import Header from "../../Header";
import { tokens } from "../../../theme";
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axios from "axios";

const Tache = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const validationSchema = yup.object({
    libelle: yup.string()
      .min(3, "Le champ libellé doit avoir au minimum 3 caractères.")
      .max(20, "Le champ libellé doit avoir au maximum 20 caractères.")
      .required("Le champ libellé est obligatoire"),
    code_client: yup.string()
      .required("Le champ code client est obligatoire."),
    raison_sociale: yup.string()
      .required("Le champ Raison sociale est obligatoire.")
      .max(20, "Le champ Raison sociale doit avoir au maximum 20 caractères."),
    temps_debut: yup.string()
      .required("Le champ temps début est obligatoire."),
    temps_fin: yup.string()
      .required("Le champ temps fin est obligatoire."),
    description: yup.string()
      .required("Le champ description est obligatoire.")
      .min(20, "Le champ description doit avoir au minimum 20 caractères"),
    date_debut: yup.date()
      .min(new Date(), "La date de début doit être supérieure à la date d'aujourd'hui.")
      .required("Le champ date début est obligatoire."),
    date_fin: yup.date()
      .min(yup.ref("date_debut"), "La date de fin doit être supérieure à la date de début.")
      .required("Le champ date fin est obligatoire."),
  });

  const handleSubmit = async (values) => {
    try {
      console.log('Form values:', values); // Vérifiez les valeurs du formulaire avant l'envoi
  
      const response = await axios.post('http://localhost:3002/visites',values);
      
      console.log('Response from server:', response); // Vérifiez la réponse du serveur
  
      // Check if the response indicates success
      if (response.status === 200) {
        // Log success message and navigate to a different page
        console.log('visite added successfully:', response.data);
        navigate('/'); // Assuming this navigates to the homepage
      } else {
        // Handle unexpected response status
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error adding visite:', error);
    }
  };


  const initialValues = {
    libelle: "",
    code_client: "",
    description: "",
    raison_sociale: "",
    date_debut: new Date(),
    temps_debut: "",
    date_fin: "",
    temps_fin: "",
    type_visite: "fort" // Définir une valeur par défaut pour le type de tâche
  };

  const styles = {
    formContainer: {
      paddingRight: "20px",
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '10px',
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '20px',
      '@media (max-width: 600px)': {
        flexDirection: 'column',
      },
    },
    inputGroup: {
      flex: 1,
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
      display: 'flex',
      justifyContent: 'space-between',
      gap: '10px',
      marginTop: "20px",
    },
    button: {
      flex: 1,
      padding: '10px',
      border: 'none',
      borderRadius: '5px',
      color: 'white',
      cursor: 'pointer',
    },
    '@media (max-width: 600px)': {
      formContainer: {
        padding: '10px',
      },
      row: {
        flexDirection: 'column',
      },
      buttonGroup: {
        flexDirection: 'column',
        gap: '10px',
       
      },
      button: {
        marginBottom: "17px",
        width: '100%',
      },
    },
  };

  return (
    <Box m="20px">
      <Header title="Visites" subtitle="Gestion des visites" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <div style={styles.formContainer}>
            <Form>
              <div>
                <label htmlFor="libelle" style={{ marginRight: "45px" }}>Libellé</label>
                <div style={styles.inputGroup}>
                  <Field
                    type="text"
                    id="libelle"
                    placeholder="Enter libellé"
                    name="libelle"
                    style={styles.input}
                  />
                  <ErrorMessage name="libelle" component="div" style={styles.error} />
                </div>
              </div>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label htmlFor="code_client">Code client</label>
                  <Field
                    type="text"
                    id="code_client"
                    placeholder="Code client"
                    name="code_client"
                    style={styles.input}
                  />
                  <ErrorMessage name="code_client" component="div" style={styles.error} />
                </div>
                <div style={styles.inputGroup}>
                  <label htmlFor="raison_sociale">Raison sociale</label>
                  <Field
                    type="text"
                    id="raison_sociale"
                    placeholder="Raison sociale ..."
                    name="raison_sociale"
                    style={styles.input}
                  />
                  <ErrorMessage name="raison_sociale" component="div" style={styles.error} />
                </div>
              </div>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label htmlFor="date_debut">Date début</label>
                  <Field
                    type="date"
                    
                    id="date_debut"
                    placeholder="Date début"
                    name="date_debut"
                    style={styles.input}
                  />
                  <ErrorMessage name="date_debut" component="div" style={styles.error} />
                </div>
                <div style={styles.inputGroup}>
                  <label htmlFor="temps_debut">Temps début</label>
                  <Field
                    type="time"
                    id="temps_debut"
                    placeholder="Temps début"
                    name="temps_debut"
                    style={styles.input}
                  />
                  <ErrorMessage name="temps_debut" component="div" style={styles.error} />
                </div>
                <div style={styles.inputGroup}>
                  <label htmlFor="date_fin">Date fin</label>
                  <Field
                    type="date"
                   
                    id="date_fin"
                    placeholder="Date fin"
                    name="date_fin"
                    style={styles.input}
                  />
                  <ErrorMessage name="date_fin" component="div" style={styles.error} />
                </div>
                <div style={styles.inputGroup}>
                  <label htmlFor="temps_fin">Temps fin</label>
                  <Field
                    type="time"
                    id="temps_fin"
                    placeholder="Temps fin"
                    name="temps_fin"
                    style={styles.input}
                  />
                  <ErrorMessage name="temps_fin" component="div" style={styles.error} />
                </div>
              </div>
              <div style={{  }}>
                <div style={{ paddingBottom: "13px", paddingTop: "9px" }}>
                  <label htmlFor="description" style={{ marginRight: "10px" }}>Description</label>
                  <div style={styles.inputGroup}>
                    <Field
                      as="textarea"
                      id="description"
                      placeholder="Description ..."
                      name="description"
                      style={{ height: "134px", padding: "12px", border: "1px solid #ccc", borderRadius: "4px", resize: "vertical" }}
                    />
                    <ErrorMessage name="description" component="div" style={styles.error} />
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "12px" }}>
                <label htmlFor="type_visite" style={{ paddingRight: "23px", fontSize: "22px" }}>Type de visite</label>
                <Field as="select"
                  id="type_visite"
                  name="type_visite"
                  style={{ fontSize: "22px", color: "black" }}
                  value={values.type_visite}
                  onChange={handleChange}
                >
                  <option value="fort" style={{ fontSize: "22px", color: "red" }}>Fort</option>
                  <option value="moyen" style={{ fontSize: "22px", color: "green" }}>Moyen</option>
                  <option value="faible" style={{ fontSize: "22px", color: "yellow" }}>Faible</option>
                </Field>
              </div>
              <div style={styles.buttonGroup}>
                <button
                  type="submit"
                  style={{ ...styles.button, backgroundColor: "#4db6ac" }} 
                >
                  Submit
                </button>
                <button
                  type="reset"
                  style={{ ...styles.button, backgroundColor: "grey" }}
                >
                  Reset
                </button>
                <button
                  type="button"
                  style={{ ...styles.button, backgroundColor: "darkred" }}
                  onClick={() => {
                    // Redirige vers la page d'accueil et réinitialise le formulaire
                    navigate('/');
                  }}
                >
                  Annuler
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </Box>
  );
};

export default Tache;
