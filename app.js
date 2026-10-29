// ============================================================
//  SPVM3 Project Hub  –  Client Application Logic
//  Author: Sanjay G L (SPVM Tech Solution)
//  Contact: 8123981877 | spvm3techsolution@gmail.com
// ============================================================

const WHATSAPP_NUMBER = "918123981877";
const CONTACT_EMAIL   = "spvm3techsolution@gmail.com";

// Auto-detect API base (works on Vercel serverless, local Express, or file://)
const API = (typeof location !== 'undefined' && location.protocol === 'file:') ? 'http://localhost:3000' : '';

let allProjects = [];
let currentFilter = 'all';
let currentQuery = '';
let currentSort = 'id-asc';

// ── Utility: Escape HTML to prevent XSS ───────────────────────
function escapeHtml(text = '') {
  const d = document.createElement('div');
  d.textContent = String(text ?? '');
  return d.innerHTML;
}

// ── Fetch Helper ───────────────────────────────────────────────
async function apiFetch(path, options = {}) {
  const res = await fetch(API + path, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || res.statusText);
  }
  return res.json();
}

// ── Categorize a Project ──────────────────────────────────────
function getProjectCategory(p) {
  const text = `${p.name} ${p.description} ${p.frontend} ${p.backend} ${p.db_used}`.toLowerCase();
  const cats = [];
  if (text.includes('ai') || text.includes('ml') || text.includes('model') || text.includes('yolo') || text.includes('deep learning') || text.includes('ocr') || text.includes('paper')) {
    cats.push('ai');
  }
  if (text.includes('cyber') || text.includes('threat') || text.includes('soc') || text.includes('forensics') || text.includes('phish') || text.includes('malicious') || text.includes('vault') || text.includes('auth')) {
    cats.push('cyber');
  }
  if (text.includes('react') || text.includes('typescript')) {
    cats.push('react');
  }
  if (text.includes('python') || text.includes('flask') || text.includes('fastapi')) {
    cats.push('python');
  }
  if (text.includes('flutter') || text.includes('dart') || text.includes('mobile')) {
    cats.push('mobile');
  }
  if (cats.length === 0) cats.push('tools');
  return cats;
}

// ── Render Filtered & Sorted Projects ─────────────────────────
function applyFiltersAndRender() {
  const box = document.getElementById('projectList');
  const countEl = document.getElementById('projectCount');
  const resetBtn = document.getElementById('resetFilters');
  if (!box) return;

  const isFiltered = currentFilter !== 'all' || currentQuery.trim().length > 0;
  if (resetBtn) {
    resetBtn.style.display = isFiltered ? 'inline-block' : 'none';
  }

  let filtered = allProjects.filter(p => {
    // 1. Category filter
    if (currentFilter !== 'all') {
      const cats = getProjectCategory(p);
      if (!cats.includes(currentFilter)) return false;
    }
    // 2. Search query filter
    if (currentQuery.trim()) {
      const q = currentQuery.toLowerCase().trim();
      const match =
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.frontend && p.frontend.toLowerCase().includes(q)) ||
        (p.backend && p.backend.toLowerCase().includes(q)) ||
        (p.db_used && p.db_used.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  // 3. Sorting
  filtered.sort((a, b) => {
    if (currentSort === 'name-asc') return a.name.localeCompare(b.name);
    if (currentSort === 'name-desc') return b.name.localeCompare(a.name);
    if (currentSort === 'id-desc') return b.id - a.id;
    return a.id - b.id; // default id-asc
  });

  // Update counter
  if (countEl) {
    countEl.textContent = `Showing ${filtered.length} of ${allProjects.length} projects`;
  }

  // Render cards or empty state
  if (filtered.length === 0) {
    box.innerHTML = `
      <div class="empty-state" role="status">
        <div class="empty-icon">🔍</div>
        <h3 class="empty-title">No matching projects found</h3>
        <p class="empty-desc">Try searching for a different keyword or select another category filter.</p>
        <button class="btn-action btn-card-wa" style="margin: 0 auto; display: inline-flex;" onclick="resetAllFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  box.innerHTML = filtered.map(p => `
    <article class="card" data-id="${p.id}" tabindex="0">
      <div class="card-top">
        <span class="card-id">#${p.id}</span>
        <button class="btn-copy-card" onclick="copyProjectName('${escapeHtml(p.name)}', this)" title="Copy project title" aria-label="Copy project title">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          <span class="copy-lbl">Copy</span>
        </button>
      </div>

      <h2 class="card-title">${escapeHtml(p.name)}</h2>
      <p class="card-desc">${escapeHtml(p.description)}</p>

      <div class="tech-badges" aria-label="Technologies used">
        ${p.frontend && p.frontend !== 'N/A' ? `<span class="badge-pill badge-fe" title="Frontend: ${escapeHtml(p.frontend)}">🖥 ${escapeHtml(p.frontend)}</span>` : ''}
        ${p.backend && p.backend !== 'N/A' && p.backend !== 'None (client-side only)' ? `<span class="badge-pill badge-be" title="Backend: ${escapeHtml(p.backend)}">⚙️ ${escapeHtml(p.backend)}</span>` : ''}
        ${p.db_used && p.db_used !== 'N/A' && p.db_used !== 'None' ? `<span class="badge-pill badge-db" title="Database: ${escapeHtml(p.db_used)}">🗄 ${escapeHtml(p.db_used)}</span>` : ''}
      </div>

      <div class="card-actions">
        <button class="btn-action btn-card-wa" onclick="contactWhatsApp(${p.id}, '${escapeHtml(p.name)}')">
          <span>💬</span> WhatsApp
        </button>
        <button class="btn-action btn-card-em" onclick="contactEmail(${p.id}, '${escapeHtml(p.name)}')">
          <span>✉️</span> Email
        </button>
      </div>
    </article>
  `).join('');
}

// ── Contact Actions ───────────────────────────────────────────
function contactWhatsApp(id, name) {
  logContact(id, 'whatsapp');
  const msg = encodeURIComponent(`Hi Sanjay, I am interested in your project: "${name}" (#${id}) from SPVM3 Project Hub.`);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer');
}

function contactEmail(id, name) {
  logContact(id, 'email');
  const subject = encodeURIComponent(`Inquiry for project: ${name} (#${id})`);
  const body    = encodeURIComponent(`Hi Sanjay,\n\nI am interested in your project "${name}" (#${id}) on SPVM3 Project Hub.\nPlease share the source code details, setup instructions, and pricing.\n\nThank you!`);
  window.open(`https://mail.google.com/mail/?view=cm&to=${CONTACT_EMAIL}&su=${subject}&body=${body}`, '_blank', 'noopener,noreferrer');
}

async function logContact(id, method) {
  try {
    await apiFetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({ project_id: id, method })
    });
  } catch (_) {
    // Non-critical contact logging
  }
}

// ── Copy Project Title Helper ─────────────────────────────────
function copyProjectName(name, btn) {
  navigator.clipboard.writeText(name).then(() => {
    const label = btn.querySelector('.copy-lbl');
    const oldText = label ? label.textContent : '';
    btn.classList.add('copied');
    if (label) label.textContent = 'Copied!';
    setTimeout(() => {
      btn.classList.remove('copied');
      if (label) label.textContent = oldText;
    }, 2000);
  }).catch(() => {});
}

// ── Reset Filters ─────────────────────────────────────────────
function resetAllFilters() {
  currentFilter = 'all';
  currentQuery = '';
  currentSort = 'id-asc';

  const searchInput = document.getElementById('projectSearch');
  if (searchInput) searchInput.value = '';

  const sortSelect = document.getElementById('projectSort');
  if (sortSelect) sortSelect.value = 'id-asc';

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === 'all');
  });

  applyFiltersAndRender();
}

// ── Theme Switcher ────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('spvm3_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);

  const toggleBtn = document.getElementById('themeToggle');
  if (toggleBtn) {
    toggleBtn.onclick = toggleTheme;
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('spvm3_theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('themeIcon');
  if (icon) {
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// ── Scroll Progress & Back to Top ─────────────────────────────
function initScrollFeatures() {
  const progressBar = document.getElementById('scrollProgress');
  const bttBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (window.scrollY / (docHeight || 1)) * 100;
    if (progressBar) progressBar.style.width = progress + '%';

    if (bttBtn) {
      if (window.scrollY > 300) {
        bttBtn.classList.add('visible');
      } else {
        bttBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (bttBtn) {
    bttBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// ── Cookie Banner ─────────────────────────────────────────────
function initCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  const okBtn = document.getElementById('cookieOk');
  if (!banner) return;

  if (!localStorage.getItem('spvm3_cookie_ack')) {
    banner.style.display = 'flex';
  }
  if (okBtn) {
    okBtn.addEventListener('click', () => {
      banner.style.display = 'none';
      localStorage.setItem('spvm3_cookie_ack', 'true');
    });
  }
}

// ── FAQ Accordion ─────────────────────────────────────────────
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-question');
    if (q) {
      q.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(other => other.classList.remove('active'));
        if (!isOpen) item.classList.add('active');
      });
    }
  });
}

// ── Master Public Init ────────────────────────────────────────
async function renderPublic() {
  initTheme();
  initScrollFeatures();
  initCookieBanner();
  initFAQ();

  // Try API first
  try {
    const data = await apiFetch('/api/projects');
    if (Array.isArray(data) && data.length > 0) {
      allProjects = data;
    }
  } catch (err) {
    console.warn('API fetch failed, falling back to embedded dataset:', err.message);
  }

  // Fallback to window.PROJECTS_DATA if API returned empty/failed
  if (!allProjects || allProjects.length === 0) {
    allProjects = window.PROJECTS_DATA || [];
  }

  const totalCountEl = document.getElementById('totalCount');
  if (totalCountEl) totalCountEl.textContent = allProjects.length;

  // Setup search input listener
  const searchInput = document.getElementById('projectSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentQuery = e.target.value;
      applyFiltersAndRender();
    });
  }

  // Setup sort dropdown listener
  const sortSelect = document.getElementById('projectSort');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      applyFiltersAndRender();
    });
  }

  // Setup filter pills
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter || 'all';
      applyFiltersAndRender();
    });
  });

  applyFiltersAndRender();
}

// Auto-run when DOM is loaded
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderPublic);
  } else {
    renderPublic();
  }
}
