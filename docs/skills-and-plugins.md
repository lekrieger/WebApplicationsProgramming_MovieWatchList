# Movie Watch List – Skills & Plugins

Project 6, Web Applications Programming seminar (Romanian-American University).
Team: Leon, Dennis. Agreed on 2026-10-26.

**Rule:** `superpowers` drives the workflow. `ecc` only supplies framework and backend knowledge.
They never both run planning or code review. Always call skills by their full name (see "Name clashes").

## Skills we use

### Planning and workflow (`superpowers`)
| Skill | Used for |
|-------|----------|
| `superpowers:brainstorming` | Clarifying a feature before planning it |
| `superpowers:writing-plans` | Writing the implementation plan |
| `superpowers:executing-plans` | Working through the plan step by step |
| `superpowers:systematic-debugging` | Finding the cause of bugs |
| `superpowers:verification-before-completion` | Checking that something really works before calling it done |
| `superpowers:requesting-code-review` | Asking for a review of finished work |
| `superpowers:receiving-code-review` | Handling review feedback |

### Design
| Skill | Used for |
|-------|----------|
| `frontend-design:frontend-design` | Building the views and the responsive layout |
| `web-design-guidelines` | Checking the UI: responsiveness, form errors, accessibility |

### Review and quality (built-in)
| Skill | Used for |
|-------|----------|
| `code-review` (built-in) | Bug review, **report only**, never with `--fix` |
| `security-review` (built-in) | Input validation and injection checks on forms and the backend |

### Running the app
| Skill | Used for |
|-------|----------|
| `run` | Starting the app and checking it at laptop and phone sizes |

### Understanding the code
| Skill | Used for |
|-------|----------|
| `anthropic-skills:learn` | Explaining any part of the code so both of us can explain it in the exam |
| `ecc:code-tour` | Guided walkthroughs of the codebase |

### Docs and setup
| Skill | Used for |
|-------|----------|
| `anthropic-skills:humanizer` | Making the README text read naturally |
| `init` | Creating a CLAUDE.md with the course rules |

### Framework-specific (`ecc`)
Stack: Node.js + Express, SQLite, static HTML + plain CSS + vanilla JavaScript.
| Skill | Used for |
|-------|----------|
| `ecc:backend-patterns` | Structuring the Express server and database code |
| `ecc:api-design` | Designing the `/api/films` endpoints and error responses |

## Turned off for this project
| Plugin / skill | Why |
|----------------|-----|
| `ponytail` (all) | "Minimal code, full level" works against what the course grades: 4 views, validation with clear errors, README |
| Other design skills: `design-taste-frontend`, `design-taste-frontend-v1`, `gpt-taste`, `high-end-visual-design`, `industrial-brutalist-ui`, `minimalist-ui`, `ui-ux-pro-max`, `image-to-code`, `imagegen-frontend-*`, `brandkit`, `redesign-existing-projects`, `stitch-design-taste`, `ecc` design/taste/motion skills | Each pulls the design in a different direction; `frontend-design` is the only one |

## Not used
- Git skills: `ecc:git-workflow`, `ecc:github-ops`, `ecc:prp-commit`, `ecc:prp-pr`, `superpowers:finishing-a-development-branch`, `superpowers:using-git-worktrees`
- `superpowers:test-driven-development` and `ecc` TDD skills: tests aren't required, and strict TDD adds a lot of code to explain
- `superpowers:subagent-driven-development`, `superpowers:dispatching-parallel-agents`: we have to be able to explain every line ourselves
- `ecc` workflow commands: `plan`, `prp-*`, `feature-dev`, `orch-*`, `multi-*`, `gan-*`, `loop-*`, `santa-loop`, `epic-*`
- `ecc` skills unrelated to this project (healthcare, crypto, networking, ML, logistics, marketing, other languages, and so on)
- `simplify`: it edits code automatically
- `anthropic-skills:docs`, `docx`, `pptx`, `xlsx`, `pdf`, `dataviz`, `deep-research`: the README has to be a real Markdown file in the repo
- `chrome-browser`, `built-in-browser`, `ecc:browser-qa`, `ecc:e2e-testing`: `run` covers this
- `ecc` chrome-devtools MCP: fails to connect

## Name clashes
These names exist twice. Always use the full name:
| Name | We use | Not |
|------|--------|-----|
| `learn` | `anthropic-skills:learn` (teaches concepts) | `ecc:learn` (records "instincts") |
| `code-review` | built-in `code-review` | `ecc:code-review` |
| `security-review` | built-in `security-review` | `ecc:security-review` |
| `deep-research` | not used | both |

## Still to check
- `ecc` ships hooks and rules that run automatically. Check what they do before work starts, and turn off the ones that conflict with the setup above.
