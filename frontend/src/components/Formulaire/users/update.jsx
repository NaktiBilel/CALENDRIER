import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const UpdateUser = () => {
  const { id } = useParams(); // Récupère l'ID utilisateur de l'URL
  const [userData, setUserData] = useState(null); // Initialise l'état local pour les données de l'utilisateur
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/users/${id}`); // Requête pour récupérer les données de l'utilisateur
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(); // Appelez la fonction pour récupérer les données de l'utilisateur lors du chargement du composant
  }, [id]); // Le useEffect s'exécutera à chaque fois que l'ID utilisateur change dans l'URL

  // Schéma de validation pour les champs du formulaire
  const exactEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validationSchema = yup.object({
    name: yup
      .string()
      .min(3, "Le nom doit avoir au minimum 3 caractères.")
      .max(20, "Le nom doit avoir au maximum 20 caractères.")
      .required("Le nom est obligatoire"),
    username: yup
      .string()
      .required("Le champ username client est obligatoire."),
      password: yup.string()
      .required("Le champ Password est obligatoire.")
      .max(20, "Le champ libellé doit avoir au maximum 20 caractères.")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/,
      "Le mot de passe doit contenir des lettres et des chiffres."),
    email: yup
      .string()
      .matches(exactEmailRegex, "Email must be a valid format")
      .required("Email is required"),
    telephone: yup
      .string(),
  });

  // Fonction de soumission du formulaire
  const handleSubmit = async (values) => {
    try {
      // Envoyez une requête HTTP PUT pour mettre à jour les données de l'utilisateur
      await axios.put(`api/users/update/${id}`, values);
      console.log("User updated successfully");
      navigate("/ListUser");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  const styles = {
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      width: "100%",
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "10px",
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      gap: "20px",
      "@media (max-width: 600px)": {
        flexDirection: "column",
      },
    },
    inputGroup: {
      flex: "1",
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
        padding: "10px",
      },
      row: {
        flexDirection: "column",
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
  // Rendu du composant
  return (
    <div>
      <h1>Update User</h1>
      {userData && (
        <Formik
          initialValues={{
            name: userData.name || "",
            username: userData.username || "",
            telephone: userData.telephone || "",
            email: userData.email || "",
            code: nanoid(),

            // Ajoutez d'autres champs initiaux selon vos besoins
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Form style={styles.form} encType="multipart/form-data">
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label htmlFor="name">Name</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    value={values.name} // Accès à la propriété name de values
                    placeholder="Name"
                    style={styles.input}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    style={styles.error}
                  />
                </div>
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="username">Username</label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  style={styles.input}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  style={styles.error}
                />
              </div>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label htmlFor="telephone">Telephone</label>
                  <PhoneInput
                    type="tel"
                    id="telephone"
                    name="telephone"
                    placeholder="Telephone"
                    country="US" // Default country code, you can change this
                    value={values.telephone}
                    onChange={(value) => handleChange("telephone", value)}
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
                    placeholder={"Email"}
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
                  <label htmlFor="image">Image</label>
                  <Field
                    type="file"
                    id="image"
                    name="image"
                    style={styles.input}
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    style={styles.error}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    style={styles.input}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    style={styles.error}
                  />
                </div>
              </div>
              {/* Ajoutez d'autres champs du formulaire ici */}
              <div style={styles.buttonGroup}>
                <button
                  type="submit"
                  onClick={handleSubmit}
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
      )}
    </div>
  );
};

export default UpdateUser;
