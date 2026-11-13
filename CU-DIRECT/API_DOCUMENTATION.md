# API documentation

Base URL: `http://localhost:5000/api`

All successful responses use `{ "data": ... }`; errors use `{ "message": "..." }`.

## Health
- `GET /health` — API health.

## Authentication
- `POST /auth/register` — body `{ name?, email, password }`; creates STUDENT only. Password minimum 10 characters.
- `POST /auth/login` — body `{ email, password }`; returns user summary and 8-hour JWT.

## Service requests (JWT required)
- `GET /requests` — students see their own; authorized operational roles see all.
- `POST /requests` — body `{ title, description, category, location? }`.
- `PATCH /requests/:id/status` — STAFF, DEPARTMENT_WORKER, ADMIN, HOSTEL_WARDEN, SUPER_ADMIN; body `{ status, comment? }`. Enforces forward workflow transitions and appends history.

## Notices
- `GET /notices` — published, non-expired notices.
- `POST /notices` — ADMIN or SUPER_ADMIN; body `{ title, body, category? }`.

## Feedback
- `POST /feedback` — JWT required; body `{ category, rating, message }`.
- `GET /feedback` — ADMIN or SUPER_ADMIN.

The campus map, notifications, SOS, and demo notices are currently frontend/demo-only. No live dispatch, geolocation sharing, official campus location data, or Socket.IO delivery is implemented.
