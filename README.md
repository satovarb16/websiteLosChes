# Los Ches — Landing Page

Landing page for **Los Ches**, a restaurant specializing in wood-fired cuts and Peruvian-Argentine fusion. Built to present the restaurant, build trust through the menu and gallery, and convert visits into reservations via WhatsApp.

## Tech Stack

- [Astro](https://astro.build) — static site generator
- Vanilla CSS with custom properties
- No JavaScript frameworks

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

## Available Scripts

| Command              | Action                                       |
| -------------------- | -------------------------------------------- |
| `npm run dev`        | Start local dev server at `localhost:4321`   |
| `npm run build`      | Build for production into `dist/`            |
| `npm run preview`    | Preview the production build locally         |

## Project Structure

```
src/
├── pages/
│   ├── index.astro       # Main landing page (monolithic — all sections)
│   ├── privacidad.astro
│   └── terminos.astro
└── styles/
    └── global.css        # Design tokens, base styles, component CSS
public/
└── images/               # Photography and assets
```

## Deployment

Deployed on [Cloudflare Pages](https://pages.cloudflare.com). Every push to `main` triggers an automatic deployment.

Live: https://websitelosches.pages.dev
