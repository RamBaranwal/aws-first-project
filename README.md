# Taskify — Task Manager (Vite + React)

A small single-page Task Manager app built with React and Vite. Tasks are stored in browser `localStorage` and the UI supports creating, editing, moving, and deleting tasks across columns (To Do, In Progress, Review, Done).

## Features
- Kanban-style board with columns and task cards
- Create, edit, delete tasks
- Move tasks between columns
- Client-side persistence using `localStorage`

## Getting started

### Prerequisites
- Node.js (recommended v18+)
- npm (comes with Node.js)

### Install

```bash
npm install
```

### Available scripts
- `npm run dev` — start Vite dev server (open http://localhost:5173)
- `npm run build` — build production assets into `dist/`
- `npm run preview` — locally preview production build
- `npm run lint` — run ESLint across the project

### Run (development)

```bash
npm run dev
```

### Build (production)

```bash
npm run build
```

### Preview production build locally

```bash
npm run preview
```

## Docker (production)

This repository includes a `Dockerfile` that performs a multi-stage build and serves the compiled `dist/` with Nginx.

Build the image:

```bash
docker build -t taskify:latest .
```

Run the container:

```bash
docker run --rm -p 80:80 taskify:latest
# Then open http://localhost
```

## Project structure (key files)
- `index.html` — HTML entry (loads `/src/main.jsx`)
- `src/main.jsx` — React entry point
- `src/App.jsx` — Main Taskify app (board, tasks, localStorage)
- `src`/* — other assets and styles
- `package.json` — scripts and dependencies
- `Dockerfile` — multi-stage build + Nginx

## Notes
- The app is client-only and uses `localStorage` for persistence; no backend is included.
- Use the included `Dockerfile` to create a static production image, or deploy the `dist/` folder to any static host.

## Contributing
- Feel free to open issues or PRs. For code changes, run `npm run lint` and keep changes focused.

## Contact
- Found an issue or want a feature? Open an issue in the repo.

---

If you'd like, I can also add:
- A `CONTRIBUTING.md` template
- CI pipeline to build and publish a Docker image
- Screenshots and badges for the README

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
