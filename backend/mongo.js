// mongo.js
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB', err);
  });

const articleSchema = new mongoose.Schema({
  codeart: String,
  libelle: String,
  prixHT: Number,
  TVA: Number,
});

const clientSchema = new mongoose.Schema({
  codeclt: String,
  RaisonSociale: String,
});

const ebcSchema = new mongoose.Schema({
  intBc: String,
  codeclt: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  RaisonSociale: String,
});

const lbcSchema = new mongoose.Schema({
  codeart: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
  libelle: String,
  prixHT: Number,
  TVA: Number,
  prixTVA: Number,
});

const Article = mongoose.model('Article', articleSchema);
const Client = mongoose.model('Client', clientSchema);
const EBC = mongoose.model('EBC', ebcSchema);
const LBC = mongoose.model('LBC', lbcSchema);

export { Article, Client, EBC, LBC };
