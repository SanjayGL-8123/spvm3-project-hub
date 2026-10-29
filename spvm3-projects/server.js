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

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// Serve the static front-end files from the same folder
app.use(express.static(path.join(__dirname)));

// ── DB Connection Pool ────────────────────────────────────
const pool = mysql.createPool({
  host    : process.env.DB_HOST     || 'localhost',
  port    : parseInt(process.env.DB_PORT || '3306'),
  user    : process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'spvm3_db',
  waitForConnections: true,
  connectionLimit   : 10,
});

// =============================================================
//  PUBLIC ROUTES
// =============================================================

// GET /api/projects  – list all active projects
app.get('/api/projects', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, description, frontend, backend, db_used, category, price FROM projects WHERE is_active = 1 ORDER BY id'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST /api/contact  – log a WhatsApp / Email click
app.post('/api/contact', async (req, res) => {
  const { project_id, method } = req.body;
  if (!project_id || !['whatsapp', 'email'].includes(method)) {
    return res.status(400).json({ error: 'Bad request' });
  }
  try {
    await pool.query(
      'INSERT INTO contact_requests (project_id, method) VALUES (?, ?)',
      [project_id, method]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// =============================================================
app.listen(PORT, () => {
  console.log(`✅  SPVM3 Project Hub API running at http://localhost:${PORT}`);
});
