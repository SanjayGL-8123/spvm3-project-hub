# SPVM3 Project Hub

> Official project catalog and showcase for **SPVM Tech Solution**, developed by **Sanjay G L**. Featuring 74+ production-ready student, AI/ML, cybersecurity, and full-stack software projects.

🌐 **Live Website**: [https://spvm3-project-hub.vercel.app/](https://spvm3-project-hub.vercel.app/)  
💬 **WhatsApp Direct**: [+91 8123981877](https://wa.me/918123981877)  
✉️ **Email Direct**: [spvm3techsolution@gmail.com](mailto:spvm3techsolution@gmail.com)

---

## 🚀 Key Features

- **74+ Categorized Projects**: Complete source code, schemas, and documentation.
- **Instant Search & Filter**: Real-time keyword filtering across project name, description, and technologies.
- **Category Filter Pills**: Fast filtering by `AI/ML`, `Cybersecurity`, `React & TS`, `Python & FastAPI`, `Mobile (Flutter)`, and `Tools`.
- **Flexible Sorting**: Sort by Project ID (1→74, 74→1) or Alphabetical (A→Z, Z→A).
- **Dark & Light Mode**: Seamless theme toggle with local storage persistence.
- **Copy Project Title**: 1-click clipboard copy with instant tooltip feedback.
- **Direct Inquiries**: Pre-filled WhatsApp and Gmail inquiry buttons.
- **FAQ Accordion**: Instant answers to common purchase, customization, and delivery questions.
- **Accessibility & UX**: Skip links, scroll progress bar, sticky header, back-to-top button, cookie consent, and print stylesheet.
- **Serverless & Resilient**: Deployed on Vercel with zero runtime dependencies and isomorphic data fallback.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Pure HTML5, CSS3 (Custom Properties & Themes), JavaScript (ES6+) |
| **Serverless Backend** | Node.js Serverless Functions (`/api/projects`, `/api/contact`) |
| **Hosting & CDN** | Vercel (Edge CDN, Automated Deployments, Security Headers) |
| **Local Development** | Node.js Express Server (`server-local.js`) |

---

## 📁 Repository Structure

```text
├── api/
│   ├── projects.js         # Vercel Serverless Function (GET /api/projects)
│   └── contact.js          # Vercel Serverless Function (POST /api/contact)
├── public/                 # Static assets served at root by Vercel
│   ├── index.html          # Main client interface
│   ├── app.js              # Client application logic & event handlers
│   ├── projects-data.js    # Universal isomorphic dataset (74 projects)
│   ├── logo.png            # Official SPVM3 Tech Solution logo
│   ├── 404.html            # Custom branded 404 error page
│   ├── robots.txt          # SEO crawler rules
│   └── sitemap.xml         # SEO XML sitemap
├── test/
│   └── suite.js            # Automated QA & schema verification suite
├── index.html              # Root fallback copy of frontend
├── app.js                  # Root fallback copy of client logic
├── projects-data.js        # Root isomorphic data module
├── logo.png                # Root logo asset
├── 404.html                # Root 404 page
├── robots.txt              # Root robots.txt
├── sitemap.xml             # Root sitemap.xml
├── vercel.json             # Vercel deployment configuration & security headers
├── package.json            # Node.js manifest and test runner
└── README.md               # Project documentation
```

---

## 💻 Local Development

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

The project is preconfigured for zero-friction Vercel deployment:

1. Commit and push changes to GitHub:
   ```bash
   git add -A
   git commit -m "Deploy SPVM3 Project Hub"
   git push origin main
   ```
2. Vercel automatically detects the push and deploys:
   - Everything inside `public/` is served at the domain root (`/`).
   - Serverless functions in `api/` are automatically routed under `/api/*`.
   - Security headers defined in `vercel.json` are applied automatically.

---

## 🔒 Security & Performance Features

- **Security Headers**: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection: 1; mode=block`, `Referrer-Policy: strict-origin-when-cross-origin`.
- **XSS Protection**: HTML escaping applied to all dynamic content rendering.
- **Cache Optimization**: Immutable caching headers on images and static scripts.
- **Zero Secrets in Frontend**: No API keys or sensitive credentials exposed.

---

## 📞 Contact Sanjay GL

- **WhatsApp**: [+91 8123981877](https://wa.me/918123981877)
- **Email**: [spvm3techsolution@gmail.com](mailto:spvm3techsolution@gmail.com)
- **Organization**: SPVM Tech Solution
