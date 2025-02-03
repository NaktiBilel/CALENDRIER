import React, { useState } from 'react';
import Card from '@mui/material/Card';
import { Button, CardActionArea, CardActions, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

const Profile = () => {
    // Récupérer les informations depuis le stockage local
    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [name, setName] = useState(localStorage.getItem('name'));
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [telephone, setTelephone] = useState(localStorage.getItem('telephone'));
    const [image, setImage] = useState(localStorage.getItem('image'));

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        // Sauvegarder les informations dans le stockage local
        localStorage.setItem('email', email);
        localStorage.setItem('name', name);
        localStorage.setItem('username', username);
        localStorage.setItem('telephone', telephone);
        // Fermer la boîte de dialogue
        setOpen(false);
    };

    return (
        <div>
            <Card sx={{ backgroundColor: "white", maxWidth: "70%", height: "70%", marginTop: "50px", marginLeft: "91px" }}>
                <CardActionArea>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '20px', color: 'black' }}>
                        <img
                            alt="profile-user"
                            width="100px"
                            height="100px"
                            src={image}
                            style={{ cursor: "pointer", borderRadius: "50%", marginRight: "86px" }}
                        />
                        <div>
                            <h1>Profile</h1>
                            <div>
                                <strong style={{ fontSize:"20px" }}>Email:</strong> <div>{email}</div><br />
                                <strong style={{ fontSize:"20px" }}>Name:</strong> <div style={{ fontSize:"20px" }}>{name}</div><br />
                                <strong style={{ fontSize:"20px" }}>Username:</strong> <div style={{ fontSize:"20px" }}>{username}</div><br />
                                <strong style={{ fontSize:"20px" }}>Telephone:</strong> <div style={{ fontSize:"20px" }}>{telephone}</div><br />
                                {/* Ajoutez d'autres informations de profil si nécessaire */}
                            </div>
                        </div>
                    </div>
                </CardActionArea>
                <CardActions>
                    <Button onClick={handleClickOpen} style={{ backgroundColor:"grey" }} variant="contained">Edit</Button>
                </CardActions>
            </Card>
            
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ backgroundColor:"#4db6ac" }}>Edit Profile</DialogTitle>
                <DialogContent >
                    <DialogContentText>
                        Please enter your details to update your profile.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Username"
                        type="text"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Telephone"
                        type="text"
                        fullWidth
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary"style={{ backgroundColor:"grey" }}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary"style={{ backgroundColor:"#4db6ac" }}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Profile;
