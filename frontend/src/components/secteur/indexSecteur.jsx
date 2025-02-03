import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

// Define validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required("secteur is required"),
});

const IndexSecteur = () => {
  const [open, setOpen] = useState(false);
  const [newSecteur, setNewSecteur] = useState("");
  const [options, setOptions] = useState([
    "exemple1", "exemple2", "exemple3", "exemple4", "exemple5", "exemple6", "exemple7"
  ]);
  
  const initialValues = {
    name: "",
  };
  
  const navigate = useNavigate();
  
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    // Handle form submission here
    setSubmitting(false);
  };
  
  const handleAddSecteur = (setFieldValue) => {
    if (newSecteur && !options.includes(newSecteur)) {
      setOptions([...options, newSecteur]);
      setFieldValue("name", newSecteur);
      setNewSecteur("");
      setOpen(false);
    } else if (newSecteur && options.includes(newSecteur)) {
      // Si la banque existe déjà dans la liste
      setFieldValue("name", newSecteur);
      setNewSecteur("");
      setOpen(false);
      alert("Cette banque existe déjà dans la liste !");
    }
  };

  return (
    <Box m="20px">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <label htmlFor="region" style={{ fontSize: '50px', marginRight: '20px' }}>Secteur : </label>
                <Field style={{ fontSize: '50px' }}
                  as="select"
                  id="region"
                  name="region"
                >
                  <option value="">Select secteur</option>
                  {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Field>
                <ErrorMessage name="name" component="div" style={{ color: 'red', fontSize: '20px' }} />
                <IconButton aria-label="Ajouter secteur" onClick={() => setOpen(true)}>
                  <AddCircleOutlinedIcon style={{ width: "51px",height: "67px" }} />
                </IconButton>
              </div>
            </div>
            <div style={{ padding: '35px' }}>
              <button type="submit" style={{ color: 'white', backgroundColor: "#4db6ac", width: "108px", height: "43px" }}>Submit</button>
              <button type="reset" style={{ color: 'white', backgroundColor: "grey", height: "43px", width: "100px" }}>Reset</button>
              <button type="button" style={{ color: 'white', backgroundColor: "darkred", height: "43px", width: "90px" }} onClick={() => navigate('/')}>Annuler</button>
            </div>
            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle>Ajouter une nouvelle banque</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Entrez le nom de la nouvelle banque que vous souhaitez ajouter.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="newSecteur"
                  label="Nom de la secteur"
                  type="text"
                  fullWidth
                  value={newSecteur}
                  onChange={(e) => setNewSecteur(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">
                  Annuler
                </Button>
                <Button onClick={() => handleAddSecteur(setFieldValue)} color="primary">
                  Ajouter
                </Button>
              </DialogActions>
            </Dialog>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default IndexSecteur;
