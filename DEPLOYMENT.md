# Deployment guide

## MongoDB Atlas
1. Create an Atlas project and database.
2. Create a database user with a strong password.
3. Restrict network access to the backend provider where possible.
4. Copy the connection string and set it as `MONGODB_URI`.

## Backend (Render or equivalent)
- Root directory: repository root (or configure workspace support).
- Build: `npm install`
- Start: `npm run start -w server`
- Set `NODE_ENV=production`, `PORT`, `MONGODB_URI`, `JWT_SECRET`, and `CLIENT_URL`.

## Frontend (Vercel or equivalent)
- Root: `client`
- Build: `npm run build`
- Output: `dist`
- Set `VITE_API_URL` to the deployed backend API origin plus `/api`.

Free-tier availability, limits and sleep policies change. Confirm current provider terms before deployment. Never commit `.env` files.
