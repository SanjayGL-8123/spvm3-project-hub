// ============================================================
//  SPVM3 Project Hub  –  LOCAL DEV SERVER (Pure JS, zero setup)
//  Start:  npm start
//  Open:   http://localhost:3000
// ============================================================
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');
const vm      = require('vm');

const app  = express();
const PORT = process.env.PORT || 3000;

// Load 74 projects from projects-data.js
let projects = [];
try {
  const fileContent = fs.readFileSync(path.join(__dirname, 'projects-data.js'), 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(fileContent, sandbox);
  projects = sandbox.window.PROJECTS_DATA || [];
} catch (e) {
  console.error('Error loading projects data:', e.message);
}

// ── Middleware ────────────────────────────────────────────────
app.use(cors({
  origin: (origin, cb) => cb(null, true),
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ── Routes ────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// REST API: get projects
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// REST API: contact log
app.post('/api/contact', (req, res) => {
  const { project_id, method } = req.body || {};
  if (!project_id || !['whatsapp', 'email'].includes(method)) {
    return res.status(400).json({ error: 'Bad request' });
  }
  res.json({ ok: true, message: 'Contact logged' });
});

// 404 Fallback
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(PORT, () => {
  console.log('');
  console.log('┌──────────────────────────────────────────────┐');
  console.log('│  SPVM3 Project Hub  –  Local Dev Server      │');
  console.log('├──────────────────────────────────────────────┤');
  console.log(`│  Public page : http://localhost:${PORT}           │`);
  console.log('└──────────────────────────────────────────────┘');
  console.log('');
});
