# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build/Test/Lint Commands
- Build: `npm run build`
- Dev: `npm run dev`
- Test (all): `npm test`
- Test (single): `npm test -- -t "test name"`
- Lint: `npm run lint`
- Type Check: `npm run typecheck`

## Code Style Guidelines
- Formatting: 2 spaces indentation, max 100 chars per line
- Imports: Group by react, external libs, internal components, hooks, utils, types
- Components: Use functional components with named exports
- Naming: camelCase for variables/functions, PascalCase for components/types
- Types: Use TypeScript interfaces for component props (suffix with Props)
- State: Use React Query for server state, React hooks for UI state
- Error Handling: Use try/catch with toast notifications for user feedback

## Repository Structure
- `/src/components`: UI components (follow shadcn/ui patterns)
- `/src/lib`: Database (Dexie), api clients, and utilities
- `/src/hooks`: Custom React hooks
- `/src/types`: TypeScript type definitions
- `/src/pages`: Main application pages/routes