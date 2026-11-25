// Express server for the Movie Watch List.
const express = require('express');

const app = express();

// Render sets PORT when hosting; locally we fall back to 3000.
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
