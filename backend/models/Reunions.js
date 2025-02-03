import mongoose from "mongoose";

// Define the schema for the User model
const reunionSchema = new mongoose.Schema({
       
        libelle:String,
        code_client:String,
        description:String,
        raison_sociale:String,
        date_debut:String,
        temps_debut:String,
        temps_fin:String,
        type_reunion:String,
  
  // other fields as needed
});

// Create the UserModel based on the schema
const ReunionModel = mongoose.model("Reunions", reunionSchema);

export default ReunionModel;

