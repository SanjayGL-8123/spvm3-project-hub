// ====== CHANGE THESE (used for WhatsApp / Email links) ======
const WHATSAPP_NUMBER = "918123981877";            // Sanjay G L
const CONTACT_EMAIL   = "spvm3techsolution@gmail.com";
// ==============================================================

// Auto-detect: if opened as file://, point to the local server.
// When deployed, change this to your production API URL.
const API = (location.protocol === 'file:')
  ? 'http://localhost:3000'
  : '';    // empty = same origin (served by server-local.js)

// ── Fetch helper ───────────────────────────────────────────────
async function apiFetch(path, options = {}) {
  const res = await fetch(API + path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || res.statusText);
  }
  return res.json();
}

function escapeHtml(text = "") {
  const d = document.createElement("div");
  d.textContent = String(text);
  return d.innerHTML;
}

// ─────────────────────────────────────────────────────────────
//  PUBLIC PAGE  (index.html)
// ─────────────────────────────────────────────────────────────
async function renderPublic() {
  const box = document.getElementById("projectList");
  let projects = [];

  // Try fetching from the backend API first
  try {
    projects = await apiFetch("/api/projects");
  } catch (err) {
    console.warn("Backend API not reachable, using fallback projects data:", err.message);
  }

  // If API was unreachable or empty, use fallback bundled data
  if (!projects || projects.length === 0) {
    projects = window.PROJECTS_DATA || [];
  }

  if (projects.length === 0) {
    box.innerHTML = '<div class="empty">No projects found.</div>';
    return;
  }

  box.innerHTML = projects.map(p => `
    <div class="card">
      <h3>${escapeHtml(p.name)}</h3>
      <p>${escapeHtml(p.description)}</p>
      ${p.frontend ? `<small>🖥 ${escapeHtml(p.frontend)}</small><br>` : ""}
      ${p.backend  ? `<small>⚙️ ${escapeHtml(p.backend)}</small><br>` : ""}
      ${p.db_used && p.db_used !== 'None' && p.db_used !== 'N/A'
          ? `<small>🗄 ${escapeHtml(p.db_used)}</small>` : ""}
      <div style="margin-top:10px">
        <button onclick="contactWhatsApp(${p.id},'${escapeHtml(p.name)}')">WhatsApp</button>
        <button class="email" onclick="contactEmail(${p.id},'${escapeHtml(p.name)}')">Email</button>
      </div>
    </div>
  `).join("");
}

function contactWhatsApp(id, name) {
  logContact(id, "whatsapp");
  const msg = encodeURIComponent("Hi, I am interested in your project: " + name);
  window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + msg, "_blank");
}

function contactEmail(id, name) {
  logContact(id, "email");
  const subject = encodeURIComponent("Interested in: " + name);
  const body    = encodeURIComponent("Hi, I am interested in your project: " + name);
  window.open(
    "https://mail.google.com/mail/?view=cm&to=" + CONTACT_EMAIL +
    "&su=" + subject + "&body=" + body, "_blank"
  );
}

async function logContact(id, method) {
  try { await apiFetch("/api/contact", { method: "POST", body: JSON.stringify({ project_id: id, method }) }); }
  catch (_) { /* non-critical */ }
}

