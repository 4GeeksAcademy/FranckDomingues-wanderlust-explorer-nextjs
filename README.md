# Wanderlust Explorer

A responsive travel-discovery app for browsing a curated collection of 100 local experiences. Search by title, filter by category and destination, open experience details, and save favorites across the app.

## Technology

Next.js App Router, React 19, TypeScript, Tailwind CSS v4, ESLint, and npm. Experience data is local and deterministic; favorites use shared in-memory React state and reset on a full refresh.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Useful checks: `npm run validate:data`, `npm run lint`, `npm run typecheck`, and `npm run build`.

## Routes and interactions

- `/` — introduction and link to experience discovery.
- `/experiences` — browse all experiences; title search uses case-insensitive regular expressions, and category and destination filters can be combined and shared in the URL.
- `/experiences/[id]` — experience details and a favorite action; unknown IDs show not found.
- `/favorites` — shared saved experiences.
- `/profile` — simulated profile with the shared favorites count.

The navigation shows the active route and favorites count. Search, filters, cards, and favorite controls are keyboard-labeled and responsive. Favorites are not persisted across a full-page refresh.

## Design references

These references informed general discovery and visual principles rather than being reproduced as templates:

- [Airbnb Experiences](https://www.airbnb.com/s/experiences) — category-led browsing and editorial activity imagery.
- [GetYourGuide](https://www.getyourguide.com/) — search-first discovery and refinement patterns.
- [National Geographic Expeditions](https://www.nationalgeographic.com/expeditions/) — destination storytelling and landscape hierarchy.

The visual direction is calm and editorial, with warm surfaces, evergreen accents, clear hierarchy, and destination-led imagery.

## QA and evidence

Responsive screenshots, the source evidence notes, manifest, and final QA report are in [`docs/qa/`](./docs/qa/). The report distinguishes code/HTTP checks, the coding environment’s browser limitations, and completed human visual review. See [`SPECS.md`](./SPECS.md) for the implementation contract and 36-item requirements matrix.
