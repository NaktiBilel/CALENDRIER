import express from 'express';
import ClientModel from '../models/Clients.js';

const router = express.Router();

// Get all clients
router.get("/check/:clientName", async (req, res) => {
    try {
      const clientName = req.params.clientName;
      const existingClient = await ClientModel.findOne({ code: clientName });
  
      if (existingClient) {
        return res.status(200).json({ exists: true });
      } else {
        return res.status(200).json({ exists: false });
      }
    } catch (error) {
      console.error("Error checking client:", error);
      return res.status(500).json({ error: "Error checking client" });
    }
  });
  /*
  app.post('/clients', async (req, res) => {
    try {
        const client = new Client(req.body);
        await client.save();
        res.status(201).send(client);
    } catch (err) {
        res.status(400).send(err);
    }
  });
*/
  router.post("", async (req, res) => {
    try {
      // Create a new user instance using the clients
      const newClient = new ClientModel({
        raison_social: req.body.raison_social,
        adresse_fiscale: req.body.adresse_fiscale,
        adresse: req.body.adresse,
        type: req.body.type,
        email: req.body.email,
        rc: req.body.rc,
        banque: req.body.banque,
        rib: req.body.rib,
        telephone: req.body.telephone,
        suspendu_tva_du: req.body.suspendu_tva_du,
        suspendu_tva_au: req.body.suspendu_tva_au,
        numero_decision: req.body.numero_decision,
        region: req.body.region,
        gouvernement: req.body.gouvernement,
        secteur: req.body.secteur,
        activite: req.body.activite,
        code: req.body.code,
      });
  
      // Save the new user to the database
      const savedClient = await newClient.save();
  
      // Return the saved user data as a response
      return res.json(savedClient);
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error saving new user:", error);
      return res.status(500).json({ error: "Error saving new user" });
    }
  });
  
  router.get("/get", async (req, res) => {
    try {
      const clients = await ClientModel.find({});
      const totalCountClient = await ClientModel.countDocuments({});
  
      return res.json({ clients, totalCountClient });
    } catch (err) {
      console.log(err);
      return res.json(err);
    }
  });
  
  router.put("/updateClient/:id", async (req, res) => {
    try {
      const clientId = req.params.id;
      const updatedClient = await ClientModel.findByIdAndUpdate(
        clientId,
        req.body,
        { new: true }
      );
  
      if (!updatedClient) {
        return res.status(404).json({ error: "user not found" });
      }
  
      return res.json(updatedClient);
    } catch (error) {
      console.error("Error updating client:", error);
      return res.status(500).json({ error: "Error updating client" });
    }
  });
  router.delete("/:id", async (req, res) => {
    try {
      const clientId = req.params.id;
      const deletedClient = await ClientModel.findByIdAndDelete(clientId);
  
      if (!deletedClient) {
        return res.status(404).json({ error: "User not found" });
      }
  
      return res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({ error: "Error deleting user" });
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const clientId = req.params.id;
      const client = await ClientModel.findById(clientId);
  
      if (!client) {
        return res.status(404).json({ error: "User not found" });
      }
  
      return res.json(client);
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ error: "Error fetching user" });
    }
  });
  
export default router;

