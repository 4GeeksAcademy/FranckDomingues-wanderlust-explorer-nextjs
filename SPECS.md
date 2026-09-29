# Wanderlust Explorer — Technical Project Contract

## Project objective

Wanderlust Explorer is a travel discovery application intended to help people explore a curated local collection of 100 experiences, search by experience title, filter by category and destination, view experience details, save favorites, and visit a simulated user profile with a saved-favorites count. The Explorer, shared favorites behavior, and primary routes are implemented. Responsive screenshot evidence has received human visual review across representative desktop, tablet/iPad-sized, and mobile/iPhone-sized captures. Browser automation and exhaustive accessibility testing were not performed.

## Design discovery and visual direction

References were reviewed as sources of general interaction principles, not templates to reproduce:

- **Airbnb Experiences** — <https://www.airbnb.com/s/experiences>. Studied activity discovery, category-led browsing, and editorial photography. Influence: clear experience titles, strong place imagery, and scannable discovery entry points.
- **GetYourGuide** — <https://www.getyourguide.com/>. Selected as a search-first trip discovery reference for experience summaries and refinement patterns. Influence: make search and category/destination refinement easy to find when those controls are implemented. Its public page was not fully inspectable during initial design discovery; no specific unverified pattern is treated as a required design behavior.
- **National Geographic Expeditions** — <https://www.nationalgeographic.com/expeditions/>. Studied destination storytelling, landscape imagery, and visual hierarchy. Influence: favor sense of place and useful context over dense promotional decoration.

**Wanderlust direction:** calm, welcoming, editorial travel discovery; warm off-white canvas with dark ink and restrained evergreen accents; generous consistent spacing; clear heading/body hierarchy; rounded but not overly pill-shaped cards; large, destination-led image crops with meaningful alt text; compact persistent navigation; filters that can become a clear toolbar or mobile disclosure; responsive layouts that preserve content priority rather than merely shrink desktop UI. These are guiding principles for the implemented interface, not a formal design system.

## Technical foundation

- Next.js App Router, React, strict TypeScript, Tailwind CSS v4, ESLint, and npm.
- Source code lives under `/src`.
- No component library is required or introduced.
- The current local collection is deterministic and has no runtime external travel API dependency.

## Routes

- `/` — focused editorial hero and CTA to `/experiences`.
- `/experiences` — all 100 experiences with title regex search, independent category/destination filters, composed filtering, and shareable query state.
- `/experiences/[id]` — looks up and displays its record from `src/data/experiences.ts`; unknown IDs use the Next.js not-found route.
- `/favorites` — derives selected records from shared favorites IDs and the canonical dataset.
- `/profile` — static simulated user profile with the live shared favorites count.

## Architecture and rendering boundaries

- `src/app` — route segments, layouts, metadata, and global styles. Keep route shells and static content as Server Components by default.
- `src/components` — `PageContainer` remains a Server Component. The `SharedAppShell` client boundary owns shared favorites state at the application level and composes `Navbar`; `Explorer`, `ExperienceCard`, SearchBar, FilterBar, favorite controls, and profile/favorites consumers use client boundaries only where hooks/interaction are required. Home and detail route composition remain Server Components where possible.
- `src/data` — local typed data and development validation; no runtime network calls.
- `src/hooks` — `useExperiences` derives matching records from input data and filters, including guarded regex handling.
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

- Shared owner: `FavoritesStateProvider` in `src/components/favorites-state.tsx` is composed once by `SharedAppShell` in the root layout. Its native `useState<string[]>` is the only favorites source of truth; the context exposes IDs, count, `isFavorite`, and `toggleFavorite` to composition components.
- Cards receive favorite state and toggle callbacks through typed props; detail favorite action, Navbar, Favorites, and Profile consume the same shared state. `/favorites` derives its records from IDs and the canonical dataset.
- Favorites intentionally reset on a full page refresh; there is no persistence.
- No persistence is specified by the provided assignment text: state is expected to reset after refresh. Do not add localStorage unless official requirements explicitly change this contract.

## Search contract

Search applies only to `experience.title` and must use case-insensitive regular-expression behavior equivalent to `new RegExp(term, "i").test(experience.title)`. Preserve the raw regex requirement. Guard RegExp construction and matching with `try/catch`; invalid patterns must safely become no matches or a validation state without crashing the UI.

The Explorer shows a clear validation status and zero results for an invalid regex; it does not crash and does not silently switch to substring search.

## Filters and URL contract

Canonical `/experiences` query keys are:

- `search` — search term
- `category` — lowercase URL slug for one category (for example, `adventure`); parse it case-insensitively and map it to the title-case `ExperienceCategory` value (`Adventure`) for controls/filtering. Serialize category selections back to the lowercase slug.
- `destination` — selected city/country string or a country derived from the dataset (for example, `Croatia`)

Compose active search, category, and destination constraints with logical AND; each unset constraint is a no-op. Reset clears all three and returns the URL to `/experiences` without empty/default parameters. Use Next.js `useSearchParams`, `usePathname`, and `useRouter` for client-side synchronization without full page loads. Existing query values prefill the controls on load, and changes keep the canonical keys in the URL so refresh/share reproduces criteria. Invalid category and destination values are ignored safely; unknown query keys in a deep link are not reflected into controls/results and are dropped on the next filter update. Do not introduce aliases such as `q`, `city`, or `type`.

## Hooks

- `useState` is required for shared/top-level favorite IDs and may own local control state.
- `Explorer` uses `useEffect` to synchronize in-memory controls when browser navigation changes query parameters; it depends on the serialized query and does not write the URL from that effect, avoiding a feedback loop.
- `useExperiences` is a meaningful memoized derivation hook for regex/title/category/destination filtering and malformed regex state.

## Responsive behavior

- **Mobile:** responsive wrapping navigation, content-first single-column experience cards, manageable image/copy sequence, filters available in a stacked labeled control panel, touch targets that are comfortably operable.
- **Tablet:** use available width for balanced multi-column discovery where content warrants it; avoid cramped filters.
- **Desktop:** centered maximum-width content, multi-column experience presentation when implemented, persistent clear navigation, filters visible where useful.
- Preserve logical reading and keyboard order at all breakpoints. Implemented responsive layouts are represented in the supplied captures and have received human visual review; exhaustive keyboard and accessibility testing is not claimed.

### Visual QA evidence

The supplied visual QA package is preserved in [`docs/qa/`](./docs/qa/), including the original package README, manifest, and 15 PNG captures. The captures cover Home (desktop/tablet/mobile), Explorer filters and cards (mobile/tablet/desktop), Favorites (desktop/tablet/mobile), experience detail (desktop/tablet/mobile), and Profile (desktop). The recorded image dimensions range from 496 px to 1,731 px wide. The supplied evidence package reports that these were manually captured from the running Block 3 app; original filenames, manifest, and package notes are retained.

Human visual QA has been completed outside the coding-agent environment. The reviewer confirmed representative responsive rendering across desktop, tablet/iPad-sized, and mobile/iPhone-sized captures for Home, Explorer, Favorites, Experience Detail, and Profile. Within this coding session, PNG integrity/dimensions and representative Unsplash image endpoints were checked, and functional/data behavior was verified through code-level assertions and local HTTP/SSR checks. Screenshot pixels and viewport behavior could not be independently replayed in the agent environment because no browser was available. Browser automation was not performed. Human visual QA supports responsive presentation; it does not constitute exhaustive keyboard, screen-reader, or accessibility testing.

## Accessibility baseline

Use semantic landmarks and heading order; `Link` for navigation and `button` for actions; explicit accessible names/labels for controls; descriptive image alternatives (empty alt only for genuinely decorative imagery); visible keyboard focus; keyboard-operable navigation and controls; sufficient text/interactive contrast; appropriately sized interaction targets; and communicate validation/errors without relying on color alone. Navbar appears on every route and indicates the active link using `usePathname`, including nested detail routes. A zero-result state shows exactly `No se encontraron resultados`.

## Non-goals

Unless an official assignment document later requires otherwise, this project does not include an authentication backend, database, booking engine, payment processing, external travel API, Redux, Zustand, localStorage persistence, or a third-party UI framework. The profile shell does not imply account functionality.

## Scope of this block

Implemented: canonical type and validated local dataset, shared in-memory favorites, active navigation, interactive Explorer/search/filters/URL synchronization, cards, home, dynamic detail/not-found, Favorites, simulated Profile, and responsive layouts. Human visual QA of representative responsive screenshots is complete. Browser automation, exhaustive browser interaction/keyboard testing, and exhaustive accessibility testing remain outside the verified scope.

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
| REQ-010 | Provide the `/` home route. | DONE |
| REQ-011 | Present the home hero section. | DONE |
| REQ-012 | Provide a home button navigating to `/experiences`. | DONE |
| REQ-013 | Provide the `/experiences` route. | DONE |
| REQ-014 | Display all 100 experiences in a grid. | DONE |
| REQ-015 | Search titles with case-insensitive RegExp semantics. | DONE |
| REQ-016 | Handle invalid RegExp input without crashing. | DONE |
| REQ-017 | Filter independently by category. | DONE |
| REQ-018 | Filter independently by destination. | DONE |
| REQ-019 | Compose search, category, and destination filters. | DONE |
| REQ-020 | Support canonical `search`, `category`, and `destination` query keys. | DONE |
| REQ-021 | Use `useSearchParams` and `usePathname` for query/control synchronization. | DONE |
| REQ-022 | Prefill controls from current URL query parameters. | DONE |
| REQ-023 | Provide `/experiences/[id]` and resolve/display the matching dataset record. | DONE |
| REQ-024 | Provide `/favorites` displaying only favorited experiences. | DONE |
| REQ-025 | Own favorite IDs in shared/top-level native React `useState`. | DONE |
| REQ-026 | Pass favorites state/data down through props where needed. | DONE |
| REQ-027 | Toggle favorites from each experience card heart control. | DONE |
| REQ-028 | Visually distinguish active and inactive favorite controls. | DONE |
| REQ-029 | Show a static simulated profile at `/profile`. | DONE |
| REQ-030 | Display the shared favorites count on Profile. | DONE |
| REQ-031 | Include the required `ExperienceCard` component. | DONE |
| REQ-032 | Include required `SearchBar` and `FilterBar` components. | DONE |
| REQ-033 | Show Navbar on every route and style active links with `usePathname`. | DONE |
| REQ-034 | Show `No se encontraron resultados` for zero results. | DONE |
| REQ-035 | Demonstrate meaningful `useState`, correct `useEffect`, and custom hook. | DONE |
| REQ-036 | Deliver coherent responsive mobile, tablet, and desktop behavior across pages, including touch-friendly controls. | DONE |

## Definition of Done

For the interactive implementation block, done means the 36-item matrix is updated from observed behavior; all routes and core search/filter/favorites functionality work with the canonical data; no prohibited state/persistence dependency is introduced; and dataset validation, lint, typecheck, production build, functional behavior checks, and responsive screenshot evidence are recorded. REQ-036 is DONE based on implementation review and completed human visual review of representative responsive screenshots. Browser automation was not performed; exhaustive accessibility and keyboard testing remain separate follow-up considerations.

## Local development and checks

- `npm run dev` — development server
- `npm run lint` — ESLint
- `npm run typecheck` — strict TypeScript check
- `npm run validate:data` — local dataset integrity checks
- `npm run build` — production build
