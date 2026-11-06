// ============================================================
//  SPVM3 Project Hub  –  Client Application Logic
//  Author: Sanjay G L (SPVM3 Tech Solution)
//  Contact: WhatsApp +91 8123981877 | spvm3techsolution@gmail.com
// ============================================================

const WHATSAPP_NUMBER = "918123981877";
const CONTACT_EMAIL   = "spvm3techsolution@gmail.com";

// Auto-detect API base (works on Vercel serverless, local Express, or file://)
const API = (typeof location !== 'undefined' && location.protocol === 'file:') ? 'http://localhost:3000' : '';

let allProjects = [];
let currentFilter = 'all';
let currentQuery = '';
let currentSort = 'id-asc';

// ── Utility: Escape HTML to prevent XSS ──────────────────────
function escapeHtml(text = '') {
  const d = document.createElement('div');
  d.textContent = String(text ?? '');
  return d.innerHTML;
}

// ── Fetch Helper ──────────────────────────────────────────────
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

// ── Categorize a Project ─────────────────────────────────────
function getProjectCategory(p) {
  const text = `${p.name} ${p.description} ${p.frontend} ${p.backend} ${p.db_used}`.toLowerCase();
  const cats = [];
  if (/\b(ai|ml|yolo|cnn|ocr|deep learning|machine learning|model|classifier|classification|detection|recognition|nlp|vision|fraud)\b/i.test(text)) {
    cats.push('ai');
  }
  if (/\b(cyber|threat|soc|forensics|phish|malicious|vault|auth|security|scanner|keylogger|encryption|steganography)\b/i.test(text)) {
    cats.push('cyber');
  }
  if (/\b(react|typescript|next\.js|frontend)\b/i.test(text)) {
    cats.push('react');
  }
  if (/\b(python|flask|fastapi|django)\b/i.test(text)) {
    cats.push('python');
  }
  if (/\b(flutter|dart|mobile|android|ios)\b/i.test(text)) {
    cats.push('mobile');
  }
  if (cats.length === 0) {
    cats.push('tools');
  }
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
        <button class="btn-copy-card" onclick="copyProjectName('${escapeHtml(p.name)}', this)" title="Copy project title" aria-label="Copy project title: ${escapeHtml(p.name)}">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          <span class="copy-lbl">Copy</span>
        </button>
      </div>

      <h3 class="card-title">${escapeHtml(p.name)}</h3>
      <p class="card-desc">${escapeHtml(p.description)}</p>

      <div class="tech-badges" aria-label="Technologies used">
        ${p.frontend && p.frontend !== 'N/A' ? `<span class="badge-pill badge-fe" title="Frontend: ${escapeHtml(p.frontend)}"><svg class="badge-svg" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg> ${escapeHtml(p.frontend)}</span>` : ''}
        ${p.backend && p.backend !== 'N/A' && p.backend !== 'None (client-side only)' ? `<span class="badge-pill badge-be" title="Backend: ${escapeHtml(p.backend)}"><svg class="badge-svg" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg> ${escapeHtml(p.backend)}</span>` : ''}
        ${p.db_used && p.db_used !== 'N/A' && p.db_used !== 'None' ? `<span class="badge-pill badge-db" title="Database: ${escapeHtml(p.db_used)}"><svg class="badge-svg" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg> ${escapeHtml(p.db_used)}</span>` : ''}
      </div>

      <div class="card-actions">
        <button class="btn-action btn-card-wa" onclick="contactWhatsApp(${p.id}, '${escapeHtml(p.name)}')" title="Inquire via WhatsApp" aria-label="Inquire via WhatsApp for ${escapeHtml(p.name)}">
          <svg class="btn-svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.831.498 3.548 1.365 5.027L2 22l5.085-1.334a10.007 10.007 0 0 0 4.946 1.365c5.536 0 10.031-4.495 10.031-10.031C22.062 6.495 17.567 2 12.031 2zm5.733 14.156c-.238.673-1.18 1.258-1.636 1.306-.437.046-.99.072-3.14-.817-2.748-1.135-4.52-3.92-4.656-4.103-.136-.183-1.113-1.482-1.113-2.827 0-1.345.703-2.008.953-2.28.24-.263.535-.33.714-.33.178 0 .357.002.513.01.166.009.387-.063.606.463.226.541.77 1.88.837 2.018.067.137.112.3.022.48-.09.18-.135.292-.268.45-.134.156-.282.35-.403.47-.134.135-.274.281-.118.549.157.268.697 1.15 1.494 1.86 1.025.914 1.89 1.198 2.158 1.332.268.134.425.112.582-.068.157-.18.67-.78.849-1.048.179-.268.357-.223.603-.134.246.09 1.562.736 1.83.87.268.134.446.201.513.313.067.112.067.647-.171 1.32z"/></svg>
          <span>WhatsApp</span>
        </button>
        <button class="btn-action btn-card-em" onclick="contactEmail(${p.id}, '${escapeHtml(p.name)}')" title="Inquire via Email" aria-label="Inquire via Email for ${escapeHtml(p.name)}">
          <svg class="btn-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          <span>Email</span>
        </button>
      </div>
    </article>
  `).join('');
}

// ── Contact Actions ──────────────────────────────────────────
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

// ── Scroll Progress, Sticky Header Blur, & Back to Top ───────
function initScrollFeatures() {
  const header = document.getElementById('siteHeader');
  const progressBar = document.getElementById('scrollProgress');
  const bttBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || window.pageYOffset;
    if (header) {
      if (scrollY > 15) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollY / (docHeight || 1)) * 100;
    if (progressBar) progressBar.style.width = progress + '%';

    if (bttBtn) {
      if (scrollY > 300) {
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

// ── Policy Modals ─────────────────────────────────────────────
const POLICIES = {
  privacy: {
    title: 'Privacy Policy',
    body: `
      <h4>Information We Collect</h4>
      <p>SPVM3 Tech Solution respects your privacy. We only store essential browser preferences locally on your machine (such as your chosen light/dark theme and cookie acknowledgment). We do not collect personal browsing history or sell your personal data to third parties.</p>
      <h4>Direct Communication</h4>
      <p>When you contact us through WhatsApp or Email, your message and contact details are used solely to fulfill your project inquiry, provide technical consultation, and deliver software updates.</p>
      <h4>Third-Party Services</h4>
      <p>Our website is hosted on Vercel. Essential infrastructure performance telemetry may be logged in accordance with standard hosting security practices.</p>
    `
  },
  terms: {
    title: 'Terms of Service',
    body: `
      <h4>Software Licensing</h4>
      <p>All software solutions, repositories, and documentation available through SPVM3 Project Hub are authored and maintained by SPVM3 Tech Solution and Sanjay G L.</p>
      <h4>Permitted Use</h4>
      <p>Source code acquired from SPVM3 Project Hub is delivered for educational, personal, research, or agreed commercial deployment purposes as specified during consultation.</p>
      <h4>Consultation & Customization</h4>
      <p>Custom software features, architecture integrations, or deployment on private infrastructure are provided under agreed terms via direct developer consultation.</p>
    `
  },
  refund: {
    title: 'Refund & Delivery Policy',
    body: `
      <h4>Pricing on Request</h4>
      <p>Pricing is available on request via WhatsApp (+91 8123981877) or Email (spvm3techsolution@gmail.com). Source code, documentation and deployment assistance are included with every project package.</p>
      <h4>Delivery Timeline</h4>
      <p>Delivery is provided within minutes after inquiry verification through a secure ZIP transfer or private download link.</p>
      <h4>Refunds & Support</h4>
      <p>Because software deliverables include complete source code and technical documentation, inquiries are verified prior to transfer. If you encounter any technical bug or setup difficulty, Sanjay G L provides dedicated setup help, code adjustments, and deployment assistance to ensure the application runs smoothly on your target environment.</p>
    `
  }
};

function openPolicyModal(type) {
  const modal = document.getElementById('policyModal');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');
  const data = POLICIES[type];
  if (!modal || !data) return;

  if (title) title.textContent = data.title;
  if (body) body.innerHTML = data.body;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePolicyModal() {
  const modal = document.getElementById('policyModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function closeModalOnBackdrop(e) {
  if (e.target && e.target.id === 'policyModal') {
    closePolicyModal();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePolicyModal();
  }
});

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
  } catch (_) {
    // API failed or offline; fallback to isomorphic dataset
  }

  // Fallback to window.PROJECTS_DATA if API returned empty
  if (!allProjects || allProjects.length === 0) {
    allProjects = window.PROJECTS_DATA || [];
  }

  const totalCountEl = document.getElementById('totalCount');
  if (totalCountEl) totalCountEl.textContent = allProjects.length;

  const countIndicator = document.getElementById('projectCount');
  if (countIndicator) {
    countIndicator.textContent = `Showing ${allProjects.length} of ${allProjects.length} projects`;
  }

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
}

// Auto-run when DOM is loaded
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderPublic);
  } else {
    renderPublic();
  }
}
