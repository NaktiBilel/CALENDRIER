import mongoose from "mongoose";

// Define the schema for the User model
const gouvernementSchema = new mongoose.Schema({
   
   name	 : String,
   
  
  // other fields as needed
},
{ timestamps: true }
);

// Create the UserModel based on the schema
const GouvernementModel = mongoose.model("Gouvernements", gouvernementSchema);

export default GouvernementModel;

