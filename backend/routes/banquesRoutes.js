import express from 'express';
import BanqueModel from '../models/Banques.js';

const router = express.Router();

// Get all banques
router.post("", async (req, res) => {
    try {
      // Create a new user instance using the clients
      const newBanque = new BanqueModel({
        banque: req.body.banque,
        nombreAgences: req.body.nombreAgences,
      });
  
      // Save the new user to the database
      const savedBanque = await newBanque.save();
  
      // Return the saved user data as a response
      return res.json(savedBanque);
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error saving new user:", error);
      return res.status(500).json({ error: "Error saving new user" });
    }
  });
  
  router.get("/get", async (req, res) => {
    try {
      const banques = await BanqueModel.find({});
      const totalCountBanque = await BanqueModel.countDocuments({});
  
      return res.json({ banques, totalCountBanque });
    } catch (err) {
      console.log(err);
      return res.json(err);
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const banqueId = req.params.id;
      const deletedBanque = await BanqueModel.findByIdAndDelete(banqueId);
  
      if (!deletedBanque) {
        return res.status(404).json({ error: "Banque not found" });
      }
  
      return res.json({ message: "Banque deleted successfully" });
    } catch (error) {
      console.error("Error deleting banque:", error);
      return res.status(500).json({ error: "Error deleting banque" });
    }
  });
  
  router.put("/update/:id", async (req, res) => {
    try {
      const banqueId = req.params.id;
      const updatedBanque = await BanqueModel.findByIdAndUpdate(
        banqueId,
        req.body,
        { new: true }
      );
  
      if (!updatedBanque) {
        return res.status(404).json({ error: "Banque not found" });
      }
  
      return res.json(updatedBanque);
    } catch (error) {
      console.error("Error updating banque:", error);
      return res.status(500).json({ error: "Error updating banque" });
    }
  });
  
  router.get("/check/:banqueName", async (req, res) => {
    try {
      const banqueName = req.params.banqueName;
      const existingBanque = await BanqueModel.findOne({ banque: banqueName });
  
      if (existingBanque) {
        return res.status(200).json({ exists: true });
      } else {
        return res.status(200).json({ exists: false });
      }
    } catch (error) {
      console.error("Error checking banque:", error);
      return res.status(500).json({ error: "Error checking banque" });
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const banqueId = req.params.id;
      const banque = await BanqueModel.findById(banqueId);
  
      if (!banque) {
        return res.status(404).json({ error: "banque not found" });
      }
  
      return res.json(banque);
    } catch (error) {
      console.error("Error fetching banque:", error);
      return res.status(500).json({ error: "Error fetching banque" });
    }
  });
  
export default router;
