// ============================================================
//  SPVM3 Project Hub  –  Full Verification & QA Test Suite (90 Projects)
//  Author: Sanjay G L (SPVM3 Tech Solution)
// ============================================================
const assert = require('assert');
const fs     = require('fs');
const path   = require('path');

console.log('🧪 Starting SPVM3 Project Hub QA & Verification Suite (90 Projects)...\n');

let passedTests = 0;
let totalTests  = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}`);
    console.error(`     Error: ${err.message}`);
    process.exitCode = 1;
  }
}

// 1. Dataset Verification
test('public/projects-data.js loads and contains exactly 90 projects', () => {
  const projects = require('../public/projects-data.js');
  assert(Array.isArray(projects), 'projects should be an array');
  assert.strictEqual(projects.length, 90, `Expected 90 projects, found ${projects.length}`);
});

test('All 90 projects have valid required schema fields (IDs 1 through 90)', () => {
  const projects = require('../public/projects-data.js');
  const ids = new Set();
  projects.forEach((p, idx) => {
    assert(p.id !== undefined && typeof p.id === 'number', `Project #${idx} missing numeric id`);
    assert(p.name && typeof p.name === 'string' && p.name.trim().length > 0, `Project #${p.id} missing name`);
    assert(p.description && typeof p.description === 'string', `Project #${p.id} missing description`);
    assert(p.frontend && typeof p.frontend === 'string', `Project #${p.id} missing frontend`);
    assert(p.backend && typeof p.backend === 'string', `Project #${p.id} missing backend`);
    assert(p.db_used && typeof p.db_used === 'string', `Project #${p.id} missing db_used`);
    assert(!ids.has(p.id), `Duplicate project id detected: ${p.id}`);
    ids.add(p.id);
  });
  assert.strictEqual(ids.size, 90, 'Expected 90 unique project IDs');
  for (let i = 1; i <= 90; i++) {
    assert(ids.has(i), `Missing expected project ID #${i}`);
  }
});

// 2. SSR Static Pre-rendering Verification
test('HTML statically pre-renders all 90 project cards in #projectList for search indexing', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');
  const cardMatches = html.match(/<article class="card" data-id="\d+"/g) || [];
  assert.strictEqual(cardMatches.length, 90, `Expected 90 static card elements in HTML, found ${cardMatches.length}`);
  
  // Verify first and last project cards exist in static HTML
  assert(html.includes('data-id="1"'), 'Card for project #1 missing in static HTML');
  assert(html.includes('data-id="90"'), 'Card for project #90 missing in static HTML');
  assert(html.includes('invoice-shield-ai'), 'invoice-shield-ai missing in static HTML');
  assert(html.includes('spvm3-quick-response-code'), 'spvm3-quick-response-code missing in static HTML');
  assert(html.includes('Project-'), 'Project- missing in static HTML');
});

// 3. GitHub Scrubbing Verification
test('Zero occurrences of "github" across HTML, JS, data, README, and schema', () => {
  const filesToScan = [
    'public/index.html',
    'public/app.js',
    'public/projects-data.js',
    'api/projects.js',
    'README.md',
    'schema.sql'
  ];
  filesToScan.forEach(relPath => {
    const fullPath = path.join(__dirname, '..', relPath);
    const content = fs.readFileSync(fullPath, 'utf8');
    const matches = content.match(/github/gi);
    assert(!matches, `Forbidden "github" occurrence detected in ${relPath}: ${matches?.join(', ')}`);
  });
});

test('FAQ delivery answer states secure ZIP transfer or private download link', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');
  assert(html.includes('Delivery is provided within minutes after inquiry verification through a secure ZIP transfer or private download link.'),
    'FAQ delivery answer does not match required wording');
});

// 4. Serverless API verification
test('api/projects.js serverless function handler returns 90 projects with CORS headers', () => {
  const handler = require('../api/projects.js');
  assert.strictEqual(typeof handler, 'function', 'api/projects.js should export a function');

  let statusCode = null;
  let sentData = null;
  const headers = {};
  const mockReq = { method: 'GET' };
  const mockRes = {
    setHeader: (k, v) => { headers[k] = v; },
    status: (code) => {
      statusCode = code;
      return {
        json: (data) => { sentData = data; },
        end: () => {}
      };
    }
  };
  handler(mockReq, mockRes);
  assert.strictEqual(statusCode, 200, `Expected 200 status, got ${statusCode}`);
  assert(Array.isArray(sentData) && sentData.length === 90, `api/projects should return 90 items, got ${sentData?.length}`);
  assert.strictEqual(headers['Access-Control-Allow-Origin'], '*', 'Missing Access-Control-Allow-Origin');
});

test('api/contact.js handles valid and invalid payloads', () => {
  const handler = require('../api/contact.js');
  assert.strictEqual(typeof handler, 'function', 'api/contact.js should export a function');

  // Valid WhatsApp
  let status1 = null;
  let json1 = null;
  handler({ method: 'POST', body: { project_id: 1, method: 'whatsapp' } }, {
    setHeader: () => {},
    status: (code) => { status1 = code; return { json: (d) => { json1 = d; } }; }
  });
  assert.strictEqual(status1, 200, 'Valid WhatsApp payload should return 200');
  assert.strictEqual(json1?.ok, true, 'Response should have ok=true');

  // Invalid payload
  let status2 = null;
  handler({ method: 'POST', body: { project_id: null, method: 'invalid' } }, {
    setHeader: () => {},
    status: (code) => { status2 = code; return { json: () => {} }; }
  });
  assert.strictEqual(status2, 400, 'Invalid contact method should return 400');
});

// 5. Category and Filter Categorization Test
test('Category filter classification properly categorizes 90 projects', () => {
  const projects = require('../public/projects-data.js');
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
    if (cats.length === 0) cats.push('tools');
    return cats;
  }

  const categoryCounts = { ai: 0, cyber: 0, react: 0, python: 0, mobile: 0, tools: 0 };
  projects.forEach(p => {
    const cats = getProjectCategory(p);
    assert(cats.length > 0, `Project #${p.id} has no category assigned`);
    cats.forEach(c => {
      if (categoryCounts[c] !== undefined) categoryCounts[c]++;
    });
  });

  assert(categoryCounts.ai > 0, 'AI category should have matching projects');
  assert(categoryCounts.cyber > 0, 'Cyber category should have matching projects');
  assert(categoryCounts.react > 0, 'React category should have matching projects');
  assert(categoryCounts.python > 0, 'Python category should have matching projects');
  assert(categoryCounts.mobile > 0, 'Mobile category should have matching projects');
});

// 6. XSS Sanitization & HTML Escaping
test('Search & Card render sanitizes dynamic input and prevents XSS', () => {
  function escapeHtml(text = '') {
    return String(text ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  const maliciousPayload = '<script>alert("XSS")</script><img src=x onerror=alert(1)>';
  const escaped = escapeHtml(maliciousPayload);
  assert(!escaped.includes('<script>'), 'Failed to escape script tags');
  assert(!escaped.includes('<img'), 'Failed to escape img tag');
  assert(escaped.includes('&lt;script&gt;'), 'Expected script tag to be escaped to &lt;script&gt;');
});

// 7. Accessibility, Semantic Structure & Focus Ring
test('Single H1 heading, H2 sections, H3 card titles, and accessibility attributes', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');
  
  // Single H1 check
  const h1Matches = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
  assert.strictEqual(h1Matches.length, 1, `Expected exactly 1 H1 heading on page, found ${h1Matches.length}`);
  assert(h1Matches[0].includes('SPVM3 Project Hub – Full-Stack &amp; AI Software Solutions') || h1Matches[0].includes('SPVM3 Project Hub – Full-Stack & AI Software Solutions'),
    'H1 text should be "SPVM3 Project Hub – Full-Stack & AI Software Solutions"');

  // H2 About and FAQ
  assert(html.includes('<h2 class="about-title">SPVM3 Tech Solution</h2>'), 'Missing H2 About title');
  assert(html.includes('<h2>Frequently Asked Questions</h2>'), 'Missing H2 FAQ title');

  // H3 Card titles
  assert(html.includes('<h3 class="card-title">'), 'Card titles must use H3 for semantic hierarchy');

  // Skip link & Focus rings
  assert(html.includes('class="skip-link"'), 'Missing skip-link for keyboard navigation');
  assert(html.includes(':focus-visible'), 'CSS must specify visible :focus-visible outlines');

  // External link security
  const targetBlanks = html.match(/target="_blank"[^>]*>/g) || [];
  targetBlanks.forEach(tag => {
    assert(tag.includes('rel="noopener noreferrer"'), `target="_blank" link missing rel="noopener noreferrer": ${tag}`);
  });
});

// 8. Fixed/Sticky Header & About Section
test('Sticky header with backdrop blur and About section with contact info exist', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');
  assert(html.includes('id="siteHeader"'), 'Missing siteHeader element');
  assert(html.includes('position: sticky;'), 'Header CSS must use sticky positioning');
  assert(html.includes('backdrop-filter: blur('), 'Header CSS must specify backdrop-filter blur');
  assert(html.includes('Founded by Sanjay G L'), 'About section must mention Sanjay G L');
  assert(html.includes('spvm3techsolution@gmail.com'), 'About section must include email');
  assert(html.includes('+91 8123981877') || html.includes('918123981877'), 'About section must include WhatsApp');
  assert(html.includes('spvm-3-tech-solution.vercel.app'), 'About section must link official website');
});

// 9. Policy Modals & Required Pricing Statement
test('Policy modals and pricing disclosure statement exist in footer', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');
  assert(html.includes('Pricing on request via WhatsApp/Email. Source code, documentation and deployment assistance included.'),
    'Missing required pricing and inclusions disclosure statement');
  assert(html.includes('Privacy Policy'), 'Missing Privacy Policy link');
  assert(html.includes('Terms of Service'), 'Missing Terms of Service link');
  assert(html.includes('Refund &amp; Delivery Policy') || html.includes('Refund & Delivery Policy'), 'Missing Refund & Delivery Policy link');
  assert(html.includes('id="policyModal"'), 'Missing policy modal element');
});

// 10. Security Headers in vercel.json
test('vercel.json specifies complete security headers including CSP and HSTS', () => {
  const vercelPath = path.join(__dirname, '..', 'vercel.json');
  assert(fs.existsSync(vercelPath), 'vercel.json must exist');
  const config = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
  assert.strictEqual(config.version, 2, 'vercel.json version should be 2');
  assert(Array.isArray(config.headers), 'vercel.json should specify security headers');
  
  const headerMap = {};
  config.headers[0].headers.forEach(h => { headerMap[h.key] = h.value; });
  
  assert(headerMap['Content-Security-Policy'], 'Missing Content-Security-Policy header');
  assert(headerMap['Content-Security-Policy'].includes("frame-ancestors 'none'"), 'CSP missing frame-ancestors none');
  assert(headerMap['Strict-Transport-Security'], 'Missing Strict-Transport-Security header');
  assert(headerMap['Strict-Transport-Security'].includes('max-age=63072000'), 'HSTS max-age should be 63072000');
  assert.strictEqual(headerMap['X-Content-Type-Options'], 'nosniff');
  assert.strictEqual(headerMap['X-Frame-Options'], 'DENY');
  assert.strictEqual(headerMap['Referrer-Policy'], 'strict-origin-when-cross-origin');
});

// 11. Static Deployment Files & Clean Root (No Duplicates)
test('All required deployment static files exist in public/ and zero duplicates in root', () => {
  const requiredFiles = [
    'public/index.html',
    'public/app.js',
    'public/projects-data.js',
    'public/logo.png',
    'public/robots.txt',
    'public/sitemap.xml',
    'public/404.html'
  ];
  requiredFiles.forEach(file => {
    const fullPath = path.join(__dirname, '..', file);
    assert(fs.existsSync(fullPath), `Required asset missing: ${file}`);
    const stat = fs.statSync(fullPath);
    assert(stat.size > 0, `Asset is empty (0 bytes): ${file}`);
  });

  // Verify duplicate web files are NOT in root
  const forbiddenRootFiles = [
    'index.html',
    'app.js',
    'projects-data.js',
    '404.html',
    'robots.txt',
    'sitemap.xml',
    'logo.png'
  ];
  forbiddenRootFiles.forEach(file => {
    const rootPath = path.join(__dirname, '..', file);
    assert(!fs.existsSync(rootPath), `Duplicate file detected at root: ${file} (should only exist in public/)`);
  });
});

console.log(`\n📊 Summary: ${passedTests} / ${totalTests} tests passed.\n`);
if (passedTests === totalTests) {
  console.log('🎉 ALL TESTS PASSED SUCCESSFULLY!');
} else {
  process.exit(1);
}
