// Validation rules for film data (title, release year, genre, notes).
// The routes call validateFilm() and send the errors back to the form.

const TITLE_MAX = 100;
const GENRE_MAX = 50;
const NOTES_MAX = 500;
const MIN_YEAR = 1888; // the first film was made in 1888
const YEARS_AHEAD = 5; // allow films that are announced but not out yet

// Turn a value into trimmed text. Anything that is not a string becomes ''.
function cleanText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

// Check the film fields in `data` (usually req.body).
// Returns { errors, values }:
//   errors - an object like { title: 'message' }, empty when everything is valid
//   values - the cleaned data, ready to save in the database
function validateFilm(data) {
  const input = data || {};
  const errors = {};

  const title = cleanText(input.title);
  const genre = cleanText(input.genre);
  const notes = cleanText(input.notes);

  // Title: required, 1-100 characters.
  if (title === '') {
    errors.title = 'Title is required.';
  } else if (title.length > TITLE_MAX) {
    errors.title = `Title must be at most ${TITLE_MAX} characters.`;
  }

  // Release year: required, a whole number between MIN_YEAR and this year + 5.
  const maxYear = new Date().getFullYear() + YEARS_AHEAD;
  const yearText = String(input.release_year ?? '').trim();
  const releaseYear = Number(yearText);

  if (yearText === '') {
    errors.release_year = 'Release year is required.';
  } else if (!Number.isInteger(releaseYear)) {
    errors.release_year = 'Release year must be a whole number.';
  } else if (releaseYear < MIN_YEAR || releaseYear > maxYear) {
    errors.release_year = `Release year must be between ${MIN_YEAR} and ${maxYear}.`;
  }

  // Genre: optional, at most 50 characters.
  if (genre.length > GENRE_MAX) {
    errors.genre = `Genre must be at most ${GENRE_MAX} characters.`;
  }

  // Notes: optional, at most 500 characters.
  if (notes.length > NOTES_MAX) {
    errors.notes = `Notes must be at most ${NOTES_MAX} characters.`;
  }

  return {
    errors,
    values: {
      title,
      release_year: releaseYear,
      genre: genre === '' ? null : genre,
      notes: notes === '' ? null : notes,
    },
  };
}

module.exports = { validateFilm };
