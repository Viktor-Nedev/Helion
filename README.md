# Helio

Helio is a premium, futuristic full-stack healthcare platform scaffolded as a scalable monorepo.

## Stack

- React + TypeScript
- Tailwind CSS
- GSAP
- React Router
- Zustand
- Recharts
- Express + TypeScript
- Firebase Admin + Firestore
- Gemini API
- Shared domain types

## Monorepo Structure

```text
apps/
  api/      Express API with modular healthcare routes
  web/      Premium React frontend with cinematic UI
packages/
  shared/   Shared TypeScript domain models
```

## Core Experiences

- Cinematic landing page
- Login and registration with patient or doctor role
- Patient dashboard
- Doctor dashboard
- AI symptom checker with API integration fallback
- Doctor marketplace
- Community feed
- Real-time messenger UI with embedded video workspace
- Appointment calendar with notes and saved hours
- Emergency mode with live doctor availability
- Health records timeline
- Settings control panel
- Hidden admin observatory
- Floating Helio AI assistant

## Local Setup

1. Install Node.js 20+ and npm.
2. Install dependencies:

```bash
npm install
```

3. Start the API and frontend:

```bash
npm run dev
```

4. Open:

- Web: `http://localhost:5173`
- API: `http://localhost:4000/api/health`

## Environment Files

- `apps/web/.env.example`
- `apps/api/.env.example`

## API Modules

- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/dashboard/patient`
- `GET /api/dashboard/doctor`
- `GET /api/doctors`
- `GET /api/community/feed`
- `GET /api/chat/threads`
- `GET /api/chat/threads/:threadId/messages`
- `GET /api/appointments`
- `GET /api/appointments/calendar`
- `POST /api/appointments/notes`
- `GET /api/emergency/status`
- `POST /api/symptoms/analyze`
- `GET /api/admin/overview`

## Notes

- Frontend pages use live API helpers with seeded fallbacks so the UI still runs cleanly without backend credentials.
- The backend now supports Firestore-backed reads/writes with automatic seeded fallback and Gemini-powered symptom analysis via environment variables.
