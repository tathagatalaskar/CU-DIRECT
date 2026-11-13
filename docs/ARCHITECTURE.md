# Architecture
React/Vite browser client communicates with an Express REST API. The API validates request bodies with Zod, authenticates JWTs, applies role middleware and persists domain records through Mongoose. Models currently cover users, service requests, notices and feedback. Request status history is embedded in each request for an initial audit trail; a separate append-only audit log is planned.

## Trust boundaries
- Browser demo state is not trusted or persistent.
- Backend endpoints enforce authentication and role checks.
- Public registration assigns STUDENT unconditionally.
- Campus map is explicitly schematic and not navigational.
- SOS is informational only; no alert is dispatched.
