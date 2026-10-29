// Vercel Serverless Function: GET /api/projects
const projects = [
  {"id":1,"name":"invoice-shield-ai","description":"AI-based invoice fraud and anomaly detection tool.","frontend":"HTML, CSS, JavaScript","backend":"Python (Flask)","db_used":"SQLite"},
  {"id":2,"name":"Billing-Management-System-SPVM-Tech-Solution","description":"Billing and invoice management system for SPVM Tech Solution.","frontend":"HTML, CSS, JavaScript","backend":"None (client-side only)","db_used":"None (browser LocalStorage)"},
  {"id":3,"name":"spvm3-SentinelAI-AI-Based-Cyber-Threat-Early-Warning-Autonomous-SOC-Triage","description":"AI-based cyber threat early-warning system with autonomous SOC alert triage.","frontend":"HTML, CSS, JavaScript","backend":"Python (FastAPI)","db_used":"SQLite"},
  {"id":4,"name":"AI-Powered-Continuous-Cyber-Risk-Quantification-and-Investment-Optimization-Platform","description":"Platform that continuously quantifies cyber risk in financial terms and optimises security investment.","frontend":"HTML, CSS, JavaScript","backend":"Python (FastAPI)","db_used":"SQLite"},
  {"id":5,"name":"daily-tasks-app","description":"Daily to-do and task planner web app.","frontend":"HTML, CSS, JavaScript","backend":"None (client-side only)","db_used":"None (browser LocalStorage)"},
  {"id":6,"name":"sanjayGL2006","description":"GitHub profile README (not a software project).","frontend":"N/A","backend":"N/A","db_used":"N/A"},
  {"id":7,"name":"agentportfolio","description":"Portfolio site presenting AI agent projects.","frontend":"JavaScript","backend":"None (client-side only)","db_used":"None"},
  {"id":8,"name":"SPVM3-placement-hub","description":"Placement hub for students: jobs, drives and preparation resources.","frontend":"TypeScript (React)","backend":"Supabase (BaaS)","db_used":"PostgreSQL (Supabase)"},
  {"id":9,"name":"smart-library-assistant","description":"Smart assistant for searching and managing library books.","frontend":"HTML, CSS, JavaScript","backend":"Python (Flask)","db_used":"SQLite"},
  {"id":10,"name":"Sanjay-OS","description":"Personal OS-style dashboard application.","frontend":"JavaScript","backend":"Node.js","db_used":"None"},
  {"id":11,"name":"phishguard-ai","description":"ML-based phishing email and website detection.","frontend":"HTML, CSS, JavaScript","backend":"Python (Flask)","db_used":"None (trained model files)"},
  {"id":12,"name":"SPVM3-Learning-Platform","description":"Online learning platform with courses and progress tracking.","frontend":"HTML, CSS, JavaScript","backend":"Python (Flask)","db_used":"SQLite"},
  {"id":13,"name":"photo-recovery-tool","description":"Desktop tool to recover deleted photos from storage devices.","frontend":"Python (Tkinter GUI)","backend":"Python","db_used":"None"},
  {"id":14,"name":"cyber-intel-agent","description":"AI agent that collects and summarises cyber threat intelligence.","frontend":"Command line / HTML","backend":"Python","db_used":"None"},
  {"id":15,"name":"python-internship-projects","description":"Collection of Python programs from internship work.","frontend":"Console (no UI)","backend":"Python","db_used":"None"},
  {"id":16,"name":"photo-to-doc-desktop","description":"Desktop app that converts photos of documents into editable files using OCR.","frontend":"Python (Tkinter GUI)","backend":"Python","db_used":"None"},
  {"id":17,"name":"disk-recovery-forensics-tool","description":"Disk recovery and digital forensics analysis tool.","frontend":"Python (Tkinter GUI)","backend":"Python","db_used":"None"},
  {"id":18,"name":"spvm3-chat","description":"Real-time web chat application.","frontend":"HTML, CSS, JavaScript","backend":"JavaScript (Firebase)","db_used":"Firebase Realtime Database"},
  {"id":19,"name":"spvm3-spend-tracker","description":"Income and expense (spend) tracker.","frontend":"HTML, CSS, JavaScript","backend":"None (client-side only)","db_used":"None (browser LocalStorage)"},
  {"id":20,"name":"SPVM3-Blog","description":"Blog platform with posts and admin management.","frontend":"HTML, CSS (Jinja)","backend":"Python (Flask)","db_used":"SQLite"},
  {"id":21,"name":"spvm3-player","description":"Web-based music/media player.","frontend":"HTML, CSS, JavaScript","backend":"None (client-side only)","db_used":"None"},
  {"id":22,"name":"spvm3-api-platform","description":"API platform for managing and testing APIs.","frontend":"HTML, CSS, JavaScript","backend":"Python (FastAPI)","db_used":"SQLite"},
  {"id":23,"name":"cyber-response-platform","description":"Cyber incident response management platform.","frontend":"JavaScript (React)","backend":"Node.js (Express)","db_used":"MongoDB"},
  {"id":24,"name":"student-htr-studio","description":"Student handwritten text recognition (HTR) studio.","frontend":"HTML, CSS, JavaScript","backend":"Python (OCR/deep learning)","db_used":"None"},
  {"id":25,"name":"malicious-url-detector","description":"ML-based malicious URL detector.","frontend":"HTML, CSS, JavaScript","backend":"Python (Flask)","db_used":"None (trained model files)"},
  {"id":26,"name":"smart-voice-notes","description":"Voice-to-text note taking app using speech recognition.","frontend":"JavaScript","backend":"None (client-side only)","db_used":"None (browser LocalStorage)"},
  {"id":27,"name":"smart-parking-system","description":"Smart parking slot booking and management system.","frontend":"HTML, CSS, JavaScript","backend":"Python (Flask)","db_used":"SQLite"},
  {"id":28,"name":"ai-paper-analyzer","description":"AI tool that analyses and summarises research papers.","frontend":"HTML, CSS, JavaScript","backend":"Python (FastAPI)","db_used":"None"},
  {"id":29,"name":"spvm3-quiz-app","description":"Interactive quiz application.","frontend":"HTML, CSS, JavaScript","backend":"None (client-side only)","db_used":"None"},
  {"id":30,"name":"SPVM3-tech-solution","description":"Company backend/website for SPVM Tech Solution.","frontend":"HTML, CSS, JavaScript","backend":"Python (Flask)","db_used":"SQLite"},
  {"id":31,"name":"otp-signup","description":"Email/OTP-verified user signup system.","frontend":"HTML, CSS, JavaScript","backend":"Python (Flask)","db_used":"SQLite"},
  {"id":32,"name":"SPVM3-code-notes","description":"Web notes site for coding concepts and snippets.","frontend":"HTML, CSS, JavaScript","backend":"None (client-side only)","db_used":"None"},
  {"id":33,"name":"scanner-files","description":"Web tool for scanning and organising files.","frontend":"HTML, CSS, JavaScript","backend":"None (client-side only)","db_used":"None"},
  {"id":34,"name":"social-analytics-ui","description":"Social media analytics dashboard UI.","frontend":"JavaScript (React)","backend":"None (client-side only)","db_used":"None (sample data)"},
  {"id":35,"name":"-SPVM3-reelfind-react-fastapi","description":"Reel finder web app with React front end and FastAPI back end.","frontend":"JavaScript (React)","backend":"Python (FastAPI)","db_used":"SQLite"},
  {"id":36,"name":"fastapi-react-todo","description":"To-do app built with React and FastAPI.","frontend":"JavaScript (React)","backend":"Python (FastAPI)","db_used":"SQLite"},
  {"id":37,"name":"spvm3-task-app","description":"Task management web app.","frontend":"JavaScript (React)","backend":"Node.js (Express)","db_used":"MongoDB"},
  {"id":38,"name":"Milano-infotech-internship","description":"Python work and exercises from the Milano Infotech internship.","frontend":"Console (no UI)","backend":"Python","db_used":"None"},
  {"id":39,"name":"spvm3-code-editor","description":"Browser-based code editor.","frontend":"HTML, CSS, JavaScript","backend":"None (client-side only)","db_used":"None"},
  {"id":40,"name":"smart-attendance-yolo","description":"Smart attendance system using YOLO object/face detection.","frontend":"Python (OpenCV GUI)","backend":"Python","db_used":"SQLite / CSV"},
  {"id":41,"name":"spvm3-campus-placement","description":"Campus placement management system.","frontend":"HTML, CSS, JavaScript","backend":"Python (Flask)","db_used":"SQLite"},
  {"id":42,"name":"spvm3-car-game","description":"Browser car racing game.","frontend":"HTML, CSS, JavaScript","backend":"None (client-side only)","db_used":"None"},
  {"id":43,"name":"AIML-course-and-Practical","description":"AI/ML course notes and practical exercises (Jupyter notebooks).","frontend":"Jupyter Notebook","backend":"Python","db_used":"None (CSV datasets)"},
  {"id":44,"name":"text2img-studio","description":"Text-to-image generation studio.","frontend":"HTML, CSS, JavaScript","backend":"Python","db_used":"None"},
  {"id":45,"name":"DermAI-AI-Powered-Skincare-Diagnosis-App","description":"AI-powered skincare diagnosis app that analyses skin images.","frontend":"HTML, CSS, JavaScript","backend":"Python (Flask, deep learning)","db_used":"None"},
  {"id":46,"name":"small-project","description":"Small starter web project.","frontend":"HTML, CSS","backend":"None (client-side only)","db_used":"None"},
  {"id":47,"name":"SPVM3-tech-solution-websites","description":"Collection of websites built for SPVM Tech Solution clients.","frontend":"HTML, CSS, JavaScript","backend":"None (client-side only)","db_used":"None"},
  {"id":48,"name":"sanjay-gl-website-carbon-intelligence","description":"Carbon footprint / carbon intelligence website.","frontend":"HTML, CSS, JavaScript","backend":"None (client-side only)","db_used":"None"},
  {"id":49,"name":"resume-analyzer","description":"Resume analyser that checks resumes against keywords.","frontend":"HTML, CSS, JavaScript","backend":"None (client-side only)","db_used":"None"},
  {"id":50,"name":"image-to-svg-converter","description":"Converts raster images to SVG vector graphics.","frontend":"JavaScript","backend":"None (client-side only)","db_used":"None"},
  {"id":51,"name":"Paperless-Office-System","description":"Digital document management system to reduce paper use.","frontend":"JavaScript (React)","backend":"Node.js (Express)","db_used":"MongoDB"},
  {"id":52,"name":"bluetooth-chat","description":"Bluetooth-based chat mobile app.","frontend":"Dart (Flutter)","backend":"Dart (Flutter, device Bluetooth)","db_used":"None (on-device)"},
  {"id":53,"name":"DataGauge-Dataset-Quality-Monitoring-System","description":"Dataset quality monitoring and reporting system.","frontend":"Python (Streamlit)","backend":"Python","db_used":"None"},
  {"id":54,"name":"accident-risk-prediction","description":"ML-based road accident risk prediction.","frontend":"HTML, CSS, JavaScript","backend":"Python (Flask), scikit-learn","db_used":"None (CSV dataset)"},
  {"id":55,"name":"prop-manager-dash-95721","description":"Property management dashboard.","frontend":"TypeScript (React)","backend":"Supabase (BaaS)","db_used":"PostgreSQL (Supabase)"},
  {"id":56,"name":"portfolio","description":"Personal portfolio website.","frontend":"HTML, CSS, JavaScript","backend":"None (client-side only)","db_used":"None"},
  {"id":57,"name":"expense-tracker","description":"Expense tracker web app.","frontend":"HTML, CSS, JavaScript","backend":"None (client-side only)","db_used":"None (browser LocalStorage)"},
  {"id":58,"name":"-Handcrafted-with-Love-Pure-Weaves","description":"Online store website for handcrafted handloom products.","frontend":"HTML, CSS","backend":"None (client-side only)","db_used":"None"},
  {"id":59,"name":"Surya-chatbot","description":"AI chatbot web app.","frontend":"HTML, CSS, JavaScript","backend":"Node.js","db_used":"None"},
  {"id":60,"name":"AI-Agent-used-google-api","description":"AI agent that uses Google APIs to automate tasks.","frontend":"Command line","backend":"Python","db_used":"None (Google services)"},
  {"id":61,"name":"pixel-perfect","description":"Pixel-art / UI design web app.","frontend":"TypeScript (React)","backend":"None (client-side only)","db_used":"None"},
  {"id":62,"name":"srimariyammatemple-ad2fd3a5","description":"Website for Sri Mariyamma Temple.","frontend":"TypeScript (React)","backend":"Supabase (BaaS)","db_used":"PostgreSQL (Supabase)"},
  {"id":63,"name":"bmi_calculator","description":"BMI calculator.","frontend":"HTML, CSS, JavaScript","backend":"None (client-side only)","db_used":"None"},
  {"id":64,"name":"pizza-shop-website","description":"Pizza shop website.","frontend":"HTML, CSS","backend":"None (client-side only)","db_used":"None"},
  {"id":65,"name":"maya-angelou-tribute","description":"Tribute web page for Maya Angelou.","frontend":"HTML, CSS","backend":"None (client-side only)","db_used":"None"},
  {"id":66,"name":"vault-secure-auth","description":"Secure login/authentication demo.","frontend":"HTML, CSS, JavaScript","backend":"None (client-side only)","db_used":"None (browser LocalStorage)"},
  {"id":67,"name":"daily-task-nexus","description":"Daily task manager web app.","frontend":"HTML, CSS, JavaScript","backend":"None (client-side only)","db_used":"None (browser LocalStorage)"},
  {"id":68,"name":"web-calculator-js","description":"JavaScript web calculator.","frontend":"HTML, CSS, JavaScript","backend":"None (client-side only)","db_used":"None"},
  {"id":69,"name":"temp-convert-web-app","description":"Temperature converter web app.","frontend":"HTML, CSS, JavaScript","backend":"None (client-side only)","db_used":"None"},
  {"id":70,"name":"vpn-landing-page1","description":"VPN landing page.","frontend":"HTML, CSS","backend":"None (client-side only)","db_used":"None"},
  {"id":71,"name":"srimariyammatemple","description":"Website for Sri Mariyamma Temple (earlier version).","frontend":"TypeScript (React)","backend":"Supabase (BaaS)","db_used":"PostgreSQL (Supabase)"},
  {"id":72,"name":"Pure-Weaves","description":"Handloom products website (Pure Weaves).","frontend":"HTML, CSS","backend":"None (client-side only)","db_used":"None"},
  {"id":73,"name":"Registration-form","description":"User registration form.","frontend":"HTML, CSS, JavaScript","backend":"None (client-side only)","db_used":"None"},
  {"id":74,"name":"digital-board-duel","description":"Two-player digital board game.","frontend":"TypeScript (React)","backend":"Supabase (BaaS)","db_used":"PostgreSQL (Supabase)"}
];

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  return res.status(200).json(projects);
};

