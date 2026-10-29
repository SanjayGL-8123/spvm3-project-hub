// ============================================================
//  SPVM3 Project Hub  –  LOCAL DEV SERVER  (SQLite, no MySQL needed)
//  Start:  node spvm3-projects/server-local.js
//  Open:   http://localhost:3000
// ============================================================
const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

// ── SQLite DB (created automatically next to this file) ───────
const DB_PATH = path.join(__dirname, 'spvm3_local.db');
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');   // better performance

// ── Create tables ─────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,    description TEXT NOT NULL,
    frontend    TEXT,
    backend     TEXT,
    db_used     TEXT,
    category    TEXT DEFAULT 'General',
    price       REAL,
    is_active   INTEGER NOT NULL DEFAULT 1,
    created_at  TEXT DEFAULT (datetime('now')),
    updated_at  TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS contact_requests (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    method     TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

// ── Seed 74 projects (only if table is empty) ─────────────────
const count = db.prepare("SELECT COUNT(*) as c FROM projects").get().c;
if (count === 0) {
  const insert = db.prepare(
    "INSERT INTO projects (name, description, frontend, backend, db_used) VALUES (?,?,?,?,?)"
  );
  const seedMany = db.transaction((rows) => { for (const r of rows) insert.run(...r); });
  seedMany([
    ["invoice-shield-ai", "AI-based invoice fraud and anomaly detection tool.", "HTML, CSS, JavaScript", "Python (Flask)", "SQLite"],
    ["Billing-Management-System-SPVM-Tech-Solution", "Billing and invoice management system for SPVM Tech Solution.", "HTML, CSS, JavaScript", "None (client-side only)", "None (browser LocalStorage)"],
    ["spvm3-SentinelAI-AI-Based-Cyber-Threat-Early-Warning-Autonomous-SOC-Triage", "AI-based cyber threat early-warning system with autonomous SOC alert triage.", "HTML, CSS, JavaScript", "Python (FastAPI)", "SQLite"],
    ["AI-Powered-Continuous-Cyber-Risk-Quantification-and-Investment-Optimization-Platform", "Platform that continuously quantifies cyber risk in financial terms and optimises security investment.", "HTML, CSS, JavaScript", "Python (FastAPI)", "SQLite"],
    ["daily-tasks-app", "Daily to-do and task planner web app.", "HTML, CSS, JavaScript", "None (client-side only)", "None (browser LocalStorage)"],
    ["sanjayGL2006", "GitHub profile README (not a software project).", "N/A", "N/A", "N/A"],
    ["agentportfolio", "Portfolio site presenting AI agent projects.", "JavaScript", "None (client-side only)", "None"],
    ["SPVM3-placement-hub", "Placement hub for students: jobs, drives and preparation resources.", "TypeScript (React)", "Supabase (BaaS)", "PostgreSQL (Supabase)"],
    ["smart-library-assistant", "Smart assistant for searching and managing library books.", "HTML, CSS, JavaScript", "Python (Flask)", "SQLite"],
    ["Sanjay-OS", "Personal OS-style dashboard application.", "JavaScript", "Node.js", "None"],
    ["phishguard-ai", "ML-based phishing email and website detection.", "HTML, CSS, JavaScript", "Python (Flask)", "None (trained model files)"],
    ["SPVM3-Learning-Platform", "Online learning platform with courses and progress tracking.", "HTML, CSS, JavaScript", "Python (Flask)", "SQLite"],
    ["photo-recovery-tool", "Desktop tool to recover deleted photos from storage devices.", "Python (Tkinter GUI)", "Python", "None"],
    ["cyber-intel-agent", "AI agent that collects and summarises cyber threat intelligence.", "Command line / HTML", "Python", "None"],
    ["python-internship-projects", "Collection of Python programs from internship work.", "Console (no UI)", "Python", "None"],
    ["photo-to-doc-desktop", "Desktop app that converts photos of documents into editable files using OCR.", "Python (Tkinter GUI)", "Python", "None"],
    ["disk-recovery-forensics-tool", "Disk recovery and digital forensics analysis tool.", "Python (Tkinter GUI)", "Python", "None"],
    ["spvm3-chat", "Real-time web chat application.", "HTML, CSS, JavaScript", "JavaScript (Firebase)", "Firebase Realtime Database"],
    ["spvm3-spend-tracker", "Income and expense (spend) tracker.", "HTML, CSS, JavaScript", "None (client-side only)", "None (browser LocalStorage)"],
    ["SPVM3-Blog", "Blog platform with posts and admin management.", "HTML, CSS (Jinja)", "Python (Flask)", "SQLite"],
    ["spvm3-player", "Web-based music/media player.", "HTML, CSS, JavaScript", "None (client-side only)", "None"],
    ["spvm3-api-platform", "API platform for managing and testing APIs.", "HTML, CSS, JavaScript", "Python (FastAPI)", "SQLite"],
    ["cyber-response-platform", "Cyber incident response management platform.", "JavaScript (React)", "Node.js (Express)", "MongoDB"],
    ["student-htr-studio", "Student handwritten text recognition (HTR) studio.", "HTML, CSS, JavaScript", "Python (OCR/deep learning)", "None"],
    ["malicious-url-detector", "ML-based malicious URL detector.", "HTML, CSS, JavaScript", "Python (Flask)", "None (trained model files)"],
    ["smart-voice-notes", "Voice-to-text note taking app using speech recognition.", "JavaScript", "None (client-side only)", "None (browser LocalStorage)"],
    ["smart-parking-system", "Smart parking slot booking and management system.", "HTML, CSS, JavaScript", "Python (Flask)", "SQLite"],
    ["ai-paper-analyzer", "AI tool that analyses and summarises research papers.", "HTML, CSS, JavaScript", "Python (FastAPI)", "None"],
    ["spvm3-quiz-app", "Interactive quiz application.", "HTML, CSS, JavaScript", "None (client-side only)", "None"],
    ["SPVM3-tech-solution", "Company backend/website for SPVM Tech Solution.", "HTML, CSS, JavaScript", "Python (Flask)", "SQLite"],
    ["otp-signup", "Email/OTP-verified user signup system.", "HTML, CSS, JavaScript", "Python (Flask)", "SQLite"],
    ["SPVM3-code-notes", "Web notes site for coding concepts and snippets.", "HTML, CSS, JavaScript", "None (client-side only)", "None"],
    ["scanner-files", "Web tool for scanning and organising files.", "HTML, CSS, JavaScript", "None (client-side only)", "None"],
    ["social-analytics-ui", "Social media analytics dashboard UI.", "JavaScript (React)", "None (client-side only)", "None (sample data)"],
    ["-SPVM3-reelfind-react-fastapi", "Reel finder web app with React front end and FastAPI back end.", "JavaScript (React)", "Python (FastAPI)", "SQLite"],
    ["fastapi-react-todo", "To-do app built with React and FastAPI.", "JavaScript (React)", "Python (FastAPI)", "SQLite"],
    ["spvm3-task-app", "Task management web app.", "JavaScript (React)", "Node.js (Express)", "MongoDB"],
    ["Milano-infotech-internship", "Python work and exercises from the Milano Infotech internship.", "Console (no UI)", "Python", "None"],
    ["spvm3-code-editor", "Browser-based code editor.", "HTML, CSS, JavaScript", "None (client-side only)", "None"],
    ["smart-attendance-yolo", "Smart attendance system using YOLO object/face detection.", "Python (OpenCV GUI)", "Python", "SQLite / CSV"],
    ["spvm3-campus-placement", "Campus placement management system.", "HTML, CSS, JavaScript", "Python (Flask)", "SQLite"],
    ["spvm3-car-game", "Browser car racing game.", "HTML, CSS, JavaScript", "None (client-side only)", "None"],
    ["AIML-course-and-Practical", "AI/ML course notes and practical exercises (Jupyter notebooks).", "Jupyter Notebook", "Python", "None (CSV datasets)"],
    ["text2img-studio", "Text-to-image generation studio.", "HTML, CSS, JavaScript", "Python", "None"],
    ["DermAI-AI-Powered-Skincare-Diagnosis-App", "AI-powered skincare diagnosis app that analyses skin images.", "HTML, CSS, JavaScript", "Python (Flask, deep learning)", "None"],
    ["small-project", "Small starter web project.", "HTML, CSS", "None (client-side only)", "None"],
    ["SPVM3-tech-solution-websites", "Collection of websites built for SPVM Tech Solution clients.", "HTML, CSS, JavaScript", "None (client-side only)", "None"],
    ["sanjay-gl-website-carbon-intelligence", "Carbon footprint / carbon intelligence website.", "HTML, CSS, JavaScript", "None (client-side only)", "None"],
    ["resume-analyzer", "Resume analyser that checks resumes against keywords.", "HTML, CSS, JavaScript", "None (client-side only)", "None"],
    ["image-to-svg-converter", "Converts raster images to SVG vector graphics.", "JavaScript", "None (client-side only)", "None"],
    ["Paperless-Office-System", "Digital document management system to reduce paper use.", "JavaScript (React)", "Node.js (Express)", "MongoDB"],
    ["bluetooth-chat", "Bluetooth-based chat mobile app.", "Dart (Flutter)", "Dart (Flutter, device Bluetooth)", "None (on-device)"],
    ["DataGauge-Dataset-Quality-Monitoring-System", "Dataset quality monitoring and reporting system.", "Python (Streamlit)", "Python", "None"],
    ["accident-risk-prediction", "ML-based road accident risk prediction.", "HTML, CSS, JavaScript", "Python (Flask), scikit-learn", "None (CSV dataset)"],
    ["prop-manager-dash-95721", "Property management dashboard.", "TypeScript (React)", "Supabase (BaaS)", "PostgreSQL (Supabase)"],
    ["portfolio", "Personal portfolio website.", "HTML, CSS, JavaScript", "None (client-side only)", "None"],
    ["expense-tracker", "Expense tracker web app.", "HTML, CSS, JavaScript", "None (client-side only)", "None (browser LocalStorage)"],
    ["-Handcrafted-with-Love-Pure-Weaves", "Online store website for handcrafted handloom products.", "HTML, CSS", "None (client-side only)", "None"],
    ["Surya-chatbot", "AI chatbot web app.", "HTML, CSS, JavaScript", "Node.js", "None"],
    ["AI-Agent-used-google-api", "AI agent that uses Google APIs to automate tasks.", "Command line", "Python", "None (Google services)"],
    ["pixel-perfect", "Pixel-art / UI design web app.", "TypeScript (React)", "None (client-side only)", "None"],
    ["srimariyammatemple-ad2fd3a5", "Website for Sri Mariyamma Temple.", "TypeScript (React)", "Supabase (BaaS)", "PostgreSQL (Supabase)"],
    ["bmi_calculator", "BMI calculator.", "HTML, CSS, JavaScript", "None (client-side only)", "None"],
    ["pizza-shop-website", "Pizza shop website.", "HTML, CSS", "None (client-side only)", "None"],
    ["maya-angelou-tribute", "Tribute web page for Maya Angelou.", "HTML, CSS", "None (client-side only)", "None"],
    ["vault-secure-auth", "Secure login/authentication demo.", "HTML, CSS, JavaScript", "None (client-side only)", "None (browser LocalStorage)"],
    ["daily-task-nexus", "Daily task manager web app.", "HTML, CSS, JavaScript", "None (client-side only)", "None (browser LocalStorage)"],
    ["web-calculator-js", "JavaScript web calculator.", "HTML, CSS, JavaScript", "None (client-side only)", "None"],
    ["temp-convert-web-app", "Temperature converter web app.", "HTML, CSS, JavaScript", "None (client-side only)", "None"],
    ["vpn-landing-page1", "VPN landing page.", "HTML, CSS", "None (client-side only)", "None"],
    ["srimariyammatemple", "Website for Sri Mariyamma Temple (earlier version).", "TypeScript (React)", "Supabase (BaaS)", "PostgreSQL (Supabase)"],
    ["Pure-Weaves", "Handloom products website (Pure Weaves).", "HTML, CSS", "None (client-side only)", "None"],
    ["Registration-form", "User registration form.", "HTML, CSS, JavaScript", "None (client-side only)", "None"],
    ["digital-board-duel", "Two-player digital board game.", "TypeScript (React)", "Supabase (BaaS)", "PostgreSQL (Supabase)"],
  ]);
  console.log("✅ 74 projects seeded into SQLite.");
}

// ── Middleware ────────────────────────────────────────────────
app.use(cors({
  origin: (origin, cb) => cb(null, true),   // allow all origins incl. file://
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname)));   // serve HTML/JS/CSS

// ── Routes ────────────────────────────────────────────────────

// PUBLIC: list active projects
app.get('/api/projects', (req, res) => {
  const rows = db.prepare(
    "SELECT id, name, description, frontend, backend, db_used, category, price FROM projects WHERE is_active=1 ORDER BY id"
  ).all();
  res.json(rows);
});

// PUBLIC: log contact click
app.post('/api/contact', (req, res) => {
  const { project_id, method } = req.body;
  if (!project_id || !['whatsapp', 'email'].includes(method))
    return res.status(400).json({ error: 'Bad request' });
  db.prepare("INSERT INTO contact_requests (project_id, method) VALUES (?,?)").run(project_id, method);
  res.json({ ok: true });
});

// ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('┌──────────────────────────────────────────────┐');
  console.log('│  SPVM3 Project Hub  –  Local Dev Server      │');
  console.log('├──────────────────────────────────────────────┤');
  console.log(`│  Public page : http://localhost:${PORT}           │`);
  console.log('└──────────────────────────────────────────────┘');
  console.log('');
});

