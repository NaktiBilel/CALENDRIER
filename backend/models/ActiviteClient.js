import mongoose from "mongoose";

// Define the schema for the User model
const activiteClientSchema = new mongoose.Schema({
    name: String,
   
  
  // other fields as needed
});

// Create the UserModel based on the schema
const ActiviteClientModel = mongoose.model("ActiviteClients", activiteClientSchema);

export default ActiviteClientModel;
