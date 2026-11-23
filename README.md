# Amrita Computational Text Analysis Lab (`AmritaCTALab`)

Official GitHub Pages website for the **Amrita Computational Text Analysis Lab (AmritaCTALab)** at the School of Computing, Amrita Vishwa Vidyapeetham, Amritapuri, Kollam, Kerala, India.

Built with **Astro 6** and **Tailwind CSS v4**, inspired by [`bchcohenlab/lab-website-template`](https://github.com/bchcohenlab/lab-website-template) and customized with an Amrita crimson visual identity, an animated end-to-end NLP & Language Intelligence pipeline, BibTeX citation copying, and full Markdown content collections.

## Local Development

```bash
npm install
npm run dev
```

## Production Build & Type Check

```bash
npm run check
npm run build
npm run preview
```

## Content Structure

- `src/data/site.ts` — Lab identity, mission/vision, active projects, teaching courses, join tracks, and contact details.
- `src/content/people/*.md` — Lab Director, Research Interns, International Collaborators, and Alumni profiles (with local headshots in `src/assets/people/`).
- `src/content/publications/*.md` — Peer-reviewed journal articles, book chapters, and edited books (auto-linked to team member profiles and filterable by type, research area, and keyword).

## GitHub Pages Deployment

Push to `main` to deploy automatically via `.github/workflows/deploy.yml`:

1. In GitHub repository settings, go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. The site will publish to `https://amritactalab.github.io/ctalab-website/`.

> **Using a custom domain later?** Update `site` in `astro.config.mjs`, remove `base`, and add your domain to `public/CNAME`.
