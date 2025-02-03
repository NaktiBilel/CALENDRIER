import mongoose from "mongoose";

// Define the schema for the User model
const clientSchema = new mongoose.Schema({
       raison_social:String,

        adresse:String,

    	adresse_fiscale:String,

        type:String,

        email:{
          type: String,
          unique:true,
      },

        rc:String,

        banque:String,

        rib:String,

        telephone:String,

        timbre_fiscaux:String,

        suspendu_tva_du:String,

        suspendu_tva_au:String,

        numero_decision	:String,

        region:String,

        gouvernement:String,

        secteur:String,

        activite:String,
        
        code:String,
  
  // other fields as needed
}
);

// Create the UserModel based on the schema
const ClientModel = mongoose.model("Clients", clientSchema);

export default ClientModel;
