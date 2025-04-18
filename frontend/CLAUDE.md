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

### App conecpt: Mood & Wellness Tracker App

**Goal**  
Build a fully‑functional, local‑first React app (TypeScript + Tailwind CSS + shadcn/ui) that lets a user  
• log mood, sleep quality, meals, medications and any other wellness metrics you imagine  
• explore history through interactive charts and summaries, entirely offline by default

**Tech Stack**  
- **Framework:** React 18, TypeScript (ES 2022)  
- **Styling:** Tailwind CSS + shadcn/ui components  
- **Charts:** Recharts for data visualisation  
- **Offline Storage:** Dexie 4 (indexedDB wrapper)  
- **Service Worker:** full PWA offline support (see strategy below)  
- **Bundle Target:** ≤ 150 kB gzipped for the first load; additional code is split and lazy‑loaded.

---

### Features

1. **Entry Screen**  
   - Quick‑tap mood picker (emoji / colour wheel)  
   - Sliders or toggles for sleep quality, hunger, stress, etc.  
   - “Add custom metric” button for user‑defined data points  

2. **History & Analytics**  
   - Line / bar charts with time‑range filters  
   - Correlation view (e.g. mood vs sleep)  
   - CSV / PDF export for a selected date range  

3. **Settings & Sync**  
   - Offline‑only toggle  
   - One‑click cloud backup / sync to OneDrive or Google Drive  
   - OAuth PKCE flow; tokens stored (encrypted) in indexedDB  