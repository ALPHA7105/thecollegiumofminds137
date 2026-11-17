# Agent Status

This document summarizes the current state of the project and gives a quick operational snapshot for any agent working in this repository.

## Project Overview

- Name: The Collegium of Minds
- Tagline: “Think. Explore. Discover.”
- Purpose: A web platform for interdisciplinary learning, discussion, and idea exploration across science, mathematics, philosophy, literature, history, technology, arts, and more.

## Current Technical State

- Frontend: React with Vite
- Server/runtime: Express + TypeScript
- Styling: Tailwind CSS
- Routing: React Router
- Data/backend integration: Firebase
- AI integration: Google GenAI SDK
- Content rendering: Markdown + KaTeX support
- UI motion: Framer Motion / Motion

## Repository Snapshot

- Main app entry: `src/`
- Static assets: `public/`, `assets/`
- Server entry: `server.ts`
- App config: `vite.config.ts`, `tsconfig.json`
- Firebase config: `firebase-applet-config.json`
- Environmental config: `.env.example`

## Installed Tooling

The project is configured for a modern Vite + React + TypeScript workflow with supporting tooling for server-side builds and linting:

- `npm run dev` — runs the app in development mode
- `npm run build` — builds both the frontend and server bundle
- `npm run start` — starts the built server
- `npm run preview` — previews the built frontend
- `npm run lint` — runs TypeScript validation (`tsc --noEmit`)

## Current Working Status

- Project appears to be initialized and dependency-installed (`package-lock.json` exists).
- The repository is a working frontend + backend web app, not just a static landing page.
- The app includes a functional server environment and likely expects environment variables for Firebase/AI features.
- The README describes a community and curiosity-driven platform rather than a simple demo or starter app.

## Observations

- This repo is already structured for a real product build and is not a blank scaffold.
- Firebase and GenAI integration suggest the app may support interactive, AI-assisted or data-backed experiences.
- The app likely needs environment configuration before full local runtime behavior is available.

## Recommended Next Agent Focus

When continuing work in this repo, a good default approach is:

1. Check `.env.example` and required runtime configuration.
2. Validate the app with `npm run lint`.
3. Run `npm run dev` to inspect the actual application flow.
4. Review the key implementation files in `src/` to understand the current UX and feature set.

## Notes

This file is intended as a living status note for the project. It should be updated as the app evolves or if the project direction changes.
