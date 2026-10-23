# FAST CARS — Frontend

React + Vite client for the FAST CARS rental API.

## Run

```bash
# 1. backend (http://localhost:8080, docs at /doc)
cd backend && uv run uvicorn main:app --port 8080

# 2. frontend (http://localhost:5173)
cd frontend
cp .env.example .env     # optional: VITE_API_URL
npm install
npm run dev
```

The backend's `.env` must list the frontend origin, e.g.
`ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173`.

## Scripts

- `npm run lint` — oxlint
- `npm run build` — production build
- `npm test` — smoke tests against a running backend (seeded accounts)

## Layout

- `src/api` — fetch client (token handling) and per-resource API helpers
- `src/context` — auth and wishlist state
- `src/pages` — customer pages; `src/admin` — admin panel (`/admin`, admins only)

Seed accounts: `admin@fastcars.com` / `AdminPassword123`, `joy.jenna@gmail.com` / `CustomerPassword123`.
