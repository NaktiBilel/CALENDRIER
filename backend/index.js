import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/usersRoutes.js";
import activites from "./routes/activiteClientRoutes.js";
import banques from "./routes/banquesRoutes.js";
import clients from "./routes/clientsRoutes.js";
import reunions from "./routes/reunionsRoutes.js";
import gouvernements from "./routes/gouvernementsRoutes.js";
import regions from "./routes/regionsRoutes.js";
import rues from "./routes/rueRoutes.js";
import secteurs from "./routes/secteursRoutes.js";
import taches from "./routes/tachesRoutes.js";
import visites from "./routes/visitesRoutes.js";
import livraisons from "./routes/livraisonRoutes.js";

import { Article, Client, EBC, LBC } from './mongo.js';
import ReunionModel from "./models/Reunions.js";
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb://localhost:27017/test"
  )
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

 
// Example route to create an Article


// Example route to create a Client


app.use("/users", authRoutes);
app.use("/activites", activites);
app.use("/banques", banques);
app.use("/clients", clients);
app.use("/gouvernements", gouvernements);
app.use("/regions", regions);
app.use("/reunions", reunions);
app.use("/rues", rues);
app.use("/secteurs", secteurs);
app.use("/taches", taches);
app.use("/visites", visites);
app.use("/livraisons", livraisons);


//Tache

//Client


//banque


//region


//gouvernements


//secteurs


//reunions


//visites


// activites


app.listen(3002, () => {
  console.log("Connected to backend.");
});
