# Wanderlust Explorer — Technical Project Contract

## Project objective

Wanderlust Explorer is a travel discovery application intended to help people explore curated travel experiences, find destinations through search and filters, open an experience detail route, save favorites, and visit a lightweight profile area. This block establishes architecture, deterministic local data, and route shells. The provided assignment material in the workspace does not include the official external assignment document; details beyond the explicit requirements supplied in the project brief are recorded as decisions or open points below rather than treated as authoritative.

## Design discovery and visual direction

References were reviewed as sources of general interaction principles, not templates to reproduce:

- **Airbnb Experiences** — <https://www.airbnb.com/s/experiences>. Studied activity discovery, category-led browsing, and editorial photography. Influence: clear experience titles, strong place imagery, and scannable discovery entry points.
- **GetYourGuide** — <https://www.getyourguide.com/>. Selected as a search-first trip discovery reference for experience summaries and refinement patterns. Influence: make search and category/destination refinement easy to find when those controls are implemented. Its public page was not fully inspectable during this block, so revisit it during visual design before treating any specific pattern as verified.
- **National Geographic Expeditions** — <https://www.nationalgeographic.com/expeditions/>. Studied destination storytelling, landscape imagery, and visual hierarchy. Influence: favor sense of place and useful context over dense promotional decoration.

**Wanderlust direction:** calm, welcoming, editorial travel discovery; warm off-white canvas with dark ink and restrained evergreen accents; generous consistent spacing; clear heading/body hierarchy; rounded but not overly pill-shaped cards; large, destination-led image crops with meaningful alt text; compact persistent navigation; filters that can become a clear toolbar or mobile disclosure; responsive layouts that preserve content priority rather than merely shrink desktop UI. These are guiding principles, not a final design system.

## Technical foundation

- Next.js App Router, React, strict TypeScript, Tailwind CSS v4, ESLint, and npm.
- Source code lives under `/src`.
- No component library is required or introduced.
- The current local collection is deterministic and has no runtime external travel API dependency.

## Routes

- `/` — concise introduction and route into discovery; currently a shell, not the final home sections.
- `/experiences` — future searchable/filterable collection. It will own URL-synchronized discovery criteria when implemented; currently a route shell.
- `/experiences/[id]` — dynamic experience detail route. The `id` is intended to resolve against `src/data/experiences.ts`; current page demonstrates receipt of the route parameter and does not pretend to load final detail content.
- `/favorites` — future view of experiences selected in React state; currently explains the state/persistence boundary.
- `/profile` — lightweight profile route shell. No authentication or account service is implied.

## Architecture and rendering boundaries

- `src/app` — route segments, layouts, metadata, and global styles. Keep route shells and static content as Server Components by default.
- `src/components` — shared presentation primitives. `Navbar`, `PageContainer`, and `RoutePlaceholder` are currently Server Components. Future interactive filters, favorite toggles, or state provider boundaries should be small Client Components (`"use client"`) only where browser interaction is required.
- `src/data` — local typed data and development validation; no runtime network calls.
- `src/hooks` — reusable hooks only when a real state or browser lifecycle concern is implemented; currently no artificial hook exists.
- `src/types` — canonical shared domain contracts, including `Experience`.

No root-level `"use client"` boundary should be added merely for convenience. Shared React favorites state can be placed in a narrow client provider around the routes needing it, with server-rendered layout/presentation retained where possible.

## Canonical experience model

`src/types/experience.ts` is the one authoritative definition. The `Experience` contract is:

| Field | Type | Purpose |
| --- | --- | --- |
| `id` | `string` | Stable unique slug for detail route and favorites identity. |
| `title` | `string` | Human-readable activity name. |
| `category` | `ExperienceCategory` | Supported discovery category union. |
| `destination` | `string` | Display location in `City, Country` form. |
| `price` | `number` | Estimated per-person whole USD amount. |
| `rating` | `number` | Editorial score on a 1–5 scale. |
| `description` | `string` | Useful concise experience summary. |
| `image` | `string` | Stable direct HTTPS image URL. |
| `imageAlt` | `string` | Accessible description for the image. |
| `durationHours` | `number` | Typical activity duration. |

Categories are the literal union `Adventure | Culture | Food | Nature | Relaxation`. If the external assignment dictates a different schema, this contract must be reconciled before feature work; no additional fields are presumed mandatory here.

## Dataset and integrity

- `src/data/experiences.ts` exports exactly 100 deterministic local records, as required by the supplied project instructions.
- IDs are intended to be unique slugs. Records use supported categories, varied destinations, positive prices/durations, 1–5 ratings, descriptive copy, and direct image references with alt text.
- Data is curated in source; the application does not fetch a travel API at runtime.
- `npm run validate:data` checks exact count, ID uniqueness, non-empty required strings, supported categories, numeric bounds, and practical HTTPS image URL structure.
- Images currently reference Unsplash image assets directly. This avoids runtime API integration; availability and licensing should be reviewed before production use.

## State ownership and favorites contract

- Interactive discovery state should live at the narrowest shared React boundary needed by the route and controls. Use React state; do not add Redux or Zustand.
- Favorites are represented as an array/set of canonical experience ID strings, owned by a React client provider or page-level state once favorites are implemented. Toggle means add an absent ID or remove a present ID, without mutating prior state.
- Pass favorite IDs/count and toggle callbacks through typed props to interactive consumers. Navbar currently offers an optional typed `favoriteCount` prop; it renders no fabricated value when not supplied.
- The navbar count reflects selected IDs (ideally only currently known dataset IDs). `/favorites` derives its list from those IDs and the canonical dataset.
- No persistence is specified by the provided assignment text: state is expected to reset after refresh. Do not add localStorage unless official requirements explicitly change this contract.

## Search contract

Search must use regex matching equivalent to `new RegExp(term, "i")`, tested against intended searchable experience fields. Guard construction and matching with `try/catch`; malformed patterns should be caught and surfaced as a validation state or treated as no match, never crash rendering. Whether user input is intended as raw regular-expression syntax or literal text escaped before construction is unclear without the official assignment. Confirm before implementation; either choice must preserve case-insensitive regex matching and safe error handling.

## Filters and URL contract

Canonical `/experiences` query keys are:

- `search` — search term
- `category` — one `ExperienceCategory`
- `destination` — selected destination display string

Compose active search, category, and destination constraints with logical AND; each unset constraint is a no-op. Reset clears all three and returns the URL to `/experiences` without empty/default parameters. Hydrate selected filters from `searchParams` on initial route render; synchronize user-selected state back to these same keys using Next navigation/history patterns so refresh and shared URLs reproduce the selection. Do not introduce alternate aliases such as `q`, `city`, or `type`.

## Hooks

- `useState` is appropriate for client-owned favorites and local control state when implemented.
- `useEffect` is only appropriate for real browser synchronization/lifecycle behavior not naturally handled by server props or URL navigation. Do not use it to mirror derived values without need.
- Add custom hooks in `src/hooks` only for reusable, meaningful logic (for example, a favorites context consumer or URL filter controller); the directory can remain empty until required.

## Responsive behavior

- **Mobile:** compact accessible navigation, content-first single column, manageable image/copy sequence, filters available through a clear compact/disclosure pattern, touch targets that are comfortably operable.
- **Tablet:** use available width for balanced two-column discovery where content warrants it; avoid cramped filters.
- **Desktop:** centered maximum-width content, multi-column experience presentation when implemented, persistent clear navigation, filters visible where useful.
- Preserve logical reading and keyboard order at all breakpoints. Detailed breakpoints and final polish remain future work.

## Accessibility baseline

Use semantic landmarks and heading order; `Link` for navigation and `button` for actions; explicit accessible names/labels for controls; descriptive image alternatives (empty alt only for genuinely decorative imagery); visible keyboard focus; keyboard-operable navigation and controls; sufficient text/interactive contrast; appropriately sized interaction targets; and communicate validation/errors without relying on color alone.

## Non-goals

Unless an official assignment document later requires otherwise, this project does not include an authentication backend, database, booking engine, payment processing, external travel API, Redux, Zustand, localStorage persistence, or a third-party UI framework. The profile shell does not imply account functionality.

## Scope of this block

Implemented now: project contract, visual direction, canonical type, local dataset and validation, shared navigation/container/placeholder components, global baseline, and route shells. Not implemented now: finished home sections, explorer interactions/search/filter URL synchronization, favorites provider or toggles, final cards/detail, final favorites/profile, and full responsive polish.

## Definition of Done

For this architecture block, done means: all five required routes resolve; a single canonical experience type exists; the local collection has 100 records and validation passes; architecture avoids unnecessary client boundaries and prohibited state libraries/persistence; README and this contract agree; and lint, typecheck, production build, and data validation pass. Full assignment evaluation of final UX, functional filters/search, favorites interactions, persistence behavior, and page polish remains pending until official assignment material is available and those implementation blocks are completed.

## Local development and checks

- `npm run dev` — development server
- `npm run lint` — ESLint
- `npm run typecheck` — strict TypeScript check
- `npm run validate:data` — local dataset integrity checks
- `npm run build` — production build
