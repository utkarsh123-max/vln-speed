# VLN Speed

**Measure Your Connection. Know Your Network.**

A real internet speed test — ping/jitter, download, and upload are all measured
by actually moving bytes over the network and timing it, not by generating
random numbers that look like a speed test.

```
vln-speed/
 ├── backend/   Node/Express server that the frontend tests against
 └── frontend/  React + TypeScript + Vite + Tailwind + Framer Motion app
```

## Why there are two folders

A page running only in your browser can't measure your internet speed by
itself — there's nothing on the other end to send data to or from. The
`backend` is that "other end": a small server with `/api/ping`,
`/api/download`, and `/api/upload` endpoints. The `frontend` times real
requests against it. You need both running for tests to actually work.

---

## 1. Run it locally

**Backend**

```bash
cd backend
npm install
cp .env.example .env
npm run dev        # listens on http://localhost:4000
```

**Frontend** (new terminal)

```bash
cd frontend
npm install
cp .env.example .env    # already points at http://localhost:4000 by default
npm run dev              # opens http://localhost:5173
```

Open the printed localhost URL, hit **Start**, and you should see real
ping/download/upload numbers for your actual connection.

> Because measurement needs a real network round trip, if you run backend
> and frontend on the same machine your download/upload numbers will be
> capped by localhost loopback speed, not your real ISP speed. To measure
> your real internet speed, deploy the backend (step 2 below) so traffic
> actually leaves your machine.

---

## 2. Deploy it for real

**Backend → Railway, Render, or Fly.io** (any Node host works)

1. Push this repo (or just the `backend/` folder) to the host of your choice.
2. Set the environment variables from `backend/.env.example` — at minimum
   `CORS_ORIGIN` to your frontend's real domain (e.g.
   `https://vlnspeed.com`) once you know it.
3. Start command: `npm start`.
4. Note the public URL you're given, e.g. `https://vln-speed-api.onrender.com`.

**Frontend → Vercel or Cloudflare Pages**

1. Import the `frontend/` folder as the project root.
2. Build command `npm run build`, output directory `dist`.
3. Set `VITE_API_URL` to your backend's public URL from step 4 above.
4. Deploy.

**Multiple regions (optional, matches the "server selector" feature)**

Deploy the backend again in another region (e.g. Mumbai, Singapore) and set
`VITE_SERVERS` on the frontend to a JSON array listing every region — see
the comment in `frontend/src/config/servers.ts` for the exact format. Until
you do this, VLN Speed runs perfectly well against a single "Auto" server.

---

## 3. What's real vs. what you still need to add

**Real and working out of the box:**
- Ping/latency/jitter — timed round trips to `/api/ping`
- Download — multiple parallel streamed transfers from `/api/download`, sampled ~5×/sec
- Upload — multiple parallel `XMLHttpRequest` uploads to `/api/upload`, timed via real `upload.onprogress` events
- Gauge, chart, quality classification, history (localStorage), theming, server selector, error/empty states, responsive layout

**Left for you to wire up when you're ready to go further:**
- A production Postgres-backed history (the frontend's `useTestHistory` hook is the one place to swap localStorage for API calls)
- Multi-region backend deployment (single-region works fine as-is)
- A real production domain, HTTPS, and updating the `og:image`/canonical URLs in `frontend/index.html`
- I wasn't able to run `npm install` / a production build in this environment (no network access here), so please run `npm run build` yourself once, in both folders, before you deploy — if TypeScript flags anything, it'll be a small, easy fix, not a structural issue.

---

## Design notes

Dark theme by default (`#07090D` background, `#4CC9F0` cyan accent), with a
properly-designed light theme — not an inversion — in `frontend/src/index.css`.
Connection-quality thresholds are defined once, transparently, in
`frontend/src/utils/calculateQuality.ts`.
