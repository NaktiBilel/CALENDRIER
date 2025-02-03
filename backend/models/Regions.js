import mongoose from "mongoose";

// Define the schema for the User model
const regionSchema = new mongoose.Schema({
   
   name	 : String,
   
  
  // other fields as needed
});

// Create the UserModel based on the schema
const RegionModel = mongoose.model("Regions", regionSchema);

export default RegionModel;

