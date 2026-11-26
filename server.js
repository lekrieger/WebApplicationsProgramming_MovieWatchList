// Express server for the Movie Watch List.
const express = require('express');
const path = require('path');

// Loading db.js opens the database and creates the films table.
require('./db');

const app = express();

// Render sets PORT when hosting; locally we fall back to 3000.
const PORT = process.env.PORT || 3000;

// Serve static HTML, CSS, and JS files from the public folder.
app.use(express.static(path.join(__dirname, 'public')));

// All film endpoints live under /api/films.
app.use('/api/films', require('./routes/films'));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
