// ============================================================
//  SPVM3 Project Hub  –  Express + MySQL REST API
//  Start:  node server.js
//  Env:    copy .env.example → .env and fill in your values
// ============================================================
require('dotenv').config();
const express  = require('express');
const mysql    = require('mysql2/promise');
const cors     = require('cors');
const path     = require('path');
const fs       = require('fs');

const app  = express();
const PORT = process.env.PORT || 3000;

// Load static fallback projects
let staticProjects = [];
try {
  staticProjects = require('./public/projects-data.js');
} catch (_) {}

// ── Middleware ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// Serve public static assets
app.use(express.static(path.join(__dirname, 'public')));

// ── DB Connection Pool ──────────────────────────────────────
let pool = null;
try {
  pool = mysql.createPool({
    host    : process.env.DB_HOST     || 'localhost',
    port    : parseInt(process.env.DB_PORT || '3306'),
    user    : process.env.DB_USER     || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME     || 'spvm3_db',
    waitForConnections: true,
    connectionLimit   : 10,
  });
} catch (_) {}

// =============================================================
//  PUBLIC ROUTES
// =============================================================

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET /api/projects – list all active projects
app.get('/api/projects', async (req, res) => {
  if (pool) {
    try {
      const [rows] = await pool.query(
        'SELECT id, name, description, frontend, backend, db_used FROM projects WHERE is_active = 1 ORDER BY id'
      );
      if (Array.isArray(rows) && rows.length > 0) {
        return res.json(rows);
      }
    } catch (_) {}
  }
  return res.json(staticProjects);
});

// POST /api/contact – log a WhatsApp / Email click
app.post('/api/contact', async (req, res) => {
  const { project_id, method } = req.body || {};
  if (!project_id || !['whatsapp', 'email'].includes(method)) {
    return res.status(400).json({ error: 'Bad request' });
  }
  if (pool) {
    try {
      await pool.query(
        'INSERT INTO contacts (project_id, contact_method) VALUES (?, ?)',
        [project_id, method]
      );
    } catch (_) {}
  }
  res.json({ ok: true, message: 'Contact logged' });
});

// 404 Fallback
app.use((req, res) => {
  const p404 = path.join(__dirname, 'public', '404.html');
  if (fs.existsSync(p404)) {
    return res.status(404).sendFile(p404);
  }
  res.status(404).send('<h1>404 Not Found</h1>');
});

// =============================================================
app.listen(PORT, () => {
  console.log(`✅  SPVM3 Project Hub API running at http://localhost:${PORT}`);
});
