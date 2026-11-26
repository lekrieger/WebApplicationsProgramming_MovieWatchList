// Routes for /api/films.
const express = require('express');
const db = require('../db');

const router = express.Router();

// GET /api/films - return all films, newest first.
router.get('/', (req, res) => {
  const films = db.prepare('SELECT * FROM films ORDER BY id DESC').all();
  res.json(films);
});

module.exports = router;
