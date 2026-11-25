# Movie Watch List – Project Plan

Project 6, Web Applications Programming seminar (Romanian-American University).
Team: Leon and Dennis. Deadline: mid-December 2026. Plan agreed on 2026-11-02.

## How we work with this plan
- One step at a time. Each step is small, leaves the app working, and ends with **one git commit** made by Leon or Dennis. Claude never commits.
- Claude does only the step it is asked for, then stops, explains what changed and suggests a commit message.
- The work split is not decided yet. Write the owner in the "Who" column when a step starts. Both of us should have commits in every phase.
- After each phase, both of us go through the new code with `anthropic-skills:learn` or `ecc:code-tour` until we can explain it.
- Everything is in English: UI, code, comments, commit messages, README.

## Decisions
| Topic | Decision |
|-------|----------|
| Backend | Node.js + Express |
| Database | SQLite (suggested library: `better-sqlite3`, simple and synchronous; confirm in step 4) |
| Frontend | Static HTML pages + plain CSS + vanilla JavaScript, talking to the Express API with `fetch` |
| CSS | Plain CSS, no framework |
| Films | Typed in by hand, no movie API |
| Fields | Title, release year, genre, notes |
| Watched | One-way: a film can be marked watched, not set back |
| Rating | 1–5 stars, always possible (watched or not) |
| Review | Optional short text, max 300 characters, always possible |
| Sorting | Watched list only: by rating or release year, ascending or descending |
| Duplicates | Blocked when title (ignoring case) and release year are the same |
| Example data | Seed script with 5–6 example films |
| Edit / delete | Yes |
| Pages | To-watch list, Watched list, Add/Edit film form, Film detail. No About page |
| Language | English |
| Git | Local git, commits by the team. A shared remote is added before hosting and submission |
| Hosting | Required; Render (free, suggested by the professor). Details decided later, see Phase 6 |
| Not in scope | 19/20 challenge (accounts, roles, private data, uploads) |

## Data model
Table `films`:
| Column | Type | Rules |
|--------|------|-------|
| `id` | INTEGER, primary key | auto |
| `title` | TEXT | required, 1–100 characters, trimmed |
| `release_year` | INTEGER | required, 1888 to current year + 5 |
| `genre` | TEXT | optional, max 50 characters |
| `notes` | TEXT | optional, max 500 characters |
| `watched` | INTEGER (0/1) | default 0, can only change 0 → 1 |
| `rating` | INTEGER | empty or 1–5 |
| `review` | TEXT | optional, max 300 characters |
| `created_at` | TEXT | set on insert |

Unique check: same `LOWER(title)` and `release_year` → error "This film is already on your list."

## API
| Method | Path | Purpose | Errors |
|--------|------|---------|--------|
| GET | `/api/films?watched=0\|1&sort=rating\|year&order=asc\|desc` | List films | 400 for invalid sort/order |
| GET | `/api/films/:id` | One film | 404 |
| POST | `/api/films` | Add film | 400 validation, 409 duplicate |
| PUT | `/api/films/:id` | Edit title, year, genre, notes | 400, 404, 409 |
| PATCH | `/api/films/:id/watched` | Mark as watched | 404 |
| PATCH | `/api/films/:id/rating` | Set rating and review | 400, 404 |
| DELETE | `/api/films/:id` | Delete film | 404 |

Validation errors come back as `{ "errors": { "field": "message" } }` so the form can show each message next to its field. The same rules run in the browser (instant feedback) and on the server (the real protection).

## Pages
1. **To-watch** (`index.html`): unwatched films, newest first, "Mark as watched" button, link to detail.
2. **Watched** (`watched.html`): watched films with stars, sort controls (rating / release year, ascending / descending).
3. **Add / Edit film** (`film-form.html`, `?id=` for edit): form with inline error messages.
4. **Film detail** (`film.html?id=`): all fields, star rating, review form, Edit, Delete, Mark as watched.

All pages share one navigation bar and one stylesheet.

## Planned folder structure
```
movie-watchlist/
├── server.js            Express app, static files, routes
├── db.js                SQLite connection and table setup
├── seed.js              Example films
├── validation.js        Shared rules for film and rating data
├── routes/films.js      /api/films endpoints
├── public/
│   ├── index.html  watched.html  film-form.html  film.html
│   ├── css/style.css
│   └── js/ api.js  validation.js  to-watch.js  watched.js  film-form.js  film.js  stars.js
├── data/                SQLite file (not in git)
├── docs/                plan.md, skills-and-plugins.md
├── CLAUDE.md
└── README.md
```

## Steps
Each row is one commit. Suggested skills in brackets.

### Phase 0 – Setup (week of 2 Nov)
| # | Step | Who | Skills |
|---|------|-----|--------|
| 1 | `git init`, `.gitignore` (node_modules, data/*.db, .env), short README stub | | |
| 2 | `npm init`, install Express, `server.js` answering "Hello" on `PORT` or 3000, `npm start` | | ecc:backend-patterns |
| 3 | Serve `public/` as static files with a placeholder `index.html` | | |

### Phase 1 – Database (week of 2 Nov)
| # | Step | Who | Skills |
|---|------|-----|--------|
| 4 | Install the SQLite library, `db.js` creates the `films` table on start | | ecc:backend-patterns |
| 5 | `seed.js` with 5–6 example films, `npm run seed` | | |

### Phase 2 – API (week of 9 Nov)
| # | Step | Who | Skills |
|---|------|-----|--------|
| 6 | `GET /api/films` returns all films | | ecc:api-design |
| 7 | `GET /api/films/:id` with 404 | | |
| 8 | `validation.js`: rules for title, year, genre, notes | | |
| 9 | `POST /api/films` with validation errors (400) | | |
| 10 | Duplicate check on POST (409) | | |
| 11 | `PUT /api/films/:id` reusing validation and duplicate check | | |
| 12 | `PATCH /api/films/:id/watched` (one-way) | | |
| 13 | Rating and review rules + `PATCH /api/films/:id/rating` | | |
| 14 | `DELETE /api/films/:id` | | |
| 15 | Filter `watched` and sorting `sort`/`order` on the list, only allowed values | | |
| 16 | Error handler: unknown API routes → 404 JSON, server errors → 500 JSON | | superpowers:systematic-debugging if needed |

### Phase 3 – Layout and styling (week of 16 Nov)
| # | Step | Who | Skills |
|---|------|-----|--------|
| 17 | Four HTML pages with shared header and navigation, no data yet | | frontend-design:frontend-design |
| 18 | Base CSS: colors as variables, typography, page layout, navigation | | frontend-design:frontend-design |
| 19 | Film card and form styles | | frontend-design:frontend-design |
| 20 | Responsive CSS for phone widths (navigation, cards, forms) | | frontend-design:frontend-design |
| 21 | `js/api.js`: one `fetch` helper with error handling | | |

### Phase 4 – Pages with data (weeks of 23 and 30 Nov)
| # | Step | Who | Skills |
|---|------|-----|--------|
| 22 | To-watch page lists unwatched films | | |
| 23 | "Mark as watched" button on the To-watch page | | |
| 24 | Watched page lists watched films with stars | | |
| 25 | Sort controls on the Watched page | | |
| 26 | Film detail page shows one film, "not found" message for a bad id | | |
| 27 | `js/stars.js`: clickable 1–5 star rating on the detail page | | |
| 28 | Review form with character counter (max 300) and validation | | |
| 29 | Add film form with browser validation (`js/validation.js`) | | |
| 30 | Show server errors (400, 409) next to the form fields | | |
| 31 | Edit mode of the form (`?id=`), prefilled | | |
| 32 | Delete button with confirmation, then back to the list | | |
| 33 | Empty states, loading and error messages on every page | | |

### Phase 5 – Quality and README (week of 7 Dec)
| # | Step | Who | Skills |
|---|------|-----|--------|
| 34 | UI check: responsiveness, form errors, accessibility (labels, focus, error announcements); one commit per fix | | web-design-guidelines |
| 35 | Run the app and test every page at laptop and phone size | | run, superpowers:verification-before-completion |
| 36 | Bug review and security review (input validation, SQL injection); one commit per fix | | code-review (report only), security-review |
| 37 | Full README: what the app does, how to install, seed and run, folder structure, API | | anthropic-skills:humanizer |

### Phase 6 – Hosting (by 11 Dec, details later)
| # | Step | Who | Skills |
|---|------|-----|--------|
| 38 | Decide how data persists on Render (see note below) and add a shared git remote | | |
| 39 | Deploy to Render, check that data survives a restart | | run |
| 40 | Add the live URL to the README | | |

**Note for Phase 6:** as far as I know, Render's free web services have no persistent disk, so a SQLite file is reset on every redeploy or restart. That would break the "data persists after a restart" requirement on the hosted version. Options to check together then: a Render persistent disk (paid), Render's free PostgreSQL (has an expiry limit), or asking the professor how they expect SQLite to persist. Verify Render's current limits before deciding.

### Buffer
Week of 14 Dec: buffer for fixes, final check against the course requirements, submission.

## Requirements checklist
| Requirement | Covered by |
|-------------|------------|
| HTML/CSS/JS + course framework | Express backend, static HTML/CSS/JS frontend |
| Data persists after refresh and restart | SQLite (steps 4–16), hosting check (step 39) |
| 4+ pages with navigation | Steps 17, 22–33 |
| Validated forms with clear errors | Steps 8–13, 28–30 |
| Responsive laptop and phone | Steps 20, 34–35 |
| Commits from both members | One commit per step, owners in "Who" |
| README | Steps 1, 37, 40 |
| Add films | Steps 9, 29 |
| Mark as watched | Steps 12, 23 |
| 1–5 rating and short review | Steps 13, 27–28 |
| Sort by rating or date | Steps 15, 25 |
| Both can explain all code | Walkthrough after each phase |
