# Saint-Luc Bouges G6 Portfolio Website

This folder contains the interactive project portfolio website.

## Pages
- `index.html` - overview
- `summary.html` - compact submission-style narrative (2-page style)
- `weeks.html` - weekly tracker (W1-W13) with filters
- `annexes.html` - annex library with week/type/search filters
- `upstream.html` - Francois stream
- `during.html` - Jabrane stream
- `downstream.html` - Maurine stream
- `deliverables.html` - consolidated artifact tracker with week/stream/status filters
- `references.html` - methods and source materials

## Annex pipeline
- `annexes_manifest.tsv` - source-of-truth list of annexes to mirror
- `sync_annexes.sh` - copies annexes from weekly folders into `annexes/` and regenerates `assets/annexes.js`
- `publish_github_pages.sh` - now runs annex sync automatically before commit/push

## Local use
Open `index.html` in a browser.

To refresh annexes manually:
```bash
cd 6.Experiments/portfolio
bash sync_annexes.sh
```

## Publish to GitHub Pages
```bash
cd 6.Experiments/portfolio
chmod +x publish_github_pages.sh
./publish_github_pages.sh Lord-Melflam saint-luc-bouges-g6-portfolio /
```

Default URL:
`https://lord-melflam.github.io/saint-luc-bouges-g6-portfolio/`
