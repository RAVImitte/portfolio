# Ravi Shankar Mitte — portfolio

Newsprint editorial site. Multi-page. The work is explained here; GitHub and Hugging Face are source links at the bottom of a case study.

## Run

Needs Node 22+.

```bash
npm install
npm run dev
```

Open http://localhost:5173

```bash
npm run build
npm run preview
```

## Deploy

Static output is `dist/`. Drop it on Netlify, Vercel, or GitHub Pages.

- Netlify / Vercel: connect the repo, build command `npm run build`, publish `dist`
- GitHub Pages: set Vite `base` if the site is not at the domain root

Resumes download from `/resumes/backend.pdf` and `/resumes/android.pdf`.
