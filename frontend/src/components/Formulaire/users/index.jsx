import React from "react";
import { Box, useTheme } from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import Header from "../../Header";
import { tokens } from "../../../theme";
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import { nanoid } from "nanoid";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

  const Index = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //const exactEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const exactEmailRegex = /^[a-zA-Z0-9._%+-]+[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validationSchema = yup.object({
    name: yup.string()
      .min(3, "Le nom doit avoir au minimum 3 caractères.")
      .max(20, "Le nom doit avoir au maximum 20 caractères.")
      .required("Le nom est obligatoire"),
    username: yup.string()
      .required("Le champ username client est obligatoire."),
    password: yup.string()
    .required("Le champ Password est obligatoire.")
    .max(20, "Le champ libellé doit avoir au maximum 20 caractères.")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/,
    "Le mot de passe doit contenir des lettres et des chiffres."),
    email: yup.string()
      .matches(exactEmailRegex, "Email must be a valid format")
      .required("Email is required"),
    telephone: yup
      .string()
      .matches(/^[+]?[0-9]{1,3}[.-]?[0-9]{1,14}$/, "Invalid phone number format")
      .required("Phone number is required"),
  });

  const handleSubmit = async (values) => {
    try {
      // Send a POST request to add a new user
      const response = await axios.post('http://localhost:3002/users', values);
      
      // Check if the response indicates success
      if (response.status === 200) {
        // Log success message and navigate to a different page
        console.log('User added successfully:', response.data);
        navigate('/'); // Assuming this navigates to the homepage
      } else {
        // Handle unexpected response status
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error adding user:', error);
    }
  }

  const initialValues = { 
    name: "", 
    username: "", 
    email: "",  
    password: "", 
    telephone: "", 
    code: nanoid(), 
  };

  const styles = {
    form: {
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
      flex: '1',
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
        width: '100%',
      },
    },
  };

  return (
    <Box m="20px">
      <Header title="Add User" subtitle="User" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form style={styles.form} encType="multipart/form-data">
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label htmlFor="name">Name</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  style={styles.input}
                />
                <ErrorMessage name="name" component="div" style={styles.error} />
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
                <ErrorMessage name="username" component="div" style={styles.error} />
              </div>
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
                  onChange={(value) => setFieldValue("telephone", value)}
                  style={styles.input}
                />
                <ErrorMessage
                  name="telephone"
                  component="div"
                  style={styles.error}
                />
              </div>
            </div>
            <div style={styles.row}>
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
            <div style={styles.inputGroup}>
                <label htmlFor="email">Role</label>
                <Field
                  type="select"
                  id="role"
                  name="role"
                  placeholder="Role"
                  style={styles.input}
                >
                <option value="">Choisir Role</option>
                    <option key="ROLE_ADMIN" value="ROLE_ADMIN">ADMINISTRATEUR</option>
                    <option key="ROLE_CLIENT" value="ROLE_CLIENT">EXPEDITEUR</option>
                    </Field>
                <ErrorMessage name="email" component="div" style={styles.error} />
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
                <ErrorMessage name="image" component="div" style={styles.error} />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="password">Password</label>
                <Field
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Password"
                  style={styles.input}
                />
                <ErrorMessage name="password" component="div" style={styles.error} />
              </div>
            </div>

            <div style={styles.buttonGroup}>
              <button type="submit" style={{ ...styles.button, backgroundColor: "#4db6ac"  }}>Submit</button>
              <button type="reset" style={{ ...styles.button, backgroundColor: "grey" }}>Reset</button>
              <button type="button" style={{ ...styles.button, backgroundColor: "darkred" }} onClick={() => navigate('/')}>Annuler</button>
            </div>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Index;