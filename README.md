# SPVM3 Project Hub

> Official project catalog and showcase for **SPVM3 Tech Solution**, founded by **Sanjay G L**. Featuring 90 production-ready software, AI/ML, computer vision, cybersecurity, and full-stack software projects.

🌐 **Project Hub**: [https://spvm3-project-hub.vercel.app/](https://spvm3-project-hub.vercel.app/)  
🏢 **Official Company Website**: [https://spvm-3-tech-solution.vercel.app/](https://spvm-3-tech-solution.vercel.app/)  
📍 **Location**: Shimoga (Shivamogga), Karnataka, India  
💬 **WhatsApp Direct**: [+91 8123981877](https://wa.me/918123981877)  
✉️ **Email Direct**: [spvm3techsolution@gmail.com](mailto:spvm3techsolution@gmail.com)  

---

## 🏢 About SPVM3 Tech Solution

**SPVM3 Tech Solution** is an IT and development service provider based in **Shimoga (Shivamogga), Karnataka**, founded by **Sanjay G L**.

### Core Services
- Full-stack web applications (React, TypeScript, Next.js, Node.js)
- AI & Machine Learning solutions (Computer Vision, NLP, CNNs, Classification)
- Cybersecurity & Forensics utilities
- Backend APIs (Python, FastAPI, Flask, Express)
- Mobile App Development (Flutter, Dart)

### What Buyers & Clients Receive
- Complete, uncompiled source code
- Comprehensive setup and architecture documentation
- Database schemas (SQL / migrations) and sample datasets
- Direct developer support, customization, and deployment assistance

### Contact & Location
- **Founder & Lead Developer**: Sanjay G L
- **Location**: Shimoga (Shivamogga), Karnataka, India
- **Email**: [spvm3techsolution@gmail.com](mailto:spvm3techsolution@gmail.com)
- **Phone / WhatsApp**: [+91 8123981877](https://wa.me/918123981877)
- **Official Website**: [https://spvm-3-tech-solution.vercel.app/](https://spvm-3-tech-solution.vercel.app/)

*(Note: If you were instead looking for VM3 Tech Solutions LLP, that is a separate IT company located in Wagholi, Pune, Maharashtra, rather than Shivamogga.)*

---

## 🚀 Key Features

- **90 Categorized Projects**: Complete source code, schemas, and documentation.
- **Static Pre-Rendering (SSR)**: All 90 project cards pre-rendered in HTML for instant search engine indexing.
- **Zero Duplicate Files**: All client-facing assets live exclusively in `public/`.
- **Instant Search & Filter**: Real-time keyword filtering across project names, descriptions, and technology stacks.
- **Category Filter Pills**: Fast filtering by `All Projects`, `AI & Machine Learning`, `Cybersecurity & Forensics`, `React & TypeScript`, `Python & FastAPI`, and `Mobile (Flutter)`.
- **Flexible Sorting**: Sort by Project ID (1 → 90, 90 → 1) or Alphabetical (A → Z, Z → A).
- **Dark & Light Mode**: Accessible theme toggle with local storage persistence.
- **Copy Project Title**: 1-click clipboard copy with instant feedback.
- **Direct Inquiries**: Pre-filled WhatsApp and Gmail inquiry buttons.
- **Delivery**: Delivery is provided within minutes after inquiry verification through a secure ZIP transfer or private download link.
- **Security**: Strict Content Security Policy, HSTS, X-Content-Type-Options, X-Frame-Options DENY, and XSS sanitization.

---

## 📁 Project Structure

```
spvm3-projects/
├── api/
│   ├── contact.js          # Serverless contact handler
│   └── projects.js         # Serverless API returning 90 projects from public/
├── public/
│   ├── 404.html            # Standalone theme-matching 404 error page
│   ├── app.js              # Client UI interactivity & filters
│   ├── index.html          # Main HTML with SSR static 90 project cards
│   ├── logo.png            # Optimized brand logo
│   ├── projects-data.js    # Universal 90-project dataset
│   ├── robots.txt          # Search engine crawl rules
│   └── sitemap.xml         # SEO XML sitemap with all projects
├── test/
│   └── suite.js            # Automated verification test suite
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── package.json            # Project manifest & test/run scripts
├── README.md               # Project documentation
├── schema.sql              # Database schema & 90 project records
├── server-local.js         # Local dev server (zero external database required)
├── server.js               # Express + MySQL production server option
└── vercel.json             # Deployment config & security headers
```

---

## 🛠️ Local Development & Testing

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Automated QA Tests
```bash
npm test
```

### 3. Start Local Development Server
```bash
npm start
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🚢 Deployment to Vercel

1. Test locally to verify all checks pass:
   ```bash
   npm test
   ```
2. Deploy using Vercel CLI or Git connection:
   ```bash
   vercel --prod
   ```

---

## 🔒 Security & Performance Features

- **Content Security Policy (CSP)**: Strict script-src and object-src protections.
- **Strict Transport Security (HSTS)**: `max-age=63072000; includeSubDomains; preload`.
- **Frame Protection**: `X-Frame-Options: DENY` and `frame-ancestors 'none'`.
- **XSS Protection**: HTML escaping applied to all dynamic content rendering.
- **Cache Optimization**: Immutable caching headers on images and static assets.
- **Zero Secrets**: No private credentials or API keys in client-side code.

---

## 📄 License & Attribution

© 2026 **SPVM3 Tech Solution**. All rights reserved.  
Founded by **Sanjay G L**, Shimoga, Karnataka, India.
