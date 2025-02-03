import express from "express";
import VisiteModel from "../models/Visites.js";

const router = express.Router();

// Add a new visite
router.post("", async (req, res) => {
  try {
    // Create a new user instance using the UserModel
    const newVisite = new VisiteModel({
      libelle: req.body.libelle,
      code_client: req.body.code_client,
      description: req.body.description,
      raison_sociale: req.body.raison_sociale,
      date_debut: req.body.date_debut,
      temps_debut: req.body.temps_debut,
      temps_fin: req.body.temps_fin,
      type_visite: req.body.type_visite,
      date_fin: req.body.date_fin,
    });

    // Save the new user to the database
    const savedVisite = await newVisite.save();

    // Return the saved user data as a response
    return res.json(savedVisite);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error saving new user:", error);
    return res.status(500).json({ error: "Error saving new user" });
  }
});

router.get("/get", async (req, res) => {
  try {
    const visites = await VisiteModel.find({});
    const totalCountVisite = await VisiteModel.countDocuments({});

    return res.json({ visites, totalCountVisite });
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const visiteId = req.params.id;
    const deletedVisite = await VisiteModel.findByIdAndDelete(visiteId);

    if (!deletedVisite) {
      return res.status(404).json({ error: "visite not found" });
    }

    return res.json({ message: "visite deleted successfully" });
  } catch (error) {
    console.error("Error deleting visite:", error);
    return res.status(500).json({ error: "Error deleting visite" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const visiteId = req.params.id;
    const updatedVisite = await VisiteModel.findByIdAndUpdate(
      visiteId,
      req.body,
      { new: true }
    );

    if (!updatedVisite) {
      return res.status(404).json({ error: "visites not found" });
    }

    return res.json(updatedVisite);
  } catch (error) {
    console.error("Error updating visite:", error);
    return res.status(500).json({ error: "Error updating visites" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const visiteId = req.params.id;
    const visite = await VisiteModel.findById(visiteId);

    if (!visite) {
      return res.status(404).json({ error: "visite not found" });
    }

    return res.json(visite);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Error fetching user" });
  }
});


export default router;
