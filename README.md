# Los Ches — Landing Page

Landing page for **Los Ches**, a restaurant specializing in wood-fired cuts and Peruvian-Argentine fusion. Built to present the restaurant, build trust through the menu and gallery, and convert visits into reservations via WhatsApp.

**Live:** https://www.losches.com

## Tech Stack

- [Astro](https://astro.build) — static site generator
- Vanilla CSS with custom properties
- No JavaScript frameworks
- Astro image optimization (`astro:assets`) — WebP + responsive `srcset`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser (Astro picks the next free port if 4321 is taken).

## Available Scripts

| Command              | Action                                       |
| -------------------- | -------------------------------------------- |
| `npm run dev`        | Start local dev server at `localhost:4321`   |
| `npm run build`      | Build for production into `dist/`            |
| `npm run preview`    | Preview the production build locally         |

## Project Structure

```
src/
├── assets/
│   └── images/           # Content images — optimized by Astro at build (WebP + srcset)
├── pages/
│   ├── index.astro       # Main landing page (monolithic — all sections)
│   ├── privacidad.astro
│   └── terminos.astro
└── styles/
    └── global.css        # Design tokens, base styles, component CSS
public/
└── images/               # Unprocessed assets: og:image (hero.png), CSS background (gallery-fire.jpg)
```

## Images

Content images live in `src/assets/images/` and are rendered with Astro's `<Image>`
component, importing the file as a module:

```astro
---
import { Image } from 'astro:assets';
import angus from '../assets/images/gallery-angus.png';
---
<Image src={angus} widths={[400, 800]} sizes="(max-width: 768px) 100vw, 800px" format="webp" quality={82} />
```

Astro converts them to WebP and generates a responsive `srcset` at build time.

**Conventions:**

- New images go in `src/assets/images/` (**not** `public/`). Images in `public/` are
  served raw and are **not** optimized.
- Use `<Image src={imported} />` with an `import`, never a string path.
- If you rename an image file, update its `import` accordingly or the build breaks.
- `public/images/` is reserved for assets that can't go through the pipeline: the
  `og:image`/`twitter:image` social preview (`hero.png`, needs a stable public URL) and
  the CSS background (`gallery-fire.jpg`).

## Deployment

Deployed on [Cloudflare Pages](https://pages.cloudflare.com). Every push to `main`
triggers an automatic deployment.

The site is served from the custom domain **https://www.losches.com**, registered through
Cloudflare with automatic SSL. DNS is managed by Cloudflare; the apex `losches.com`
redirects to the `www` host. The original `*.pages.dev` URL remains available as a fallback.
