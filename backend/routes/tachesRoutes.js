import express from 'express';
import TacheModel from '../models/Taches.js';

const router = express.Router();

// Get all taches

router.post("", async (req, res) => {
    try {
      // Create a new user instance using the UserModel
      const newTaches = new TacheModel({
        libelle: req.body.libelle,
        code_client: req.body.code_client,
        description: req.body.description,
        raison_sociale: req.body.raison_sociale,
        date_debut: req.body.date_debut,
        temps_debut: req.body.temps_debut,
        temps_fin: req.body.temps_fin,
        type_tache: req.body.type_tache,
        date_fin: req.body.date_fin,
      });
  
      // Save the new user to the database
      const savedTache = await newTaches.save();
  
      // Return the saved user data as a response
      return res.json(savedTache);
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error saving new user:", error);
      return res.status(500).json({ error: "Error saving new user" });
    }
  });
  
  router.get("/get", async (req, res) => {
    try {
      const taches = await TacheModel.find({});
      const totalCountTache = await TacheModel.countDocuments({});
  
      return res.json({ taches, totalCountTache });
    } catch (err) {
      console.log(err);
      return res.json(err);
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const tacheId = req.params.id;
      const deletedTache = await TacheModel.findByIdAndDelete(tacheId);
  
      if (!deletedTache) {
        return res.status(404).json({ error: "tache not found" });
      }
  
      return res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({ error: "Error deleting user" });
    }
  });
  
  router.put("/update/:id", async (req, res) => {
    try {
      const tacheId = req.params.id;
      const updatedTache = await TacheModel.findByIdAndUpdate(tacheId, req.body, {
        new: true,
      });
  
      if (!updatedTache) {
        return res.status(404).json({ error: "user not found" });
      }
  
      return res.json(updatedTache);
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ error: "Error updating user" });
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const tacheId = req.params.id;
      const tache = await TacheModel.findById(tacheId);
  
      if (!tache) {
        return res.status(404).json({ error: "User not found" });
      }
  
      return res.json(tache);
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ error: "Error fetching user" });
    }
  });
  
  router.put("/updateTache/:id", async (req, res) => {
    try {
      const tacheId = req.params.id;
      const updatedTache = await TacheModel.findByIdAndUpdate(tacheId, req.body, {
        new: true,
      });
  
      if (!updatedTache) {
        return res.status(404).json({ error: "Tache not found" });
      }
  
      return res.json(updatedTache);
    } catch (error) {
      console.error("Error updating Tache:", error);
      return res.status(500).json({ error: "Error updating Tache" });
    }
  });
  router.get("/:id", async (req, res) => {
    try {
      const tacheId = req.params.id;
      const tache = await BanqueModel.findById(tacheId);
  
      if (!tache) {
        return res.status(404).json({ error: "tache not found" });
      }
  
      return res.json(tache);
    } catch (error) {
      console.error("Error fetching tache:", error);
      return res.status(500).json({ error: "Error fetching tache" });
    }
  });
  

export default router;


