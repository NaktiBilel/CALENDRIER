import React from "react";
import { Box, useTheme } from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import Header from "../../Header";
import { useState, useEffect } from "react";
import { tokens } from "../../../theme";
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axios from "axios";

const ADDLIV = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const validationSchema = yup.object({
   
  });

  const [rues, setRues] = useState([]);
  const [expediteur, setexpediteur] = useState([]);
  const [gouvernement, setGouvernements] = useState([]);

  useEffect(() => {
    const fetchRues = async () => {
      try {
        const response = await axios.get("http://localhost:3002/rues/get");
        const usersWithId = response.data.rues.map((rue) => ({
          ...rue,
          id: rue._id,
        }));
        setRues(usersWithId);
      } catch (error) {
        console.error("Error fetching Rue:", error);
      }
    };

    fetchRues();
  }, []);

  useEffect(() => {
    const fetchexpiditeur = async () => {
      try {
        const response = await axios.get("http://localhost:3002/users/get");
        console.log(response.data);
        const usersWithId = response.data.users.map((name) => ({
          ...name,
          id: name._id,
        }));
        setexpediteur(usersWithId);
      } catch (error) {
        console.error("Error fetching Expiditeur:", error);
      }
    };

    fetchexpiditeur();
  }, []);

  useEffect(() => {
    const fetchGouvernements = async () => {
      try {
        const response = await axios.get("http://localhost:3002/gouvernements/get");
        const usersWithId = response.data.gouvernements.map((name) => ({
          ...name,
          id: name._id,
        }));
        setGouvernements(usersWithId);
      } catch (error) {
        console.error("Error fetching Gouvernourat:", error);
      }
    };

    fetchGouvernements();
  }, []);

  const handleSubmit = async (values) => {
    try {
      console.log('Form values:', values); // Vérifiez les valeurs du formulaire avant l'envoi
  
      const response = await axios.post('http://localhost:3002/livraisons',values);
      
      console.log('Response from server:', response); // Vérifiez la réponse du serveur
  
      // Check if the response indicates success
      if (response.status === 200) {
        // Log success message and navigate to a different page
        console.log('Livraison added successfully:', response.data);
        navigate('/'); // Assuming this navigates to the homepage
      } else {
        // Handle unexpected response status
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error adding Livraison:', error);
    }
  };


  const initialValues = {
    
    
    expediteur:"",
    adresse_liv:"",
    numtel1:"",
    numtel2:"",
    gouvernement:"",
    rue:"",
    km:"",
    prixliv:"0",
    qte:"1",
    montant:"0",
    
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
                <label htmlFor="Expidieur" style={{ marginRight: "45px" }}>Libellé</label>
                <div style={styles.inputGroup}>
                <Field
                    as="select"
                    id="expediteur"
                    name="expediteur"
                    style={{ ...styles.input, marginRight: "10px" }}
                  >
                    <option value="">Choisir un Expediteur</option>
                    {expediteur.map((expiditeur) => (
                      <option key={expiditeur.id} value={expiditeur.id}>
                        {expiditeur.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="libelle" component="div" style={styles.error} />
                </div>
              </div>
              <br/>
              <div >
                <div style={styles.inputGroup}>
                  <label htmlFor="nom_client">Nom client</label>
                  <Field
                    type="text"
                    id="nom_Client"
                    placeholder="Nom client"
                    name="nom_client"
                    style={styles.input}
                  />
                  <ErrorMessage name="nom_client" component="div" style={styles.error} />
                </div>
                <br/>
                <div style={styles.inputGroup}>
                  <label htmlFor="adresse_liv">Adresse Livraison</label>
                  <Field
                    type="text"
                    id="adresse_liv"
                    placeholder="Adresse Livraison ..."
                    name="adresse_liv"
                    style={styles.input}
                  />
                  <ErrorMessage name="adresse_liv" component="div" style={styles.error} />
                </div>
                <br/>
                <div>
                <label htmlFor="gouvernement" style={{ marginRight: "45px" }}>Gouvernorat</label>
                <Field
                    as="select"
                    id="gouvernement"
                    name="gouvernement"
                    style={{ ...styles.input, marginRight: "10px" }}
                  >
                    <option value="">Choisir une Gouvernorat</option>
                    {gouvernement.map((gouvernement) => (
                      <option key={gouvernement.id} value={gouvernement.id}>
                        {gouvernement.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="gouvernement" component="div" style={styles.error} />
              </div>
              <br/>
              <div>
                <label htmlFor="rue" style={{ marginRight: "45px" }}>Routes</label>
                <Field
                    as="select"
                    id="rue"
                    name="rue"
                    style={{ ...styles.input, marginRight: "10px" }}
                  >
                    <option value="">Choisir une Rue</option>
                    {rues.map((rue) => (
                      <option key={rue.id} value={rue.id}>
                        {rue.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="rue" component="div" style={styles.error} />
              </div>
              <br/>
              <div>
                <label htmlFor="rue" style={{ marginRight: "45px" }}>KM</label>
                <Field
                    as="select"
                    id="rue"
                    name="rue"
                    style={{ ...styles.input, marginRight: "10px" }}
                  >
                    <option value="">Choisir KM</option>
                    <option key="0" value="0">1</option>
                    <option key="1" value="1">2</option>
                    <option key="2" value="2">3</option>
                    <option key="3" value="3">4</option>
                    <option key="4" value="4">5</option>
                    <option key="5" value="5">6</option>
                    <option key="6" value="6">7</option>
                    <option key="7" value="7">8</option>
                    <option key="8" value="8">9</option>
                    <option key="9" value="9">10</option>
                    <option key="10" value="10">11</option>
                    <option key="11" value="11">12</option>
                    <option key="12" value="12">13</option>
                    <option key="13" value="13">14</option>
                    <option key="14" value="14">15</option>
                    <option key="15" value="15">16</option>
                    
                  </Field>
                  <ErrorMessage name="km" component="div" style={styles.error} />
              </div>
              <br/>
              <div style={styles.inputGroup}>
                  <label htmlFor="numtel1">N° Telephone 1</label>
                  <Field
                    type="text"
                    id="numtel1"
                    placeholder="Num Telephone"
                    name="numtel1"
                    style={styles.input}
                  />
                  <ErrorMessage name="numtel1" component="div" style={styles.error} />
                </div>
                <br/>
                <div style={styles.inputGroup}>
                  <label htmlFor="numtel2">N° Telephone 2</label>
                  <Field
                    type="text"
                    id="numtel2"
                    placeholder="Num Telephone 2"
                    name="numtel2"
                    style={styles.input}
                  />
                  <ErrorMessage name="numtel2" component="div" style={styles.error} />
                </div>
                <div style={styles.inputGroup}>
                  <label htmlFor="numtel2">Prix Livraison</label>
                  <Field
                    type="number"
                    id="prixliv"
                    placeholder="Prix Livraions"
                    name="prixliv"
                    style={styles.input}
                  />
                  <ErrorMessage name="prixliv" component="div" style={styles.error} />
                </div>
                <div style={styles.inputGroup}>
                  <label htmlFor="numtel2">Quantite</label>
                  <Field
                    type="number"
                    id="qte"
                    placeholder="Quantite"
                    name="qte"
                    style={styles.input}
                  />
                  <ErrorMessage name="qte" component="div" style={styles.error} />
                </div>
                <div style={styles.inputGroup}>
                  <label htmlFor="numtel2">Montant Expiditeur</label>
                  <Field
                    type="number"
                    id="montant"
                    placeholder="Montant Expiditeur"
                    name="montant"
                    style={styles.input}
                  />
                  <ErrorMessage name="montant" component="div" style={styles.error} />
                </div>


              </div>
              <div style={styles.row}>
                
                
                
                
              </div>
              
              <div style={styles.buttonGroup}>
                <button
                  type="submit"
                  style={{ ...styles.button, backgroundColor: "#4db6ac" }} 
                >
                  Submit
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

export default ADDLIV;
