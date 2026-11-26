// Routes for /api/films.
const express = require('express');
const db = require('../db');

const router = express.Router();

// GET /api/films - return all films, newest first.
router.get('/', (req, res) => {
  const films = db.prepare('SELECT * FROM films ORDER BY id DESC').all();
  res.json(films);
});

// GET /api/films/:id - return one film, or 404 if it does not exist.
router.get('/:id', (req, res) => {
  // If :id is not a number (e.g. "abc"), the query finds nothing and we answer 404.
  const film = db.prepare('SELECT * FROM films WHERE id = ?').get(req.params.id);

  if (!film) {
    return res.status(404).json({ error: 'Film not found.' });
  }

  res.json(film);
});

module.exports = router;
