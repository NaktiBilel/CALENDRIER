import React from "react";
import { Box, useTheme } from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import Header from "../Header";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Button from "@mui/material/Button";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { nanoid } from "nanoid";
const AddClient = () => {
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [openRegionDialog, setOpenRegionDialog] = useState(false); // Add state for region dialog
  const [openSecteurDialog, setOpenSecteurDialog] = useState(false); // Add state for Secteur dialog
  const [openGouvernementDialog, setOpenGouvernementDialog] = useState(false); // Add state for region dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Add similar functions for region dialog
  const handleOpenGouvernementDialog = () => {
    setOpenGouvernementDialog(true);
  };
  // Add similar functions for secteur dialog
  const handleOpenSecteurDialog = () => {
    setOpenSecteurDialog(true);
  };

  const handleCloseSecteurDialog = () => {
    setOpenSecteurDialog(false);
  };

  const handleCloseGouvernementDialog = () => {
    setOpenGouvernementDialog(false);
  };

  // Add similar functions for region dialog
  const handleOpenRegionDialog = () => {
    setOpenRegionDialog(true);
  };

  const handleCloseRegionDialog = () => {
    setOpenRegionDialog(false);
  };
  // Add logic for fetching regions from the server
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get("api/regions/get");
        const usersWithId = response.data.regions.map((region) => ({
          ...region,
          id: region._id,
        }));
        setRegions(usersWithId);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };

    fetchRegions();
  }, []);

  useEffect(() => {
    const fetchSecteurs = async () => {
      try {
        const response = await axios.get("api/secteurs/get");
        const usersWithId = response.data.secteurs.map((name) => ({
          ...name,
          id: name._id,
        }));
        setRegions(usersWithId);
      } catch (error) {
        console.error("Error fetching secteurs:", error);
      }
    };

    fetchSecteurs();
  }, []);

  useEffect(() => {
    const fetchGouvernements = async () => {
      try {
        const response = await axios.get(
          "api/gouvernements/get"
        );
        const usersWithId = response.data.gouvernements.map((name) => ({
          ...name,
          id: name._id,
        }));
        setGouvernements(usersWithId);
      } catch (error) {
        console.error("Error fetching secteurs:", error);
      }
    };

    fetchGouvernements();
  }, []);
  // Add validation schema for gouvernement dialog
  const gouvernementValidationSchema = yup.object({
    name: yup.string().required("Le champ gouvernement est obligatoire."),
  });
  // Add validation schema for region dialog
  const regionValidationSchema = yup.object({
    region: yup.string().required("Le champ Région est obligatoire."),
  });

  // Add function to handle submitting region form
  const handleSubmitRegion = async (values) => {
    try {
      console.log("Form values:", values); // Check form values before sending

      // Send a GET request to check if the region already exists
      const response = await axios.get(
        `api/regions/check/${values.region}`
      );

      // Check the server response to see if the region already exists
      if (response.data.exists) {
        // Display an alert if the region already exists
        alert("This region already exists.");
        return; // Stop the function execution if the region already exists
      }

      // If the region doesn't exist already, proceed with adding it
      const addResponse = await axios.post(
        "api/regions",
        values
      );

      console.log("Response from server:", addResponse); // Check server response

      // Check if the POST request was successful
      if (addResponse.status === 200) {
        // Log a success message and close the dialog
        console.log("Region added successfully:", addResponse.data);
        handleCloseRegionDialog(); // Assuming this function closes the dialog
      } else {
        // Handle unexpected response status
        console.error("Unexpected response status:", addResponse.status);
      }
    } catch (error) {
      // Handle errors that occur during the request
      console.error("Error adding region:", error);
    }
  };
  const handleSubmitGouvernement = async (values) => {
    try {
      console.log("Form values:", values); // Check form values before sending

      // Send a GET request to check if the region already exists
      const response = await axios.get(
        `api2/gouvernements/check/${values.name}`
      );

      // Check the server response to see if the region already exists
      if (response.data.exists) {
        // Display an alert if the region already exists
        alert("This Gouvernement already exists.");
        return; // Stop the function execution if the region already exists
      }

      // If the region doesn't exist already, proceed with adding it
      const addResponse = await axios.post(
        "api/gouvernements",
        values
      );

      console.log("Response from server:", addResponse); // Check server response

      // Check if the POST request was successful
      if (addResponse.status === 200) {
        // Log a success message and close the dialog
        console.log("gouvernements added successfully:", addResponse.data);
        handleCloseGouvernementDialog(); // Assuming this function closes the dialog
      } else {
        // Handle unexpected response status
        console.error("Unexpected response status:", addResponse.status);
      }
    } catch (error) {
      // Handle errors that occur during the request
      console.error("Error adding gouvernements:", error);
    }
  };

  const handleSubmitSecteur = async (values) => {
    try {
      console.log("Form values:", values); // Check form values before sending

      // Send a GET request to check if the secteur already exists
      const checkResponse = await axios.get(
        `api/secteurs/check/${values.secteur}`
      );

      // Check if the secteur already exists
      if (checkResponse.data.exists) {
        // Display an alert if the secteur already exists
        alert("This secteur already exists.");
        return; // Stop the function execution if the secteur already exists
      }

      // If the secteur doesn't exist already, proceed with adding it
      const addResponse = await axios.post(
        "api/secteurs",
        values
      );

      console.log("Response from server:", addResponse); // Check server response

      // Check if the POST request was successful
      if (addResponse.status === 200) {
        // Log a success message and close the dialog
        console.log("secteur added successfully:", addResponse.data);
        handleCloseSecteurDialog(); // Assuming this function closes the dialog
      } else {
        // Handle unexpected response status
        console.error("Unexpected response status:", addResponse.status);
      }
    } catch (error) {
      // Handle errors that occur during the request
      console.error("Error adding secteur:", error);
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [banques, setBanques] = useState([]);
  const [secteurs, setSecteurs] = useState([]);
  const [regions, setRegions] = useState([]);

  const [clients, setClients] = useState([]);
  const [gouvernements, setGouvernements] = useState([]);
  useEffect(() => {
    const fetchBanques = async () => {
      try {
        const response = await axios.get("api/banques/get");
        const usersWithId = response.data.banques.map((banque) => ({
          ...banque,
          id: banque._id,
        }));
        setBanques(usersWithId);
      } catch (error) {
        console.error("Error fetching banques:", error);
      }
    };

    fetchBanques();
  }, []);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("api/clients/get");
        const clientsWithId = response.data.clients.map((client) => ({
          ...client,
          id: client._id,
        }));
        setClients(clientsWithId);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  const banqueValidationSchema = yup.object({
    banque: yup.string().required("Le champ Banque est obligatoire."),
  });

  const secteurValidationSchema = yup.object({
    name: yup.string().required("Le champ secteur est obligatoire."),
  });

  useEffect(() => {
    const fetchSecteurs = async () => {
      try {
        const response = await axios.get("api/secteurs/get");
        const usersWithId = response.data.secteurs.map((secteur) => ({
          ...secteur,
          id: secteur._id,
        }));
        setSecteurs(usersWithId);
      } catch (error) {
        console.error("Error fetching secteurs:", error);
      }
    };

    fetchSecteurs();
  }, []);

  const initialValues = {
    code: nanoid(),
    raison_social: "",
    adresse: "",
    adresse_fiscale: "",
    type: "",
    email: "",
    rc: "",
    banque: "",
    rib: "",
    telephone: "",
    timbre_fiscaux: "",
    suspendu_tva_du: "",
    suspendu_tva_au: "",
    numero_decision: "",
    region: "",
    gouvernement: "",
    secteur: "",
    activite: "",
  };
  const exactEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validationSchema = yup.object({
    code: yup
      .string()
      .required("Le champ Code est obligatoire.")
      .max(20, "Le champ Code doit avoir au maximum 20 caractères."),
      email: yup.string()
      .matches(exactEmailRegex, "Email must be a valid format")
      .required("Email is required"),
    telephone: yup.string().matches(/^[0-9]{8}$/, "Telephone must be a 8 digit number"),
    banque: yup.string().required("Le champ Banque est obligatoire."),
    numero_decision: yup
      .string()
      .required("Le champ numero_decision est obligatoire."),
    rib: yup.string().required("Le champ rib est obligatoire."),
    activite: yup.string().required("Le champ activite est obligatoire."),
    adresse_fiscale: yup
      .string()
      .required("Le champ adresse_fiscale est obligatoire."),
    raison_social: yup
      .string()
      .required("Le champ adresse_fiscale est obligatoire."),
    rc: yup.string().required("Le champ rc est obligatoire."),
    type: yup.string().required("Le champ type est obligatoire."),
    adresse: yup.string().required("Le champ adresse est obligatoire."),
    secteur: yup.string().required("Le champ secteur est obligatoire."),
    region: yup.string().required("Le champ region est obligatoire."),
    gouvernement: yup
      .string()
      .required("Le champ gouvernement est obligatoire."),
    timbre_fiscaux: yup
      .string()
      .required("Le champ timbre_fiscaux est obligatoire."),
  });

  const handleSubmit = async (values) => {
    try {
      console.log("Form values:", values); // Log form values to verify before submission

      // Vérifiez si un client avec le code donné existe déjà
      const checkResponse = await axios.get(
        `api/clients/check/${values.code}`
      );

      // Vérifiez la réponse du serveur pour voir si le client existe déjà
      if (checkResponse.data.exists) {
        // Affichez une alerte si le client existe déjà
        alert("This code client already exists.");
        return; // Arrêtez l'exécution de la fonction si le client existe déjà
      }

      // Si le client n'existe pas, procédez à son ajout
      const addResponse = await axios.post(
        "api/clients",
        values
      );

      console.log("Response from server:", addResponse.data); // Log the response from the server

      // Vérifiez si la réponse indique le succès
      if (addResponse.status === 200 || addResponse.status === 201) {
        console.log("Client added successfully:", addResponse.data);
        // Naviguez vers une autre page après l'ajout réussi
        navigate("/"); // Assumant que cela navigue vers la page d'accueil
      } else {
        // Gérez le statut de réponse inattendu
        console.error("Unexpected response status:", addResponse.status);
      }
    } catch (error) {
      // Gérez les erreurs qui surviennent pendant la requête
      console.error("Error adding client:", error);
    }
  };

  const handleSubmitBanque = async (values) => {
    try {
      console.log("Form values:", values); // Check form values before sending

      // Send a GET request to check if the region already exists
      const response = await axios.get(
        `api/banques/check/${values.banque}`
      );

      // Check the server response to see if the region already exists
      if (response.data.exists) {
        // Display an alert if the region already exists
        alert("This banque already exists.");
        return; // Stop the function execution if the region already exists
      }

      // If the region doesn't exist already, proceed with adding it
      const addResponse = await axios.post(
        "api/banques",
        values
      );

      console.log("Response from server:", addResponse); // Check server response

      // Check if the POST request was successful
      if (addResponse.status === 200) {
        // Log a success message and close the dialog
        console.log("banques added successfully:", addResponse.data);
        handleCloseDialog(); // Assuming this function closes the dialog
      } else {
        // Handle unexpected response status
        console.error("Unexpected response status:", addResponse.status);
      }
    } catch (error) {
      // Handle errors that occur during the request
      console.error("Error adding banque:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="Add Client" subtitle="Client" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form style={styles.form}>
            <div style={styles.row}>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label htmlFor="code">Code</label>
                  <Field
                    type="text"
                    id="code"
                    name="code"
                    placeholder="Code"
                    style={styles.input}
                  />
                  <ErrorMessage
                    name="code"
                    component="div"
                    style={styles.error}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label htmlFor="raison_social">Raison Sociale</label>
                  <Field
                    type="text"
                    id="raison_social"
                    name="raison_social"
                    placeholder="Raison Sociale"
                    style={styles.input}
                  />
                  <ErrorMessage
                    name="raison_social"
                    component="div"
                    style={styles.error}
                  />
                </div>
              </div>
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
                <ErrorMessage
                  name="telephone"
                  component="div"
                  style={styles.error}
                />
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
                <ErrorMessage
                  name="email"
                  component="div"
                  style={styles.error}
                />
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
                <ErrorMessage
                  name="adresse "
                  component="div"
                  style={styles.error}
                />
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
                <ErrorMessage
                  name="type"
                  component="div"
                  style={styles.error}
                />
              </div>
            </div>
            <div style={styles.row}></div>
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label htmlFor="rc">RC</label>
                <Field
                  type="text"
                  id="rc"
                  name="rc"
                  placeholder="RC"
                  style={styles.input}
                />
                <ErrorMessage name="rc" component="div" style={styles.error} />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="banque">Banque</label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Field
                    as="select"
                    id="banque"
                    name="banque"
                    style={{ ...styles.input, marginRight: "10px" }}
                  >
                    <option value="">Choisir une banque</option>
                    {banques.map((banque) => (
                      <option key={banque.id} value={banque.banque}>
                        {banque.banque}
                      </option>
                    ))}
                  </Field>
                  <AddCircleOutlineOutlinedIcon
                    onClick={handleOpenDialog}
                    style={{
                      verticalAlign: "middle",
                      backgroundColor: "red",
                      cursor: "pointer",
                      width: "43px",
                      height: "40px",
                    }}
                  />
                </div>
                <ErrorMessage
                  name="banque"
                  component="div"
                  style={styles.error}
                />
              </div>
              {/* Boîte de dialogue pour ajouter une nouvelle banque */}
              <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle
                  style={{
                    fontSize: "15px",
                    backgroundColor: "red",
                    marginBottom: "21px",
                  }}
                >
                  Ajouter une banque
                </DialogTitle>
                <Formik
                  initialValues={{ banque: "" }}
                  onSubmit={handleSubmitBanque}
                  validationSchema={banqueValidationSchema}
                >
                  {({ values, handleChange }) => (
                    <Form
                      style={{ padding: "20px", display: "grid", gap: "10px" }}
                    >
                      <div>
                        <label htmlFor="banque">Nom de la banque</label>
                        <Field
                          type="text"
                          id="banque"
                          name="banque"
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                          }}
                        />
                        <ErrorMessage
                          name="banque"
                          component="div"
                          style={styles.error}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          style={{ backgroundColor: "green", color: "white" }}
                        >
                          Ajouter
                        </Button>
                        <Button
                          onClick={handleCloseDialog}
                          variant="contained"
                          style={{ backgroundColor: "gray", color: "white" }}
                        >
                          Annuler
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Dialog>

              {/* Boîte de dialogue pour ajouter une nouvelle région */}
              <Dialog open={openRegionDialog} onClose={handleCloseRegionDialog}>
                <DialogTitle
                  style={{
                    fontSize: "15px",
                    backgroundColor: "red",
                    marginBottom: "21px",
                  }}
                >
                  Ajouter une région
                </DialogTitle>
                <Formik
                  initialValues={{ region: "" }}
                  onSubmit={handleSubmitRegion}
                  validationSchema={regionValidationSchema}
                >
                  {({ values, handleChange }) => (
                    <Form
                      style={{ padding: "20px", display: "grid", gap: "10px" }}
                    >
                      <div>
                        <label htmlFor="region">Nom de la région</label>
                        <Field
                          type="text"
                          id="region"
                          name="region"
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                          }}
                        />
                        <ErrorMessage
                          name="region"
                          component="div"
                          style={styles.error}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          style={{ backgroundColor: "green", color: "white" }}
                        >
                          Ajouter
                        </Button>
                        <Button
                          onClick={handleCloseRegionDialog}
                          variant="contained"
                          style={{ backgroundColor: "gray", color: "white" }}
                        >
                          Annuler
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Dialog>

              {/* Boîte de dialogue pour ajouter une nouvelle gonvernement */}
              <Dialog
                open={openGouvernementDialog}
                onClose={handleCloseGouvernementDialog}
              >
                <DialogTitle
                  style={{
                    fontSize: "15px",
                    backgroundColor: "red",
                    marginBottom: "21px",
                  }}
                >
                  Ajouter une gonvernement
                </DialogTitle>
                <Formik
                  initialValues={{ name: "" }}
                  onSubmit={handleSubmitGouvernement}
                  validationSchema={gouvernementValidationSchema}
                >
                  {({ values, handleChange }) => (
                    <Form
                      style={{ padding: "20px", display: "grid", gap: "10px" }}
                    >
                      <div>
                        <label htmlFor="region">Nom de la gonvernement</label>
                        <Field
                          type="text"
                          id="name"
                          name="name"
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                          }}
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          style={styles.error}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          style={{ backgroundColor: "green", color: "white" }}
                        >
                          Ajouter
                        </Button>
                        <Button
                          onClick={handleCloseGouvernementDialog}
                          variant="contained"
                          style={{ backgroundColor: "gray", color: "white" }}
                        >
                          Annuler
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Dialog>

              {/* Boîte de dialogue pour ajouter une nouvelle secteur under construction */}
              <Dialog
                open={openSecteurDialog}
                onClose={handleCloseSecteurDialog}
              >
                <DialogTitle
                  style={{
                    fontSize: "15px",
                    backgroundColor: "red",
                    marginBottom: "21px",
                  }}
                >
                  Ajouter une secteur
                </DialogTitle>
                <Formik
                  initialValues={{ name: "" }}
                  onSubmit={handleSubmitSecteur}
                  validationSchema={secteurValidationSchema}
                >
                  {({ values, handleChange }) => (
                    <Form
                      style={{ padding: "20px", display: "grid", gap: "10px" }}
                    >
                      <div>
                        <label htmlFor="region">Nom du secteur</label>
                        <Field
                          type="text"
                          id="name"
                          name="name"
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                          }}
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          style={styles.error}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          style={{ backgroundColor: "green", color: "white" }}
                        >
                          Ajouter
                        </Button>
                        <Button
                          onClick={handleCloseSecteurDialog}
                          variant="contained"
                          style={{ backgroundColor: "gray", color: "white" }}
                        >
                          Annuler
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Dialog>
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
                <ErrorMessage
                  name="timbre_fiscaux"
                  component="div"
                  style={styles.error}
                />
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
                  placeholder="Suspendu TVA du"
                  style={styles.input}
                />
                <ErrorMessage
                  name="suspendu_tva_du"
                  component="div"
                  style={styles.error}
                />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="suspendu_tva_au">Suspendu TVA au</label>
                <Field
                  type="date"
                  dateFormat="yyyy-MM-dd"
                  id="suspendu_tva_au"
                  name="suspendu_tva_au"
                  placeholder="Suspendu TVA au"
                  style={styles.input}
                />
                <ErrorMessage
                  name="suspendu_tva_au"
                  component="div"
                  style={styles.error}
                />
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
                <ErrorMessage
                  name="numero_decision"
                  component="div"
                  style={styles.error}
                />
              </div>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label htmlFor="region">Région</label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Field
                      as="select"
                      id="region"
                      name="region"
                      style={{ ...styles.input, marginRight: "10px" }}
                    >
                      <option value="">Choisir une région</option>
                      {regions.map((region) => (
                        <option key={region.id} value={region.name}>
                          {region.name}
                        </option>
                      ))}
                    </Field>
                    <AddCircleOutlineOutlinedIcon
                      onClick={handleOpenRegionDialog}
                      style={{
                        verticalAlign: "middle",
                        backgroundColor: "red",
                        cursor: "pointer",
                        width: "43px",
                        height: "40px",
                      }}
                    />
                  </div>
                  <ErrorMessage
                    name="region"
                    component="div"
                    style={styles.error}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label htmlFor="gouvernement">Gouvernement</label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Field
                      as="select"
                      id="gouvernement"
                      name="gouvernement"
                      style={{ ...styles.input, marginRight: "10px" }}
                    >
                      <option value="">Choisir un gouvernement</option>
                      {gouvernements.map((gouvernement) => (
                        <option key={gouvernement.id} value={gouvernement.name}>
                          {gouvernement.name}
                        </option>
                      ))}
                    </Field>
                    {/* Boîte de dialogue pour ajouter une nouvelle banque */}
                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                      <DialogTitle
                        style={{
                          fontSize: "15px",
                          backgroundColor: "red",
                          marginBottom: "21px",
                        }}
                      >
                        Ajouter une banque
                      </DialogTitle>
                      <Formik
                        initialValues={{ banque: "" }}
                        onSubmit={handleSubmitBanque}
                        validationSchema={banqueValidationSchema}
                      >
                        {({ values, handleChange }) => (
                          <Form
                            style={{
                              padding: "20px",
                              display: "grid",
                              gap: "10px",
                            }}
                          >
                            <div>
                              <label htmlFor="banque">Nom de la banque</label>
                              <Field
                                type="text"
                                id="banque"
                                name="banque"
                                style={{
                                  width: "100%",
                                  padding: "10px",
                                  border: "1px solid #ccc",
                                  borderRadius: "5px",
                                }}
                              />
                              <ErrorMessage
                                name="banque"
                                component="div"
                                style={styles.error}
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Button
                                type="submit"
                                variant="contained"
                                style={{
                                  backgroundColor: "green",
                                  color: "white",
                                }}
                              >
                                Ajouter
                              </Button>
                              <Button
                                onClick={handleCloseDialog}
                                variant="contained"
                                style={{
                                  backgroundColor: "gray",
                                  color: "white",
                                }}
                              >
                                Annuler
                              </Button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </Dialog>
                    <AddCircleOutlineOutlinedIcon
                      onClick={handleOpenGouvernementDialog}
                      style={{
                        verticalAlign: "middle",
                        backgroundColor: "red",
                        cursor: "pointer",
                        height: "35px",
                        width: "40px",
                      }}
                    />
                  </div>
                  <ErrorMessage
                    name="gouvernement"
                    component="div"
                    style={styles.error}
                  />
                </div>

                <div style={styles.row}>
                  <div style={styles.inputGroup}>
                    <label htmlFor="secteur">Secteur</label>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Field
                        as="select"
                        id="secteur"
                        name="secteur"
                        style={{ ...styles.input, marginRight: "10px" }}
                      >
                        <option value="">Choisir un secteur</option>
                        {secteurs.map((secteur) => (
                          <option key={secteur.id} value={secteur.name}>
                            {secteur.name}
                          </option>
                        ))}
                      </Field>
                      <AddCircleOutlineOutlinedIcon
                        onClick={handleOpenSecteurDialog}
                        style={{
                          verticalAlign: "middle",
                          backgroundColor: "red",
                          cursor: "pointer",
                          height: "35px",
                          width: "40px",
                        }}
                      />
                    </div>
                    <ErrorMessage
                      name="secteur"
                      component="div"
                      style={styles.error}
                    />
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
                  <ErrorMessage
                    name="activite"
                    component="div"
                    style={styles.error}
                  />
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
                  <ErrorMessage
                    name="adresse_fiscale"
                    component="div"
                    style={styles.error}
                  />
                </div>
              </div>
            </div>

            <div style={styles.buttonGroup}>
              <button
                type="submit"
                style={{
                  ...styles.button,
                  backgroundColor: "#4db6ac",
                }}
              >
                Submit
              </button>
              <button
                type="reset"
                style={{
                  ...styles.button,
                  backgroundColor: "grey",
                }}
              >
                Reset
              </button>
              <button
                type="button"
                style={{
                  ...styles.button,
                  backgroundColor: "darkred",
                }}
                onClick={() => navigate("/")}
              >
                Annuler
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

const styles = {
  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
  },
  row: {
    display: "contents", // Allow children to occupy their own grid cells
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  error: {
    color: "red",
    fontSize: "12px",
  },
  buttonGroup: {
    gridColumn: "span 2", // Make buttons span across both columns
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  button: {
    flex: "1",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
  },
  "@media (max-width: 600px)": {
    form: {
      gridTemplateColumns: "1fr",
      padding: "10px",
    },
    buttonGroup: {
      flexDirection: "column",
      gap: "10px",
    },
    button: {
      width: "100%",
    },
  },
};

export default AddClient;
