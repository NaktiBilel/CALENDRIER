// routes.js
import express from 'express';
import { Article, Client, EBC, LBC } from './mongo.js';

const router = express.Router();

// Save Article
router.post('/articles', async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).send(article);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Save Client
router.post('/clients', async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).send(client);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Save EBC
router.post('/ebcs', async (req, res) => {
  try {
    const ebc = new EBC(req.body);
    await ebc.save();
    res.status(201).send(ebc);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Save LBC
router.post('/lbcs', async (req, res) => {
  try {
    const lbc = new LBC(req.body);
    await lbc.save();
    res.status(201).send(lbc);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
