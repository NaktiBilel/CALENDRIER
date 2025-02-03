import express from 'express';
import ReunionModel from '../models/Reunions.js';

const router = express.Router();

router.post("", async (req, res) => {
    try {
      // Create a new user instance using the UserModel
      const newReunion = new ReunionModel({
        libelle: req.body.libelle,
        code_client: req.body.code_client,
        description: req.body.description,
        raison_sociale: req.body.raison_sociale,
        date_debut: req.body.date_debut,
        temps_debut: req.body.temps_debut,
        temps_fin: req.body.temps_fin,
        type_reunion: req.body.type_reunion,
      });
  
      // Save the new user to the database
      const savedReunion = await newReunion.save();
  
      // Return the saved user data as a response
      return res.json(savedReunion);
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error saving new user:", error);
      return res.status(500).json({ error: "Error saving new user" });
    }
  });
  
  router.get("/get", async (req, res) => {
    try {
      const reunions = await ReunionModel.find({});
      const totalCountReunion = await ReunionModel.countDocuments({});
  
      return res.json({ reunions, totalCountReunion });
    } catch (err) {
      console.log(err);
      return res.json(err);
    }
  });
  router.put("/updateReunion/:id", async (req, res) => {
    try {
      const reunionId = req.params.id;
      const updatedReunion = await ReunionModel.findByIdAndUpdate(
        reunionId,
        req.body,
        { new: true }
      );
  
      if (!updatedReunion) {
        return res.status(404).json({ error: "user not found" });
      }
  
      return res.json(updatedReunion);
    } catch (error) {
      console.error("Error updating reunion:", error);
      return res.status(500).json({ error: "Error updating reunion" });
    }
  });
  router.delete("/:id", async (req, res) => {
    try {
      const reunionId = req.params.id;
      const deletedReunion = await ReunionModel.findByIdAndDelete(reunionId);
  
      if (!deletedReunion) {
        return res.status(404).json({ error: "reunions not found" });
      }
  
      return res.json({ message: "reunions deleted successfully" });
    } catch (error) {
      console.error("Error deleting reunions:", error);
      return res.status(500).json({ error: "Error deleting user" });
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const reunionId = req.params.id;
      const reunion = await ReunionModel.findById(reunionId);
  
      if (!reunion) {
        return res.status(404).json({ error: "reunion not found" });
      }
  
      return res.json(reunion);
    } catch (error) {
      console.error("Error fetching reunion:", error);
      return res.status(500).json({ error: "Error fetching reunion" });
    }
  });
  
export default router;
