import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/material'; // Import Box from MUI
import { useNavigate } from 'react-router-dom';

// Define validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Region is required"),
});

const IndexActiviteClient = () => {
  const initialValues = {
    name: "",
  };
  const navigate = useNavigate();
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    // Handle form submission here
    setSubmitting(false);
  };

  return (
    <Box m="20px"> {/* Wrap your content inside Box */}
      {/* Header component needs to be imported */}
      {/* Add your Header component here */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form>
            <div>
              <div>
                <label htmlFor="region" style={{ fontSize: '50px', marginRight: '20px' }}>Activite : </label>
                <Field style={{ fontSize: '50px' }}
                  as="select"  // Use "as" prop to render select
                  id="region"
                  name="region"
                >
                  <option value="">Select activite</option>
                  <option value="exemple1">Exemple 1</option>
                  <option value="exemple2">Exemple 2</option>
                  <option value="exemple3">Exemple 3</option>
                  <option value="exemple4">Exemple 4</option>
                  <option value="exemple5">Exemple 5</option>
                  <option value="exemple6">Exemple 6</option>
                  <option value="exemple7">Exemple 7</option>
                </Field>
                <ErrorMessage name="region" component="div" />
              </div>
            </div>
            <div style={{ padding: '35px' }}>
              <button type="submit" style={{ color: 'white', backgroundColor: "#4db6ac", width: "108px", height: "43px" }}>Submit</button>
              <button type="reset" style={{ color: 'white', backgroundColor: "grey", height: "43px", width: "100px" }}>Reset</button>
              <button type="button" style={{ color: 'white', backgroundColor: "darkred", height: "43px", width: "90px" }} onClick={() => navigate('/')}>Annuler</button>
            </div>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default IndexActiviteClient;
