import express from 'express';
import ActiviteClientModel from '../models/ActiviteClient.js';

const router = express.Router();

// Get all activite clients
router.post("", async (req, res) => {
    try {
      // Create a new activites instance using the clients
      const newActivite = new ActiviteClientModel({
        name: req.body.name,
      });
  
      // Save the new user to the database
      const savedActivite = await newActivite.save();
  
      // Return the saved user data as a response
      return res.json(savedActivite);
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error saving new Activite:", error);
      return res.status(500).json({ error: "Error saving new Activite" });
    }
  });
  
  router.get("/get", async (req, res) => {
    try {
      const activites = await ActiviteClientModel.find({});
      const totalCountActivite = await ActiviteClientModel.countDocuments({});
  
      return res.json({ activites, totalCountActivite });
    } catch (err) {
      console.log(err);
      return res.json(err);
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const activiteId = req.params.id;
      const deleteActivite = await ActiviteClientModel.findByIdAndDelete(
        activiteId
      );
  
      if (!deleteActivite) {
        return res.status(404).json({ error: "activite not found" });
      }
  
      return res.json({ message: "activite deleted successfully" });
    } catch (error) {
      console.error("Error deleting activite:", error);
      return res.status(500).json({ error: "Error deleting activite" });
    }
  });
  
  router.put("/update/:id", async (req, res) => {
    try {
      const activiteId = req.params.id;
      const updatedActivite = await ActiviteClientModel.findByIdAndUpdate(
        activiteId,
        req.body,
        { new: true }
      );
  
      if (!updatedActivite) {
        return res.status(404).json({ error: "activite not found" });
      }
  
      return res.json(updatedActivite);
    } catch (error) {
      console.error("Error updating activite:", error);
      return res.status(500).json({ error: "Error updating activite" });
    }
  });
  router.get("/check/:activiteName", async (req, res) => {
    try {
      const activiteName = req.params.activiteName;
      const existingActivite = await ActiviteClientModel.findOne({
        name: activiteName,
      });
  
      if (existingActivite) {
        return res.status(200).json({ exists: true });
      } else {
        return res.status(200).json({ exists: false });
      }
    } catch (error) {
      console.error("Error checking activite:", error);
      return res.status(500).json({ error: "Error checking activite" });
    }
  });
  router.put("/update/:id", async (req, res) => {
    try {
      const activiteId = req.params.id;
      const updatedActivite = await ActiviteClientModel.findByIdAndUpdate(
        activiteId,
        req.body,
        { new: true }
      );
  
      if (!updatedActivite) {
        return res.status(404).json({ error: "activite not found" });
      }
  
      return res.json(updatedActivite);
    } catch (error) {
      console.error("Error updating activite:", error);
      return res.status(500).json({ error: "Error updating activite" });
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const activiteId = req.params.id;
      const activite = await SecteurModel.findById(activiteId);
  
      if (!activite) {
        return res.status(404).json({ error: "activite not found" });
      }
  
      return res.json(activite);
    } catch (error) {
      console.error("Error fetching activite:", error);
      return res.status(500).json({ error: "Error fetching activite" });
    }
  });
export default router;
