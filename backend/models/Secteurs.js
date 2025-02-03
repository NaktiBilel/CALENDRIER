import mongoose from "mongoose";

// Define the schema for the User model
const secteurSchema = new mongoose.Schema({
    name: String,
   
  
  // other fields as needed
});

// Create the UserModel based on the schema
const SecteurModel = mongoose.model("Secteurs", secteurSchema);

export default SecteurModel;
