# Wanderlust Explorer — Visual QA Evidence

Baseline under review: Block 3 (`feat: implement Wanderlust explorer and favorites`)

This directory contains the 15 supplied screenshots, the normalized package manifest (`manifest.csv`), the original package README (`README-source.md`), and this expanded QA record. The evidence was supplied as `WANDERLUST_VISUAL_QA_EVIDENCE.zip`; original capture names are mapped in `manifest.csv`.

The supplied package identifies the baseline as Block 3 and reports that screenshots were manually captured from the running application on 2026-09-28. PNG integrity and dimensions were checked after extraction; recorded widths range from 496 to 1,731 pixels. The manifest’s original narrow no-break spaces were normalized to ordinary spaces and trailing line padding removed for clean text-file diffs; screenshot files are unchanged.

## Coverage

- Home: desktop, tablet, mobile
- Explorer: desktop, tablet, mobile
- Explorer filters and responsive card grid
- Favorites: desktop, tablet, mobile
- Experience detail: desktop, tablet, mobile
- Profile: desktop
- Shared favorites count visible across relevant views

## Human visual QA

Human review outside the coding-agent environment is complete. It confirmed representative responsive rendering at desktop, tablet/iPad-sized, and mobile/iPhone-sized viewports for Home, Explorer, Favorites, Experience Detail, and Profile. The supplied observations describe navigation, cards, filters, detail content, Favorites, and Profile as legible and structurally coherent in the reviewed captures. This supports responsive presentation; it is not an exhaustive audit of every page state or accessibility criterion.

## Automated and code-level verification

The coding session verified PNG integrity/dimensions, representative image endpoints, data and pure filtering behavior, and local HTTP/SSR route/query cases as recorded below. Browser automation was not performed. No browser executable or Playwright/Puppeteer setup was available in the coding-agent environment, so screenshots were not pixel-reviewed or replayed at their viewports there. Human visual review is reported separately from these automated/code-level checks.

## Additional review in this workspace

- Confirmed the archive inventory and integrity/format/dimensions of the 15 PNG files.
- Verified representative Unsplash image endpoints return HTTP 200.
- Live HTTP/SSR checks passed for `/`, `/experiences`, `/favorites`, and `/profile`; Explorer markup contains 100 distinct detail links; a known detail returns 200 and an unknown ID returns 404.
- A deep-link query combining Tokyo search, uppercase `FOOD`, country destination Japan, and an unknown query key rendered the expected sole record. Invalid regex input safely returned the expected zero-results markup. Country-destination routing returned 200.
- Assertions against the pure filtering function passed for all 100 records, case-insensitive and regex title search, malformed regex, independent category and country filters, combined AND filters, no-match results, and source-data non-mutation.
- Dataset validation, lint, typecheck, production build, and Git whitespace checks passed during final closure validation.

## Verification boundaries and remaining checks

- Human visual QA of representative responsive captures is complete as described above.
- Browser automation was not performed. Coding-agent limitations prevented an independent screenshot-pixel review and viewport replay in that environment.
- Browser interaction for heart toggles across route navigation, Clear filters, and control-driven URL/history behavior was not replayed end-to-end in a browser.
- Keyboard-only focus order, visible focus in a real browser, screen-reader announcements, and exhaustive accessibility testing remain unverified.

REQ-036 is **DONE** in `SPECS.md` based on the responsive implementation and completed human visual review. This status does not imply automated viewport testing, browser automation, or exhaustive accessibility verification.

## Files

- `wanderlust-qa-01-home-desktop.png`
- `wanderlust-qa-02-home-mobile.png`
- `wanderlust-qa-03-home-tablet.png`
- `wanderlust-qa-04-explorer-mobile-filters-and-results.png`
- `wanderlust-qa-05-explorer-mobile-filters.png`
- `wanderlust-qa-06-explorer-mobile-cards.png`
- `wanderlust-qa-07-explorer-tablet-grid.png`
- `wanderlust-qa-08-explorer-desktop.png`
- `wanderlust-qa-09-favorites-desktop.png`
- `wanderlust-qa-10-favorites-tablet.png`
- `wanderlust-qa-11-favorites-mobile.png`
- `wanderlust-qa-12-experience-detail-mobile.png`
- `wanderlust-qa-13-experience-detail-tablet.png`
- `wanderlust-qa-14-experience-detail-desktop.png`
- `wanderlust-qa-15-profile-desktop.png`
