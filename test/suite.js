// ============================================================
//  SPVM3 Project Hub  –  Full Verification & QA Test Suite
//  Author: Sanjay G L (SPVM Tech Solution)
// ============================================================
const assert = require('assert');
const fs     = require('fs');
const path   = require('path');

console.log('🧪 Starting SPVM3 Project Hub QA & Verification Suite...\n');

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
test('projects-data.js loads and contains exactly 74 projects', () => {
  const projects = require('../projects-data.js');
  assert(Array.isArray(projects), 'projects should be an array');
  assert.strictEqual(projects.length, 74, `Expected 74 projects, found ${projects.length}`);
});

test('All 74 projects have valid required schema fields', () => {
  const projects = require('../projects-data.js');
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
  assert.strictEqual(ids.size, 74, 'Expected 74 unique project IDs');
});

// 2. Serverless API verification
test('api/projects.js serverless function handler works properly', () => {
  const handler = require('../api/projects.js');
  assert.strictEqual(typeof handler, 'function', 'api/projects.js should export a function');

  let statusCode = null;
  let sentData = null;
  const mockReq = { method: 'GET' };
  const mockRes = {
    setHeader: () => {},
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
  assert(Array.isArray(sentData) && sentData.length === 74, `api/projects should return 74 items, got ${sentData?.length}`);
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
  handler({ method: 'POST', body: { project_id: null, method: 'hack' } }, {
    setHeader: () => {},
    status: (code) => { status2 = code; return { json: () => {} }; }
  });
  assert.strictEqual(status2, 400, 'Invalid contact method should return 400');
});

// 3. Static Assets verification
test('All required deployment static files exist in public/', () => {
  const requiredFiles = [
    'public/index.html',
    'public/app.js',
    'public/projects-data.js',
    'public/logo.png',
    'public/404.html',
    'public/robots.txt',
    'public/sitemap.xml'
  ];
  requiredFiles.forEach(file => {
    const fullPath = path.join(__dirname, '..', file);
    assert(fs.existsSync(fullPath), `Required asset missing: ${file}`);
    const stat = fs.statSync(fullPath);
    assert(stat.size > 0, `Asset is empty (0 bytes): ${file}`);
  });
});

test('index.html contains required UI controls and SEO tags', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');
  assert(html.includes('id="projectSearch"'), 'Missing search input element');
  assert(html.includes('id="projectSort"'), 'Missing sort select element');
  assert(html.includes('id="projectList"'), 'Missing project list container');
  assert(html.includes('id="themeToggle"'), 'Missing theme toggle button');
  assert(html.includes('id="scrollProgress"'), 'Missing scroll progress bar');
  assert(html.includes('id="backToTop"'), 'Missing back to top button');
  assert(html.includes('id="cookieBanner"'), 'Missing cookie banner element');
  assert(html.includes('skip-link'), 'Missing accessibility skip-link');
  assert(html.includes('Frequently Asked Questions'), 'Missing FAQ section');
  assert(html.includes('918123981877'), 'Missing WhatsApp phone number link');
  assert(html.includes('spvm3techsolution@gmail.com'), 'Missing contact email link');
});

test('vercel.json is valid JSON with essential security headers', () => {
  const vercelPath = path.join(__dirname, '..', 'vercel.json');
  assert(fs.existsSync(vercelPath), 'vercel.json must exist');
  const config = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
  assert.strictEqual(config.version, 2, 'vercel.json version should be 2');
  assert(Array.isArray(config.headers), 'vercel.json should specify security headers');
  const headerKeys = config.headers[0].headers.map(h => h.key);
  assert(headerKeys.includes('X-Content-Type-Options'), 'Missing X-Content-Type-Options');
  assert(headerKeys.includes('X-Frame-Options'), 'Missing X-Frame-Options');
});

console.log(`\n📊 Summary: ${passedTests} / ${totalTests} tests passed.\n`);
if (passedTests === totalTests) {
  console.log('🎉 ALL TESTS PASSED SUCCESSFULLY!');
} else {
  process.exit(1);
}
