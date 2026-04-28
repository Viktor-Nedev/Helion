# Helio

Helio is a premium, futuristic full-stack healthcare platform scaffolded as a scalable monorepo.

## Stack

- React + TypeScript
- Tailwind CSS
- Framer Motion
- React Router
- Zustand
- Recharts
- Express + TypeScript
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
- Real-time messenger UI
- Video consultation room
- Appointment calendar
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
- `POST /api/symptoms/analyze`
- `GET /api/admin/overview`

## Notes

- Frontend pages are scaffolded with premium mock data and one live API integration path for symptom analysis and login fallback.
- The backend is designed as a production-friendly modular foundation and can be extended with database, auth provider, websockets, and video infrastructure.
