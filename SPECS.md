# Wanderlust Explorer — Technical Project Contract

## Project objective

Wanderlust Explorer is a travel discovery application intended to help people explore a curated local collection of 100 experiences, search by experience title, filter by category and destination, view experience details, save favorites, and visit a simulated user profile with a saved-favorites count. This block establishes architecture, deterministic local data, and route shells; interactive behavior is pending.

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

- `/` — eventual home hero with a button to `/experiences`; currently an introduction shell, not final hero/sections.
- `/experiences` — eventual explorer with all 100 experiences, title search, independent category/destination filters, composed filtering, and grid; currently a route shell.
- `/experiences/[id]` — read the URL ID and find/display its record from `src/data/experiences.ts`; currently only demonstrates receipt of the route parameter.
- `/favorites` — eventually display only experiences selected in shared React state; current route is not functional Favorites.
- `/profile` — eventual static simulated user profile and live favorites count; current route does not provide the count.

## Architecture and rendering boundaries

- `src/app` — route segments, layouts, metadata, and global styles. Keep route shells and static content as Server Components by default.
- `src/components` — shared presentation primitives. `Navbar`, `PageContainer`, and `RoutePlaceholder` are currently Server Components. Required final components include `ExperienceCard`, `SearchBar`, and `FilterBar` in addition to `Navbar`. Interactive filters, favorite toggles, and active navigation need narrowly scoped Client Components (`"use client"`) only where browser interaction is required.
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
| `imageUrl` | `string` | Stable direct HTTPS image URL. |
| `imageAlt` | `string` | Accessible description for the image. |
| `durationHours` | `number` | Typical activity duration. |

Categories are exactly the literal union `Adventure | Culture | Food | Wellness | Nature`. Official minimum fields are `id`, `title`, `description`, `category`, `destination`, `price`, `rating`, and `imageUrl`. Additional `imageAlt` and `durationHours` fields are useful and non-conflicting.

## Dataset and integrity

- `src/data/experiences.ts` exports exactly 100 deterministic local records, as required by the supplied project instructions.
- IDs are unique slugs. Records use only official categories, varied destinations, positive prices/durations, 1–5 ratings, descriptive copy, and direct `imageUrl` references with alt text.
- Data is curated in source; the application does not fetch a travel API at runtime.
- `npm run validate:data` checks exact count, ID uniqueness, non-empty required strings, supported categories, numeric bounds, non-empty city/country destination components, and practical HTTPS image URL structure.
- Images currently reference Unsplash image assets directly. This avoids runtime API integration; availability and licensing should be reviewed before production use.

## State ownership and favorites contract

- Interactive discovery state should live at the narrowest shared React boundary needed by the route and controls. Use React state; do not add Redux or Zustand.
- Favorites are represented as an array/set of canonical experience ID strings, owned by a React client provider or page-level state once favorites are implemented. Toggle means add an absent ID or remove a present ID, without mutating prior state.
- Pass favorite IDs/count and toggle callbacks through typed props to interactive consumers. Navbar currently offers an optional typed `favoriteCount` prop; it renders no fabricated value when not supplied.
- The navbar count reflects selected IDs (ideally only currently known dataset IDs). `/favorites` derives its list from those IDs and the canonical dataset.
- No persistence is specified by the provided assignment text: state is expected to reset after refresh. Do not add localStorage unless official requirements explicitly change this contract.

## Search contract

Search applies only to `experience.title` and must use case-insensitive regular-expression behavior equivalent to `new RegExp(term, "i").test(experience.title)`. Preserve the raw regex requirement. Guard RegExp construction and matching with `try/catch`; invalid patterns must safely become no matches or a validation state without crashing the UI.

## Filters and URL contract

Canonical `/experiences` query keys are:

- `search` — search term
- `category` — lowercase URL slug for one category (for example, `adventure`); parse it case-insensitively and map it to the title-case `ExperienceCategory` value (`Adventure`) for controls/filtering. Serialize category selections back to the lowercase slug.
- `destination` — selected destination display string

Compose active search, category, and destination constraints with logical AND; each unset constraint is a no-op. Reset clears all three and returns the URL to `/experiences` without empty/default parameters. Use Next.js `useSearchParams` and `usePathname` for client-side hydration and synchronization. Existing query values prefill the controls on load, and changes keep the canonical keys in the URL so refresh/share reproduces criteria. Do not introduce aliases such as `q`, `city`, or `type`.

## Hooks

- `useState` is required for shared/top-level favorite IDs and may own local control state.
- The finished project must demonstrate at least one correctly implemented `useEffect` for a genuine lifecycle/synchronization concern. Do not add an artificial effect or use it merely to mirror derived values.
- The finished project must include at least one meaningful custom hook, such as `useExperiences` or `useFilters`; do not create one merely to satisfy a checklist.

## Responsive behavior

- **Mobile:** compact accessible navigation, content-first single column, manageable image/copy sequence, filters available through a clear compact/disclosure pattern, touch targets that are comfortably operable.
- **Tablet:** use available width for balanced two-column discovery where content warrants it; avoid cramped filters.
- **Desktop:** centered maximum-width content, multi-column experience presentation when implemented, persistent clear navigation, filters visible where useful.
- Preserve logical reading and keyboard order at all breakpoints. Detailed breakpoints and final polish remain future work.

## Accessibility baseline

Use semantic landmarks and heading order; `Link` for navigation and `button` for actions; explicit accessible names/labels for controls; descriptive image alternatives (empty alt only for genuinely decorative imagery); visible keyboard focus; keyboard-operable navigation and controls; sufficient text/interactive contrast; appropriately sized interaction targets; and communicate validation/errors without relying on color alone. Navbar must appear on every route and eventually indicate its active link using `usePathname`. A zero-result state must show exactly `No se encontraron resultados`.

## Non-goals

Unless an official assignment document later requires otherwise, this project does not include an authentication backend, database, booking engine, payment processing, external travel API, Redux, Zustand, localStorage persistence, or a third-party UI framework. The profile shell does not imply account functionality.

## Scope of this block

Implemented now: project contract, visual direction, canonical type, local dataset and validation, shared navigation/container/placeholder components, global baseline, and route shells. Not implemented now: finished home sections, explorer interactions/search/filter URL synchronization, favorites provider or toggles, final cards/detail, final favorites/profile, and full responsive polish.

## Official Assignment Requirements

Statuses apply to the repository as of this audit: **DONE** is verified, **PARTIAL** means route/API/scaffolding exists without required working behavior, and **PENDING** means not implemented. These 36 stable IDs decompose the supplied official checklist for ongoing QA.

| ID | Requirement | Status |
| --- | --- | --- |
| REQ-001 | Keep exactly 100 local experiences in `src/data/experiences.ts`. | DONE |
| REQ-002 | Give every experience a unique ID. | DONE |
| REQ-003 | Include required title and description strings. | DONE |
| REQ-004 | Include required category and destination strings. | DONE |
| REQ-005 | Include required price and rating numeric fields. | DONE |
| REQ-006 | Include the official `imageUrl` field. | DONE |
| REQ-007 | Restrict categories to Adventure, Culture, Food, Wellness, Nature. | DONE |
| REQ-008 | Keep dataset deterministic/local without runtime travel API. | DONE |
| REQ-009 | Validate record count, IDs, required fields, category, numbers, image URL, and city/country destination. | DONE |
| REQ-010 | Provide the `/` home route. | PARTIAL |
| REQ-011 | Present the home hero section. | PENDING |
| REQ-012 | Provide a home button navigating to `/experiences`. | PARTIAL |
| REQ-013 | Provide the `/experiences` route. | PARTIAL |
| REQ-014 | Display all 100 experiences in a grid. | PENDING |
| REQ-015 | Search titles with case-insensitive RegExp semantics. | PENDING |
| REQ-016 | Handle invalid RegExp input without crashing. | PENDING |
| REQ-017 | Filter independently by category. | PENDING |
| REQ-018 | Filter independently by destination. | PENDING |
| REQ-019 | Compose search, category, and destination filters. | PENDING |
| REQ-020 | Support canonical `search`, `category`, and `destination` query keys. | PARTIAL |
| REQ-021 | Use `useSearchParams` and `usePathname` for query/control synchronization. | PENDING |
| REQ-022 | Prefill controls from current URL query parameters. | PENDING |
| REQ-023 | Provide `/experiences/[id]` and resolve/display the matching dataset record. | PARTIAL |
| REQ-024 | Provide `/favorites` displaying only favorited experiences. | PARTIAL |
| REQ-025 | Own favorite IDs in shared/top-level native React `useState`. | PENDING |
| REQ-026 | Pass favorites state/data down through props where needed. | PARTIAL |
| REQ-027 | Toggle favorites from each experience card heart control. | PENDING |
| REQ-028 | Visually distinguish active and inactive favorite controls. | PENDING |
| REQ-029 | Show a static simulated profile at `/profile`. | PARTIAL |
| REQ-030 | Display the shared favorites count on Profile. | PENDING |
| REQ-031 | Include the required `ExperienceCard` component. | PENDING |
| REQ-032 | Include required `SearchBar` and `FilterBar` components. | PENDING |
| REQ-033 | Show Navbar on every route and style active links with `usePathname`. | PARTIAL |
| REQ-034 | Show `No se encontraron resultados` for zero results. | PENDING |
| REQ-035 | Demonstrate meaningful `useState`, correct `useEffect`, and custom hook. | PENDING |
| REQ-036 | Deliver coherent responsive mobile and desktop behavior across pages. | PENDING |

## Definition of Done

For this architecture block, done means: all five route structures exist; one canonical experience type and an exactly 100-record local collection conform to official fields/categories; validation passes; architecture avoids unnecessary client boundaries and prohibited state libraries/persistence; design references and the requirements matrix are documented; and lint, typecheck, production build, and data validation pass. Interactive behavior and final UX remain pending according to the matrix.

## Local development and checks

- `npm run dev` — development server
- `npm run lint` — ESLint
- `npm run typecheck` — strict TypeScript check
- `npm run validate:data` — local dataset integrity checks
- `npm run build` — production build
