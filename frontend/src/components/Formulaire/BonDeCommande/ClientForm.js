import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Header from "../../Header"; // Assuming Header is used for consistency
import { tokens } from "../../../theme"; // Assuming tokens for theming
import { useTheme } from '@mui/material/styles';

const ClientForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const initialValues = {
    codeclt: '',
    RaisonSociale: '',
  };

  const validationSchema = Yup.object({
    codeclt: Yup.string().required('Required'),
    RaisonSociale: Yup.string().required('Required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios.post('http://localhost:3000/clients', values);
      alert('Client saved');
      resetForm();
    } catch (error) {
      console.error('There was an error saving the client!', error);
    }
  };

  return (
    <Box m="20px" sx={{
      "& .MuiTextField-root": {
        marginBottom: "16px",
      },
      "& .MuiButton-contained": {
        backgroundColor: "#4db6ac", // Consistent button color
        color: "#fff", // Button text color
        '&:hover': {
          backgroundColor: "#038d4f", // Darker shade for hover effect
        },
      },
    }}>
      <Header title="Client Form" subtitle="Add or Edit Client Details" />
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Client Form
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <Box mb={2}>
              <Field name="codeclt">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Code Client"
                    variant="outlined"
                    fullWidth
                    required
                  />
                )}
              </Field>
              <ErrorMessage name="codeclt" component="div" />
            </Box>
            <Box mb={2}>
              <Field name="RaisonSociale">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Raison Sociale"
                    variant="outlined"
                    fullWidth
                    required
                  />
                )}
              </Field>
              <ErrorMessage name="RaisonSociale" component="div" />
            </Box>
            <Button variant="contained" type="submit">
              Save Client
            </Button>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default ClientForm;
