# Wanderlust Explorer — Project Specifications

## Project overview

Wanderlust Explorer is a travel exploration project built with React and Next.js. This repository currently contains only the application foundation; product features and UI are intentionally not implemented in this initialization step.

## Technical foundation

- Next.js with the App Router
- React
- TypeScript in strict mode
- Tailwind CSS v4
- ESLint with the Next.js recommended rules
- npm for dependency management
- Application code under `src/`

## Initial source structure

```text
src/
├── app/         # App Router routes, layouts, and global styles
├── components/  # Reusable UI components (future work)
├── data/        # Application data (future work)
├── hooks/       # Reusable React hooks (future work)
└── types/       # Shared TypeScript types (future work)
```

## Scope boundary

This initialization establishes tooling, configuration, and a minimal App Router entry point only. Do not consider the current placeholder page to be the finished product. Wanderlust Explorer feature requirements, visual design, data sources, and application behavior are to be implemented in a later project iteration.

## Local development

- `npm run dev` — start the development server
- `npm run lint` — lint project files
- `npm run typecheck` — run TypeScript without emitting files
- `npm run build` — create a production build
