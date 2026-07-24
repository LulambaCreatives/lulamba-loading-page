# Lulamba Creatives — asset split

This commit splits the single `index.html` into separate assets for easier maintenance and performance.

What changed
- `index.html` (now references external CSS and JS in `assets/`)
- `assets/css/style.css` (styles moved here)
- `assets/js/main.js` (scripts moved here)

Logo optimization
- A `assets/img/logo-256.webp` path is referenced from `index.html` as a preferred webp source.
- I did not replace the original `logo.png` — it remains as a fallback. Please add `assets/img/logo-256.webp` to the branch if you'd like the WebP binary included; many local tools (imagemagick, Squoosh, or online converters) can create it from `logo.png`.

Preview locally
1. Clone the repo and switch to branch `redesign/split-assets-optimize-logo`.
2. Run a static server in the repo root (recommended):

```bash
python -m http.server 8000
# or
npx serve .
```

3. Open http://localhost:8000/index.html

If you want, I can add the `logo-256.webp` binary for you — grant me the go-ahead and I will add a generated WebP file (quality 75, 256px wide) to `assets/img/logo-256.webp` on this branch.
