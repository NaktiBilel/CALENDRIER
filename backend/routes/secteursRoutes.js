import express from 'express';
import SecteurModel from '../models/Secteurs.js';

const router = express.Router();

// Get all secteurs
router.post("", async (req, res) => {
    try {
      // Create a new user instance using the clients
      const newSecteur = new SecteurModel({
        name: req.body.name,
      });
  
      // Save the new user to the database
      const savedSecteur = await newSecteur.save();
  
      // Return the saved user data as a response
      return res.json(savedSecteur);
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error saving new user:", error);
      return res.status(500).json({ error: "Error saving new user" });
    }
  });
  
  router.get("/get", async (req, res) => {
    try {
      const secteurs = await SecteurModel.find({});
      const totalCountSecteur = await SecteurModel.countDocuments({});
  
      return res.json({ secteurs, totalCountSecteur });
    } catch (err) {
      console.log(err);
      return res.json(err);
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const secteurId = req.params.id;
      const deletedSecteur = await SecteurModel.findByIdAndDelete(secteurId);
  
      if (!deletedSecteur) {
        return res.status(404).json({ error: "secteur not found" });
      }
  
      return res.json({ message: "secteur deleted successfully" });
    } catch (error) {
      console.error("Error deleting secteur:", error);
      return res.status(500).json({ error: "Error deleting secteur" });
    }
  });
  
  router.put("/update/:id", async (req, res) => {
    try {
      const secteurId = req.params.id;
      const updatedSecteur = await SecteurModel.findByIdAndUpdate(
        secteurId,
        req.body,
        { new: true }
      );
  
      if (!updatedSecteur) {
        return res.status(404).json({ error: "secteurs not found" });
      }
  
      return res.json(updatedSecteur);
    } catch (error) {
      console.error("Error updating secteurs:", error);
      return res.status(500).json({ error: "Error updating secteurs" });
    }
  });
  router.get("/check/:secteurName", async (req, res) => {
    try {
      const secteurName = req.params.secteurName;
      const existingSecteur = await SecteurModel.findOne({ name: secteurName });
  
      if (existingSecteur) {
        return res.status(200).json({ exists: true });
      } else {
        return res.status(200).json({ exists: false });
      }
    } catch (error) {
      console.error("Error checking secteur:", error);
      return res.status(500).json({ error: "Error checking banque" });
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const secteurId = req.params.id;
      const secteur = await SecteurModel.findById(secteurId);
  
      if (!secteur) {
        return res.status(404).json({ error: "secteur not found" });
      }
  
      return res.json(secteur);
    } catch (error) {
      console.error("Error fetching secteur:", error);
      return res.status(500).json({ error: "Error fetching secteur" });
    }
  });
  

export default router;
