# Haithem El-Metoui · Portfolio v2

Personal portfolio of **Haithem El-Metoui**, Java & Spring Boot backend engineer working on banking and fintech platforms (Backbase, Keycloak, T24, ActiveMQ) and Certified Kubernetes Administrator.

**Live site:** https://haithemelmetoui.github.io/haithem-portfolio-v2/

The site is a dark, cyberpunk-inspired single page. The hero is a real-time 3D "banking core": a wireframe core with the systems Haithem integrates in production (Spring Boot, Keycloak, Backbase, T24, ActiveMQ, Kubernetes, PostgreSQL) orbiting it, and data packets travelling along the links like requests and messages in a microservices mesh. Everything below the hero is plain, fast, readable content for recruiters.

## Sections

Hero · About · Experience · Technical skills · Selected projects · Certifications · Education · Technology stack (`stack.yml` terminal) · Languages · Contact · CV download (English and French) · LinkedIn and GitHub links.

## Tech stack

| Area | Choice |
| --- | --- |
| UI | React 19 |
| Build | Vite |
| 3D | Three.js via React Three Fiber |
| Motion | Framer Motion (one hero sequence, quiet section fades) |
| Smooth scrolling | Lenis |
| Styling | Hand-written CSS with design tokens; no CSS framework |
| Fonts | Chakra Petch, IBM Plex Sans, IBM Plex Mono (Google Fonts) |
| Hosting | GitHub Pages, deployed by GitHub Actions |

## Performance and accessibility

- The 3D scene is a lazily loaded chunk; three.js is never on the critical path.
- The render loop pauses when the hero is scrolled out of view.
- Phones, small screens and low-core/low-memory devices get a lighter scene (fewer particles, lower pixel ratio, no antialiasing).
- `prefers-reduced-motion` or missing WebGL swaps the scene for a static SVG of the same network and disables smooth scrolling and animations.
- Keyboard focus is visible everywhere; there is a skip link and semantic landmarks.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:5173/haithem-portfolio-v2/
```

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # serves dist/ locally
```

The site is built for the `/haithem-portfolio-v2/` sub-path used by GitHub Pages. To deploy at the root of a domain instead (for example a custom domain), build with:

```bash
BASE_PATH=/ npm run build
```

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which installs dependencies, builds the site and publishes `dist/` to GitHub Pages. In the repository settings, **Pages → Build and deployment → Source** must be set to **GitHub Actions** (one-time setup).

## Editing content

All text lives in [`src/data.js`](src/data.js): profile, experience, skills, projects, certifications, education and languages. CVs are in `public/cv/`, project screenshots in `public/projects/`.

## Repository layout

```
public/
  cv/                 English and French CVs (PDF)
  projects/           Project screenshots (WebP)
src/
  components/
    CoreScene.jsx     3D hero scene (React Three Fiber)
    Hero.jsx          Hero copy, CTAs and scene/fallback selection
    Nav.jsx           Top bar with active-section tracking and mobile menu
    Reveal.jsx        Once-only fade-in wrapper
    Icons.jsx         Inline SVG icons
  App.jsx             Page sections
  data.js             All portfolio content
  styles.css          Design tokens and styles
.github/workflows/
  deploy.yml          Build and deploy to GitHub Pages
```

No secrets, tokens or environment variables are needed to build or deploy this site.

## Contact

- Email: elmetoui.haithem@gmail.com
- LinkedIn: https://www.linkedin.com/in/haithem-el-metoui-1ab068224/
- GitHub: https://github.com/haithemelmetoui
