import mongoose from "mongoose";

// Define the schema for the User model
const rueSchema = new mongoose.Schema({
   
  name	 : String,
   
  
  // other fields as needed
},
{ timestamps: true }
);

// Create the UserModel based on the schema
const RueModel = mongoose.model("Rues", rueSchema);


export default RueModel;

