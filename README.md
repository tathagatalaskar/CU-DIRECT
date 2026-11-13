# CU DIRECT
**One Campus. One Platform. Directly Connected.**

CU DIRECT is an independent academic MERN-stack project for organizing campus service requests, notices, feedback and location information. It is not an official Chandigarh University service and is not endorsed by the university.

## Current implementation
- Responsive React + Vite interface with a forest-green / warm-ivory design system.
- Demo student entry (local sample data) and backend email/password registration/login.
- Express API with JWT authentication, bcrypt password hashing, role middleware, rate limiting, Helmet, CORS and validation.
- MongoDB/Mongoose models for users, service requests, notices and feedback.
- Request creation, student-scoped request listing, staff status transitions and request history.
- Public notice listing and admin-only notice creation.
- Authenticated feedback submission and admin-only feedback listing.
- Clearly labelled schematic campus map and emergency-information flow that does not claim to dispatch help.

## Requirements
Node.js 20+ and MongoDB 7+ recommended.

## Run locally
1. Copy `.env.example` to `server/.env` and set `MONGODB_URI`, a long random `JWT_SECRET`, and `CLIENT_URL`.
2. From the repository root run `npm install`.
3. Run `npm run dev`.
4. Open `http://localhost:5173`.

The client supports demo access without a database. Persistent backend features require MongoDB and a real account.

## Demo mode
The sign-in screen has a clearly labelled Demo access path. It uses browser-local sample records and does not authenticate a university UID, contact university systems, or persist changes to MongoDB.

## Security notes
Public registration always creates STUDENT accounts. Privileged accounts must be provisioned through a trusted administrative process; there is no public role selector. Do not use real student data in a demo. See [SECURITY.md](SECURITY.md).

## Project structure
- `client/` React frontend
- `server/` Express API and Mongoose models
- `docs/` architecture and QA notes
- `scripts/` local utility scripts

## Important limitations
This initial fresh build does not yet implement the full requested scope. In particular, there is no production refresh-token rotation, password-reset email, Socket.IO, attachment storage, official CU SSO, verified campus GIS, complete admin/staff/warden/security portals, or institutional integrations. These must be completed and tested before any production use.
