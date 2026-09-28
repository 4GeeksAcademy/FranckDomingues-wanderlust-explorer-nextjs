# Wanderlust Explorer

A travel exploration project built with Next.js, React, TypeScript, and Tailwind CSS. This repository is currently initialized with a minimal application foundation; Wanderlust Explorer features and UI have not yet been implemented.

## Tech stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS v4
- ESLint
- npm

## Getting started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Available scripts

```bash
npm run dev        # Start the development server
npm run lint       # Run ESLint
npm run typecheck  # Check TypeScript types
npm run build      # Build for production
npm start          # Start the production server
```

## Source layout

```text
src/
├── app/
├── components/
├── data/
├── hooks/
└── types/
```

See [SPECS.md](./SPECS.md) for the current project scope and foundation details.

## Design References

These travel and discovery references informed general principles only; Wanderlust Explorer will have its own visual identity:

- [Airbnb Experiences](https://www.airbnb.com/s/experiences) — studied category-led browsing and editorial activity imagery; informs scannable discovery and strong sense of place.
- [GetYourGuide](https://www.getyourguide.com/) — studied search-first discovery and refinement patterns; informs making future search and filters easy to locate.
- [National Geographic Expeditions](https://www.nationalgeographic.com/expeditions/) — studied destination storytelling and landscape hierarchy; informs contextual, destination-led presentation.

The intended direction is calm and editorial: warm off-white surfaces, dark text with restrained evergreen accents, generous spacing, clear type hierarchy, rounded-but-subtle cards, and useful large images. Navigation stays clear, future filters adapt to mobile, and layouts prioritize content across screen sizes rather than simply shrinking desktop UI. See `SPECS.md` for architecture and the scope boundary.

## Data validation

The current deterministic local collection contains 100 experience records and can be checked with:

```bash
npm run validate:data
```

See [SPECS.md](./SPECS.md) for the official assignment requirements matrix and current completion status.
