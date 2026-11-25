// Seed script to populate the database with example films.
const db = require('./db');

const sampleFilms = [
  {
    title: 'Dune: Part Two',
    release_year: 2024,
    genre: 'Sci-Fi',
    notes: 'Watch on a big screen with good sound.',
    watched: 0,
    rating: null,
    review: null,
  },
  {
    title: 'Past Lives',
    release_year: 2023,
    genre: 'Drama',
    notes: 'Recommended by seminar group.',
    watched: 0,
    rating: null,
    review: null,
  },
  {
    title: 'The Holdovers',
    release_year: 2023,
    genre: 'Comedy-Drama',
    notes: 'Great winter movie.',
    watched: 0,
    rating: 4,
    review: null,
  },
  {
    title: 'Oppenheimer',
    release_year: 2023,
    genre: 'Biography',
    notes: 'Three hours long, plan an evening.',
    watched: 1,
    rating: 5,
    review: 'Intense pacing and outstanding score from start to finish.',
  },
  {
    title: 'Parasite',
    release_year: 2019,
    genre: 'Thriller',
    notes: 'Go in without reading spoilers.',
    watched: 1,
    rating: 5,
    review: 'Sharp social satire with unforgettable twists.',
  },
  {
    title: 'Blade Runner 2049',
    release_year: 2017,
    genre: 'Sci-Fi',
    notes: 'Sequel to the 1982 classic.',
    watched: 1,
    rating: 4,
    review: 'Stunning cinematography and atmosphere, slow burn.',
  },
];

const findFilm = db.prepare(
  'SELECT id FROM films WHERE LOWER(title) = LOWER(?) AND release_year = ?'
);

const insertFilm = db.prepare(`
  INSERT INTO films (title, release_year, genre, notes, watched, rating, review)
  VALUES (@title, @release_year, @genre, @notes, @watched, @rating, @review)
`);

const seedMany = db.transaction((films) => {
  let inserted = 0;
  for (const film of films) {
    const existing = findFilm.get(film.title, film.release_year);
    if (!existing) {
      insertFilm.run(film);
      inserted += 1;
    }
  }
  return inserted;
});

const insertedCount = seedMany(sampleFilms);
console.log(`Seed complete: ${insertedCount} new film(s) added.`);