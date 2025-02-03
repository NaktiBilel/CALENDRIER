import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateTache = () => {
  const { id } = useParams();
  const [tacheData, setTacheData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTacheData = async () => {
      try {
        const response = await axios.get(`api/taches/${id}`);
        setTacheData(response.data);
      } catch (error) {
        console.error('Error fetching taches data:', error);
      }
    };

    fetchTacheData();
  }, [id]);

  const validationSchema = yup.object({
    libelle: yup.string()
      .min(3, "Le champ libellé doit avoir au minimum 3 caractères.")
      .max(20, "Le champ libellé doit avoir au maximum 20 caractères.")
      .required("Le champ libellé est obligatoire"),
    // Ajoutez d'autres validations pour les autres champs
  });

  const handleSubmit = async (values) => {
    try {
      await axios.put(`api/taches/updateTache/${id}`, values);
      console.log('tache updated successfully');
      navigate('/ListTache');
    } catch (error) {
      console.error('Error updating tache:', error);
    }
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
        marginBbottom: "17px",
        width: '100%',
      },
    },
  };


  return (
    <div>
      <h1>Update Tache</h1>
      {tacheData && (
        <Formik
          initialValues={{
            libelle: tacheData.libelle || '',
            code_client: tacheData.code_client || '',
            description: tacheData.description || '',
            raison_sociale: tacheData.raison_sociale || '',
            date_debut: tacheData.date_debut || '',
            temps_debut: tacheData.temps_debut || '',
            temps_fin: tacheData.temps_fin || '',

            type_tache: tacheData.type_tache || '',
            date_fin: tacheData.date_fin || '',
            // Initialisez les valeurs des autres champs ici
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
             <div style={styles.formContainer}>
            <Form>
                <div>
                <label htmlFor="libelle" style={{ marginRight: "45px" }}>Libellé</label>
                <div style={styles.inputGroup}>
                  <Field
                    type="text"
                    id="libelle"
                    
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
                    dateFormat="yyyy-MM-dd"
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
                      style={{  height: "134px", padding: "12px", border: "1px solid #ccc", borderRadius: "4px", resize: "vertical" }}
                    />
                    <ErrorMessage name="description" component="div" style={styles.error} />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "12px" }}>
                <label htmlFor="type_tache" style={{ paddingRight: "23px", fontSize: "22px" }}>Type du tache</label>
                <Field as="select"
                  id="type_tache"
                  name="type_tache"
                  style={{ fontSize: "22px", color: "black" }}
                 
                 
                >
                  <option value="fort" style={{ fontSize: "22px", color: "rgb(0, 123, 255)" }}>Fort</option>
                  <option value="moyen" style={{ fontSize: "22px", color: "rgb(40, 167, 69)" }}>Moyen</option>
                  <option value="faible" style={{ fontSize: "22px", color:  "rgb(220, 53, 69)" }}>Faible</option>
                </Field>
              </div>
              {/* Ajoutez d'autres champs ici de la même manière */}
              <div style={styles.buttonGroup}>
                <button type="submit" style={{ ...styles.button, backgroundColor:"#4db6ac" }}>Submit</button>
                <button type="reset" style={{ ...styles.button, backgroundColor: "grey" }}>Reset</button>
                <button type="button" style={{ ...styles.button, backgroundColor: "darkred" }} onClick={() => navigate('/')}>Cancel</button>
              </div>
              
            </Form>
            </div>
          )}
        </Formik>
      )}
    </div>
  );
};

export default UpdateTache;
