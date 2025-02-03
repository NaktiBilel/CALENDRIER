import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Header from "../../Header"; // Assuming Header is used for consistency
import { tokens } from "../../../theme"; // Assuming tokens for theming
import { useTheme } from '@mui/material/styles';

const ArticleForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const initialValues = {
    codeart: '',
    libelle: '',
    prixHT: '',
    TVA: '',
  };

  const validationSchema = Yup.object({
    codeart: Yup.string().required('Required'),
    libelle: Yup.string().required('Required'),
    prixHT: Yup.number().required('Required'),
    TVA: Yup.number().required('Required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios.post('http://localhost:3000/articles', values);
      alert('Article saved');
      resetForm();
    } catch (error) {
      console.error('There was an error saving the article!', error);
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
      <Header title="Article Form" subtitle="Add or Edit Article Details" />
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Article Form
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <Box mb={2}>
              <Field name="codeart">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Code Article"
                    variant="outlined"
                    fullWidth
                    required
                  />
                )}
              </Field>
              <ErrorMessage name="codeart" component="div" />
            </Box>
            <Box mb={2}>
              <Field name="libelle">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Libelle"
                    variant="outlined"
                    fullWidth
                    required
                  />
                )}
              </Field>
              <ErrorMessage name="libelle" component="div" />
            </Box>
            <Box mb={2}>
              <Field name="prixHT">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Prix HT"
                    variant="outlined"
                    type="number"
                    fullWidth
                    required
                  />
                )}
              </Field>
              <ErrorMessage name="prixHT" component="div" />
            </Box>
            <Box mb={2}>
              <Field name="TVA">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="TVA"
                    variant="outlined"
                    type="number"
                    fullWidth
                    required
                  />
                )}
              </Field>
              <ErrorMessage name="TVA" component="div" />
            </Box>
            <Button variant="contained" type="submit">
              Save Article
            </Button>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default ArticleForm;
