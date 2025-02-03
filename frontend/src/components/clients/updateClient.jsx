import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {nanoid} from 'nanoid'

const UpdateClient = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [banques, setBanques] = useState([]);
  const [secteurs, setSecteurs] = useState([]);
  const [regions, setRegions] = useState([]);
  const [gouvernements, setGouvernements] = useState([]);
  useEffect(() => {
    const fetchBanques = async () => {
      try {
        const response = await axios.get('http://localhost:3002/banques/get');
        const banquesWithId = response.data.banques.map(banque => ({ ...banque, id: banque._id }));
        setBanques(banquesWithId);
      } catch (error) {
        console.error('Error fetching banques:', error);
      }
    };
  
    fetchBanques();
  }, []);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get('http://localhost:3002/regions/get');
        const usersWithId = response.data.regions.map(region => ({ ...region, id: region._id }));
        setRegions(usersWithId);
      } catch (error) {
        console.error('Error fetching region:', error);
      }
    };
  
    fetchRegions();
  }, []);
  useEffect(() => {
    const fetchSecteurs = async () => {
      try {
        const response = await axios.get('http://localhost:3002/secteurs/get');
        const secteursWithId = response.data.secteurs.map(secteur => ({ ...secteur, id: secteur._id }));
        setSecteurs(secteursWithId);
      } catch (error) {
        console.error('Error fetching secteurs:', error);
      }
    };
  
    fetchSecteurs();
  }, []);
  useEffect(() => {
    const fetchGouvernements = async () => {
      try {
        const response = await axios.get('http://localhost:3002/gouvernements/get');
        const gouvernementsWithId = response.data.gouvernements.map(gouvernement => ({ ...gouvernement, id: gouvernement._id }));
        setGouvernements(gouvernementsWithId);
      } catch (error) {
        console.error('Error fetching secteurs:', error);
      }
    };
  
    fetchGouvernements();
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/clients/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  const validationSchema = yup.object().shape({
    code: yup.string().required('Code is required'),
    raison_social: yup.string().required('Raison Sociale is required'),
    telephone: yup.string().required('Telephone is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    adresse: yup.string().required('Adresse is required'),
    type: yup.string().required('Type is required'),
    rc: yup.string().required('RC is required'),
    banque: yup.string().required('Banque is required'),
    rib: yup.string().required('RIB is required'),
    timbre_fiscaux: yup.string().required('Timbre Fiscaux is required'),
    suspendu_tva_du: yup.string().required('Suspendu TVA du is required'),
    suspendu_tva_au: yup.string().required('Suspendu TVA au is required'),
    numero_decision: yup.string().required('Décision is required'),
    region: yup.string().required('Région is required'),
    gouvernement: yup.string().required('Gouvernement is required'),
    secteur: yup.string().required('Secteur is required'),
    activite: yup.string().required('Activité is required'),
    adresse_fiscale: yup.string().required('Adresse fiscale is required'),
  });

  const handleSubmit = async (values) => {
    try {
      await axios.put(`api/clients/updateClient/${id}`, values);
      console.log('User updated successfully');
      navigate('/ListClient');
    } catch (error) {
      console.error('Error updating user:', error);
    }
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

  return (
    <div>
      <h1>Update client</h1>
      {userData && (
        <Formik
          initialValues={{
            code: userData.code || nanoid(),
            raison_social: userData.raison_social || '',
            telephone: userData.telephone || '',
            email: userData.email || '',
            adresse: userData.adresse || '',
            type: userData.type || '',
            rc: userData.rc || '',
            banque: userData.banque || '',
            rib: userData.rib || '',
            timbre_fiscaux: userData.timbre_fiscaux || '',
            suspendu_tva_du: userData.suspendu_tva_du || '',
            suspendu_tva_au: userData.suspendu_tva_au || '',
            numero_decision: userData.numero_decision || '',
            region: userData.region || '',
            gouvernement: userData.gouvernement || '',
            secteur: userData.secteur || '',
            activite: userData.activite || '',
            adresse_fiscale: userData.adresse_fiscale || '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form style={styles.form}>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label htmlFor="code">Code</label>
                  <Field type="text" id="code" name="code" style={styles.input} />
                  <ErrorMessage name="code" component="div" style={styles.error} />
                </div>
                <div style={styles.inputGroup}>
                  <label htmlFor="raison_social">Raison social</label>
                  <Field type="text" id="raison_social" name="raison_social" style={styles.input} />
                  <ErrorMessage name="raison_social" component="div" style={styles.error} />
                </div>
                <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label htmlFor="telephone">Telephone</label>
                <Field
                  type="text"
                  id="telephone"
                  name="telephone"
                  placeholder="Telephone"
                  style={styles.input}
                />
                <ErrorMessage name="telephone" component="div" style={styles.error} />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  style={styles.input}
                />
                <ErrorMessage name="email" component="div" style={styles.error} />
              </div>
            </div>





            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label htmlFor="banque">Banque</label>
                <div style={{ display: "flex", alignItems: "center" }}>
                <Field as="select" id="banque" name="banque" style={{ ...styles.input, marginRight: "10px" }}>
                  <option value="">Choisir une banque</option>
                  {banques.map(banque => (
                    <option key={banque.id} value={banque.banque}>{banque.banque}</option>
                  ))}
                    
                
                </Field>
              </div>
                <ErrorMessage name="banque" component="div" style={styles.error} />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="rc">RC</label>
                <Field
                  type="rc"
                  id="rc"
                  name="rc"
                  placeholder="rc"
                  style={styles.input}
                />
                <ErrorMessage name="rc" component="div" style={styles.error} />
              </div>
            </div>












            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label htmlFor="adresse">Adresse </label>
                <Field
                  type="text"
                  id="adresse"
                  name="adresse"
                  placeholder="adresse "
                  style={styles.input}
                />
                <ErrorMessage name="adresse " component="div" style={styles.error} />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="type">Type</label>
                <Field
                  type="text"
                  id="type"
                  name="type"
                  placeholder="Type"
                  style={styles.input}
                />
                <ErrorMessage name="type" component="div" style={styles.error} />
              </div>
            </div>
            <div style={styles.row}>
              
            </div>
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label htmlFor="rib">RIB</label>
                <Field
                  type="text"
                  id="rib"
                  name="rib"
                  placeholder="RIB"
                  style={styles.input}
                />
                <ErrorMessage name="rib" component="div" style={styles.error} />
              </div>
              <div style={styles.inputGroup}>
  <label htmlFor="timbre_fiscaux">Timbre Fiscaux</label>
  <div>
    <label style={{ display: "block" }}>
      <Field
        type="radio"
        name="timbre_fiscaux"
        value="regime_reel"
        style={styles.radio}
      />
      Regime reel
    </label>
    <label style={{ display: "block" }}>
      <Field
        type="radio"
        name="timbre_fiscaux"
        value="regime_forfaitaire"
        style={styles.radio}
      />
      Regime forfaitaire
    </label>
    <label style={{ display: "block" }}>
      <Field
        type="radio"
        name="timbre_fiscaux"
        value="export"
        style={styles.radio}
      />
      Export
    </label>
  </div>
  <ErrorMessage name="timbre_fiscaux" component="div" style={styles.error} />
</div>    
 </div>
 <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label htmlFor="suspendu_tva_du">Suspendu TVA du</label>
                <Field
                  type="date"
                  id="suspendu_tva_du"
                  name="suspendu_tva_du"
                  dateFormat="yyyy-MM-dd"
                  style={styles.input}
                />
                <ErrorMessage name="suspendu_tva_du" component="div" style={styles.error} />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="suspendu_tva_au">Suspendu TVA au</label>
                <Field
                  type="date"
                  id="suspendu_tva_au"
                  name="suspendu_tva_au"
                   dateFormat="yyyy-MM-dd"
                   placeholder="suspendu_tva_au"
                  style={styles.input}
                />
                <ErrorMessage name="suspendu_tva_au" component="div" style={styles.error} />
              </div>
            </div>
            



            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label htmlFor="numero_decision"> Décision</label>
                <Field
                  type="text"
                  id="numero_decision"
                  name="numero_decision"
                  placeholder="numero_decision "
                  style={styles.input}
                />
                <ErrorMessage name="numero_decision" component="div" style={styles.error} />
              </div>
                          <div style={styles.row}>
                          <div style={styles.inputGroup}>
              <label htmlFor="region">Région</label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Field as="select" id="region" name="region" style={{ ...styles.input, marginRight: "10px" }}>
                  <option value="">Choisir une région</option>
                  {regions.map(region => (
                    <option key={region.id} value={region.name}>{region.name}</option>
                  ))}
                    
                
                </Field>
              </div>
              <ErrorMessage name="region" component="div" style={styles.error} />
            </div>

<div style={styles.inputGroup}>
  <label htmlFor="gouvernement">Gouvernement</label>
  <div style={{ display: "flex", alignItems: "center" }}>
    <Field as="select" id="gouvernement" name="gouvernement" style={{ ...styles.input, marginRight: "10px" }}>
      <option value="">Choisir un gouvernement</option>
     
      {gouvernements.map(gouvernement => (
        <option key={gouvernement.id} value={gouvernement.name}>{gouvernement.name}</option>
      ))}
    
    </Field>
  </div>
  <ErrorMessage name="gouvernement" component="div" style={styles.error} />
</div>

<div style={styles.row}>
  <div style={styles.inputGroup}>
    <label htmlFor="secteur">Secteur</label>
    <div style={{ display: "flex", alignItems: "center" }}>
      <Field as="select" id="secteur" name="secteur" style={{ ...styles.input, marginRight: "10px" }}>
        <option value="">Choisir un secteur</option>
       
        {secteurs.map(secteur => (
        <option key={secteur.id} value={secteur.name}>{secteur.name}</option>
      ))}
      
      </Field>
    </div>
    <ErrorMessage name="secteur" component="div" style={styles.error} />
  </div>
</div>
  <div style={styles.inputGroup}>
  <label htmlFor="activite">Activité</label>
                <Field
                  type="text"
                  id="activite"
                  name="activite"
                  placeholder="activite"
                  style={styles.input}
                />
                <ErrorMessage name="activite" component="div" style={styles.error} />
              </div>
</div>
<div style={styles.row}>
  <div style={styles.inputGroup}>
  <label htmlFor="adresse_fiscale">Adresse fiscale</label>
                <Field
                  type="text"
                  id="adresse_fiscale"
                  name="adresse_fiscale"
                  placeholder="adresse_fiscale"
                  style={styles.input}
                />
                <ErrorMessage name="adresse_fiscale" component="div" style={styles.error} />
              </div>
  
</div>

            </div>
















            
                {/* Ajoutez d'autres champs ici de la même manière */}
              </div>
              <div style={styles.buttonGroup}>
                <button type="submit" style={{ ...styles.button, backgroundColor: "#4db6ac" }}>Submit</button>
                <button type="reset" style={{ ...styles.button, backgroundColor:  "grey" }}>Reset</button>
                <button type="button" style={{ ...styles.button, backgroundColor: "darkred" }} onClick={() => navigate('/')}>Cancel</button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default UpdateClient;