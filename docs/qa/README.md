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

## Supplied visual QA observations

The supplied evidence shows responsive reflow across desktop, iPad-sized, and iPhone-sized viewports. Navigation, cards, filters, detail content, Favorites, and Profile remain legible and structurally coherent in the captured states.

This evidence does not by itself prove every behavioral requirement such as regex behavior, malformed-regex handling, URL synchronization, keyboard interaction, or every favorite-toggle transition. Those behaviors should remain part of the final functional QA checklist.

## Additional review in this workspace

- Confirmed the archive inventory and integrity/format/dimensions of the 15 PNG files.
- Verified representative Unsplash image endpoints return HTTP 200.
- Live HTTP/SSR checks passed for `/`, `/experiences`, `/favorites`, and `/profile`; Explorer markup contains 100 distinct detail links; a known detail returns 200 and an unknown ID returns 404.
- A deep-link query combining Tokyo search, uppercase `FOOD`, country destination Japan, and an unknown query key rendered the expected sole record. Invalid regex input safely returned the expected zero-results markup. Country-destination routing returned 200.
- Assertions against the pure filtering function passed for all 100 records, case-insensitive and regex title search, malformed regex, independent category and country filters, combined AND filters, no-match results, and source-data non-mutation.
- Dataset validation, lint, typecheck, production build, and `git diff --check` passed after the documentation/evidence updates.

Independent visual inspection and actual viewport/click replay could not be completed: the available image-view tool did not expose screenshot pixels for assessment, and no browser binary or Playwright/Puppeteer installation is available. Thus layout-quality observations above are attributed to the supplied package, not claimed as independent pixel-level findings.

## Remaining manual checks

- Browser interaction for heart toggles and favorite consistency across route navigation; Clear filters and control-driven URL updates/history behavior.
- Keyboard-only focus order, visible focus behavior in a real browser, and screen-reader announcements.
- Actual browser viewport inspection for horizontal overflow, touch-target dimensions, and browser-specific rendering across mobile/tablet/desktop.

REQ-036 remains **PARTIAL** in `SPECS.md`: the supplied multi-page, multi-breakpoint package is preserved, but the screenshots could not be independently pixel-reviewed or replayed at their viewports in this workspace. A human/browser visual confirmation is still needed before marking responsive presentation DONE. Interactive browser/keyboard checks above also remain unverified follow-up QA.

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
