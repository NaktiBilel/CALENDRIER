import mongoose from "mongoose";

// Define the schema for the User model
const banqueSchema = new mongoose.Schema({
  banque: String,
  nombreAgences: Number,
  
  // other fields as needed
});

// Create the UserModel based on the schema
const BanqueModel = mongoose.model("Banques", banqueSchema);

export default BanqueModel;
