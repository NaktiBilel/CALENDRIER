import mongoose from "mongoose";

// Define the schema for the User model
const livraisonSchema = new mongoose.Schema({
       code:String,

       expediteur:String,
       code_expediteur:String,
       nom_client:String,
        adresse_liv:String,
        numtel1:String,
        numtel2:String,

        gouvernement:String,
        code_gouvernement:String,

        code_rue:String,

        km:String,
        prixliv:Number,
        qte:Number,
        montant:Number,
        dateliv:Date,
        
  
  // other fields as needed
},
{ timestamps: true }
);

// Create the UserModel based on the schema
const LivraisonModel = mongoose.model("livraison", livraisonSchema);

export default LivraisonModel;
