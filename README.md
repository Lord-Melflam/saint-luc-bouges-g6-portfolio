# Saint-Luc Bouges G6 Portfolio Website

Interactive project portfolio for the 13-week Health Innovation journey (Group 6), combining:
- weekly progression tracking,
- sub-problem streams (Upstream / During / Downstream),
- filterable deliverables,
- annex pointers aligned with formal submission expectations.

## Objectives

1. Keep project traceability from **Week 1 to Week 13**.
2. Provide a **clear web navigation layer** for team collaboration.
3. Preserve a **formal portfolio structure** (summary + numbered annexes).
4. Support iterative updates without moving/removing original files in `2.Weeks`.

## Site map

- `index.html` - project overview
- `summary.html` - concise project summary (submission-style narrative)
- `weeks.html` - W1-W13 tracker with progress filters
- `annexes.html` - annex library with week/type/search filters
- `upstream.html` - upstream stream
- `during.html` - during stream
- `downstream.html` - downstream stream (includes SCAMPER-based ideation)
- `deliverables.html` - deliverables matrix with filters
- `references.html` - methods and course references (week + title style)

## Data and filtering

- `assets/data.js` holds:
  - weekly progress data,
  - deliverables metadata.
- `assets/annexes.js` holds annex metadata generated from manifest.
- `assets/site.js` renders:
  - active navigation state,
  - weeks filtering,
  - deliverables filtering,
  - annexes filtering.

## Annex pipeline

The annex system is pointer-oriented and non-destructive:
- originals remain in their source folders (e.g. `2.Weeks/...`),
- selected files are mirrored into `annexes/` for clean web links.
- personal processing files (e.g. intermediate `.tex` authoring files) are intentionally excluded from annexes/deliverables unless explicitly marked in the manifest.

Files:
- `annexes_manifest.tsv` - annex source of truth
- `sync_annexes.sh` - mirrors files and regenerates `assets/annexes.js`
- `publish_github_pages.sh` - runs annex sync, commits, pushes, and configures Pages

### Annex types currently used
- `deliverable`
- `notes`
- `cm` (Course Material)
- `visit` (Saint-Luc visit media/notes)
- `prototype`

## Local workflow

```bash
cd 6.Experiments/portfolio
bash sync_annexes.sh
```

Then open `index.html` in your browser.

## Publish workflow

```bash
cd 6.Experiments/portfolio
chmod +x publish_github_pages.sh
./publish_github_pages.sh Lord-Melflam saint-luc-bouges-g6-portfolio /
```

Default URL:
`https://lord-melflam.github.io/saint-luc-bouges-g6-portfolio/`

## Downstream integration note (Maurine feedback)

The downstream stream now follows this challenge:

> How might we organize an intermediate solution after discharge so that patients can be relocated quickly, allowing rooms to be freed earlier while maintaining quality and continuity of care?

It is structured with a SCAMPER exploration (Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, Reverse), translated and integrated in `downstream.html`.

## Contribution guideline

When adding/updating content:
1. Update stream pages (`upstream.html`, `during.html`, `downstream.html`) with concise validated content.
2. Update `assets/data.js` for progress and deliverable status.
3. Update `annexes_manifest.tsv` for new annex pointers.
4. Run `sync_annexes.sh`.
5. Publish with `publish_github_pages.sh`.
