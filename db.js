// SQLite connection and table setup for the Movie Watch List.
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// The database file lives in data/, which is not tracked by git.
const dataDir = path.join(__dirname, 'data');
fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, 'films.db'));

// Create the films table the first time the app starts.
// "IF NOT EXISTS" makes this safe to run on every start.
db.exec(`
  CREATE TABLE IF NOT EXISTS films (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    title        TEXT    NOT NULL,
    release_year INTEGER NOT NULL,
    genre        TEXT,
    notes        TEXT,
    watched      INTEGER NOT NULL DEFAULT 0,
    rating       INTEGER,
    review       TEXT,
    created_at   TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;
