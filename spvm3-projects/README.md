# SPVM3 Project Hub

A website to display and sell 74+ projects (Mini, Full Stack, AI).

## Stack
| Layer      | Technology                  |
|------------|-----------------------------|
| Front-end  | HTML · CSS · JavaScript     |
| Back-end   | Node.js · Express           |
| Database   | SQLite (Local) / MySQL (Prod)|
| Hosting    | Vercel (front) + Node host  |

## Files
| File | Purpose |
|------|---------|
| `index.html` | Public page – visitors see all projects |
| `app.js` | Front-end JS – calls the REST API |
| `server-local.js` | Local server with built-in SQLite DB |
| `server.js` | Express REST API for MySQL |
| `schema.sql` | MySQL schema + 74 seed projects |
| `.env.example` | Environment variable template |

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Run local server (zero setup, uses SQLite with all 74 projects)
npm start
```

Open **http://localhost:3000** in your browser.

## Production Setup (with MySQL)

```bash
# 1. Import database
mysql -u root -p < spvm3-projects/schema.sql

# 2. Setup .env file
cp spvm3-projects/.env.example spvm3-projects/.env

# 3. Run production server
npm run start:prod
```

## REST API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/projects` | List active projects |
| POST | `/api/contact` | Log WhatsApp/Email click |

## Deploying to Vercel

1. Deploy the API server (`server.js` or `server-local.js`) to a Node host (e.g., Render, Railway).
2. In `app.js`, set `const API = "https://your-api-domain.com";`
3. Push to GitHub and deploy to Vercel.
