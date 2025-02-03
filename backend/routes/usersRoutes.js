import express from 'express';
import UserModel from '../models/Users.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// Get all users
router.post("/login", async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
  
    try {
      // Recherche de l'admin dans la collection des utilisateurs avec l'email donné
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "User does not exist" });
      }
  
      // Vérification du mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Email or password is incorrect" });
      }
  
      // Création d'un token JWT
      const token = jwt.sign({ id: user._id, email: user.email }, "jaafer");
  
      // Retour des données de l'admin avec le token
      return res.json({
        token,
        adminID: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        username: user.username,
        telephone: user.telephone,
        image: user.image,
        role: user.role,
        // Ajoutez d'autres champs d'admin si nécessaire
      });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  router.post("", async (req, res) => {
    try {
      // Create a new user instance using the UserModel
      const newUser = new UserModel({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        image: req.body.image,
        code: req.body.code,
        telephone: req.body.telephone,
        password: req.body.password,
        role: req.body.role,
      });
  
      // Save the new user to the database
      const savedUser = await newUser.save();
  
      // Return the saved user data as a response
      return res.json(savedUser);
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error saving new user:", error);
      return res.status(500).json({ error: "Error saving new user" });
    }
  });
  
  router.get("/get", async (req, res) => {
    try {
      const users = await UserModel.find({});
      const totalCountUser = await UserModel.countDocuments({});
  
      return res.json({ users, totalCountUser });
    } catch (err) {
      console.log(err);
      return res.json(err);
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      const deletedUser = await UserModel.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      return res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({ error: "Error deleting user" });
    }
  });
  
  router.put("/update/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
  
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      return res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ error: "Error updating user" });
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      return res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ error: "Error fetching user" });
    }
  });
  
  router.get("/check/:userEmail", async (req, res) => {
    try {
      const userEmail = req.params.userEmail;
      const existingEmail = await UserModel.findOne({ user: userEmail });
  
      if (existingEmail) {
        return res.status(200).json({ exists: true });
      } else {
        return res.status(200).json({ exists: false });
      }
    } catch (error) {
      console.error("Error checking email:", error);
      return res.status(500).json({ error: "Error checking email" });
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "user not found" });
      }
  
      return res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ error: "Error fetching user" });
    }
  });
  
export default router;

