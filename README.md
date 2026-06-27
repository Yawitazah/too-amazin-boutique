# Too Amazin Boutique — Website

A single-page website for **Too Amazin Boutique**, a jewelry, sunglasses & accessories boutique and shared pop-up retail space in Rock Hill, SC.

- **Address:** 2310 Ebenezer Road, Rock Hill, SC 29732
- **Owner:** Shanae Jeffries

## Run locally

It's a plain static site — no build step. Just open `index.html`, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Structure

```
too-amazin-boutique/
├── index.html      # all page sections (home, about, space/rates, products, vendors, visit)
├── styles.css      # all styling
├── script.js       # hero slider, mobile nav, scroll reveal, contact form
└── images/         # web-optimized, auto-oriented photos
```

## ⚠️ Placeholders to confirm before going live

Search the code for `NOTE TO OWNER`. Items to fill in:

- **Pop-up space rates** (`index.html`, Pop-Up Space section) — currently sample pricing: $45/day, $200/week, $650/month.
- **Hours of operation** (Visit section).
- **Phone number** (Visit section, currently `(XXX) XXX-XXXX`).
- **Instagram / Facebook links** (Visit + footer).
- **Contact form** — needs a backend to actually send (e.g. Netlify Forms or Formspree). Right now it only shows a thank-you message.

## Deploy

Works on any static host — GitHub Pages, Netlify, or Vercel. Drag-and-drop the folder, or connect the repo.
