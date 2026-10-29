-- ============================================================
--  SPVM3 Project Hub  –  MySQL Database Schema
--  Run:  mysql -u root -p < schema.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS spvm3_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE spvm3_db;

-- ── projects ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id          INT           NOT NULL AUTO_INCREMENT,
  name        VARCHAR(255)  NOT NULL,
  description TEXT          NOT NULL,
  frontend    VARCHAR(150)  DEFAULT NULL,
  backend     VARCHAR(150)  DEFAULT NULL,
  db_used     VARCHAR(150)  DEFAULT NULL,
  category    VARCHAR(100)  DEFAULT 'General',
  price       DECIMAL(10,2) DEFAULT NULL,
  is_active   TINYINT(1)    NOT NULL DEFAULT 1,
  created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_active   (is_active),
  INDEX idx_category (category)
) ENGINE = InnoDB;

-- ── contact_requests ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_requests (
  id         INT  NOT NULL AUTO_INCREMENT,
  project_id INT  NOT NULL,
  method     ENUM('whatsapp','email') NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_project (project_id),
  CONSTRAINT fk_project FOREIGN KEY (project_id)
    REFERENCES projects(id) ON DELETE CASCADE
) ENGINE = InnoDB;

-- ============================================================
--  SEED DATA  –  74 projects from Sanjay_GL_Projects.xlsx
-- ============================================================
INSERT IGNORE INTO projects (id, name, description, frontend, backend, db_used) VALUES
(1,  'invoice-shield-ai',                                                         'AI-based invoice fraud and anomaly detection tool.',                                                             'HTML, CSS, JavaScript',    'Python (Flask)',           'SQLite'),
(2,  'Billing-Management-System-SPVM-Tech-Solution',                              'Billing and invoice management system for SPVM Tech Solution.',                                                  'HTML, CSS, JavaScript',    'None (client-side only)',  'None (browser LocalStorage)'),
(3,  'spvm3-SentinelAI-AI-Based-Cyber-Threat-Early-Warning-Autonomous-SOC-Triage','AI-based cyber threat early-warning system with autonomous SOC alert triage.',                                  'HTML, CSS, JavaScript',    'Python (FastAPI)',          'SQLite'),
(4,  'AI-Powered-Continuous-Cyber-Risk-Quantification-and-Investment-Optimization-Platform','Platform that continuously quantifies cyber risk in financial terms and optimises security investment.','HTML, CSS, JavaScript','Python (FastAPI)','SQLite'),
(5,  'daily-tasks-app',                                                           'Daily to-do and task planner web app.',                                                                          'HTML, CSS, JavaScript',    'None (client-side only)',  'None (browser LocalStorage)'),
(6,  'sanjayGL2006',                                                              'GitHub profile README (not a software project).',                                                                'N/A',                      'N/A',                      'N/A'),
(7,  'agentportfolio',                                                            'Portfolio site presenting AI agent projects.',                                                                   'JavaScript',               'None (client-side only)',  'None'),
(8,  'SPVM3-placement-hub',                                                       'Placement hub for students: jobs, drives and preparation resources.',                                            'TypeScript (React)',       'Supabase (BaaS)',           'PostgreSQL (Supabase)'),
(9,  'smart-library-assistant',                                                   'Smart assistant for searching and managing library books.',                                                      'HTML, CSS, JavaScript',    'Python (Flask)',            'SQLite'),
(10, 'Sanjay-OS',                                                                 'Personal OS-style dashboard application.',                                                                       'JavaScript',               'Node.js',                  'None'),
(11, 'phishguard-ai',                                                             'ML-based phishing email and website detection.',                                                                 'HTML, CSS, JavaScript',    'Python (Flask)',            'None (trained model files)'),
(12, 'SPVM3-Learning-Platform',                                                   'Online learning platform with courses and progress tracking.',                                                   'HTML, CSS, JavaScript',    'Python (Flask)',            'SQLite'),
(13, 'photo-recovery-tool',                                                       'Desktop tool to recover deleted photos from storage devices.',                                                   'Python (Tkinter GUI)',     'Python',                   'None'),
(14, 'cyber-intel-agent',                                                         'AI agent that collects and summarises cyber threat intelligence.',                                               'Command line / HTML',      'Python',                   'None'),
(15, 'python-internship-projects',                                                'Collection of Python programs from internship work.',                                                            'Console (no UI)',          'Python',                   'None'),
(16, 'photo-to-doc-desktop',                                                      'Desktop app that converts photos of documents into editable files using OCR.',                                   'Python (Tkinter GUI)',     'Python',                   'None'),
(17, 'disk-recovery-forensics-tool',                                              'Disk recovery and digital forensics analysis tool.',                                                             'Python (Tkinter GUI)',     'Python',                   'None'),
(18, 'spvm3-chat',                                                                'Real-time web chat application.',                                                                                'HTML, CSS, JavaScript',    'JavaScript (Firebase)',     'Firebase Realtime Database'),
(19, 'spvm3-spend-tracker',                                                       'Income and expense (spend) tracker.',                                                                            'HTML, CSS, JavaScript',    'None (client-side only)',  'None (browser LocalStorage)'),
(20, 'SPVM3-Blog',                                                                'Blog platform with posts and admin management.',                                                                 'HTML, CSS (Jinja)',        'Python (Flask)',            'SQLite'),
(21, 'spvm3-player',                                                              'Web-based music/media player.',                                                                                  'HTML, CSS, JavaScript',    'None (client-side only)',  'None'),
(22, 'spvm3-api-platform',                                                        'API platform for managing and testing APIs.',                                                                    'HTML, CSS, JavaScript',    'Python (FastAPI)',          'SQLite'),
(23, 'cyber-response-platform',                                                   'Cyber incident response management platform.',                                                                   'JavaScript (React)',       'Node.js (Express)',         'MongoDB'),
(24, 'student-htr-studio',                                                        'Student handwritten text recognition (HTR) studio.',                                                            'HTML, CSS, JavaScript',    'Python (OCR/deep learning)','None'),
(25, 'malicious-url-detector',                                                    'ML-based malicious URL detector.',                                                                               'HTML, CSS, JavaScript',    'Python (Flask)',            'None (trained model files)'),
(26, 'smart-voice-notes',                                                         'Voice-to-text note taking app using speech recognition.',                                                        'JavaScript',               'None (client-side only)',  'None (browser LocalStorage)'),
(27, 'smart-parking-system',                                                      'Smart parking slot booking and management system.',                                                              'HTML, CSS, JavaScript',    'Python (Flask)',            'SQLite'),
(28, 'ai-paper-analyzer',                                                         'AI tool that analyses and summarises research papers.',                                                          'HTML, CSS, JavaScript',    'Python (FastAPI)',          'None'),
(29, 'spvm3-quiz-app',                                                            'Interactive quiz application.',                                                                                  'HTML, CSS, JavaScript',    'None (client-side only)',  'None'),
(30, 'SPVM3-tech-solution',                                                       'Company backend/website for SPVM Tech Solution.',                                                                'HTML, CSS, JavaScript',    'Python (Flask)',            'SQLite'),
(31, 'otp-signup',                                                                'Email/OTP-verified user signup system.',                                                                         'HTML, CSS, JavaScript',    'Python (Flask)',            'SQLite'),
(32, 'SPVM3-code-notes',                                                          'Web notes site for coding concepts and snippets.',                                                               'HTML, CSS, JavaScript',    'None (client-side only)',  'None'),
(33, 'scanner-files',                                                             'Web tool for scanning and organising files.',                                                                    'HTML, CSS, JavaScript',    'None (client-side only)',  'None'),
(34, 'social-analytics-ui',                                                       'Social media analytics dashboard UI.',                                                                           'JavaScript (React)',       'None (client-side only)',  'None (sample data)'),
(35, '-SPVM3-reelfind-react-fastapi',                                             'Reel finder web app with React front end and FastAPI back end.',                                                 'JavaScript (React)',       'Python (FastAPI)',          'SQLite'),
(36, 'fastapi-react-todo',                                                        'To-do app built with React and FastAPI.',                                                                        'JavaScript (React)',       'Python (FastAPI)',          'SQLite'),
(37, 'spvm3-task-app',                                                            'Task management web app.',                                                                                       'JavaScript (React)',       'Node.js (Express)',         'MongoDB'),
(38, 'Milano-infotech-internship',                                                'Python work and exercises from the Milano Infotech internship.',                                                 'Console (no UI)',          'Python',                   'None'),
(39, 'spvm3-code-editor',                                                         'Browser-based code editor.',                                                                                     'HTML, CSS, JavaScript',    'None (client-side only)',  'None'),
(40, 'smart-attendance-yolo',                                                     'Smart attendance system using YOLO object/face detection.',                                                      'Python (OpenCV GUI)',      'Python',                   'SQLite / CSV'),
(41, 'spvm3-campus-placement',                                                    'Campus placement management system.',                                                                            'HTML, CSS, JavaScript',    'Python (Flask)',            'SQLite'),
(42, 'spvm3-car-game',                                                            'Browser car racing game.',                                                                                       'HTML, CSS, JavaScript',    'None (client-side only)',  'None'),
(43, 'AIML-course-and-Practical',                                                 'AI/ML course notes and practical exercises (Jupyter notebooks).',                                                'Jupyter Notebook',         'Python',                   'None (CSV datasets)'),
(44, 'text2img-studio',                                                           'Text-to-image generation studio.',                                                                               'HTML, CSS, JavaScript',    'Python',                   'None'),
(45, 'DermAI-AI-Powered-Skincare-Diagnosis-App',                                  'AI-powered skincare diagnosis app that analyses skin images.',                                                   'HTML, CSS, JavaScript',    'Python (Flask, deep learning)','None'),
(46, 'small-project',                                                             'Small starter web project.',                                                                                     'HTML, CSS',               'None (client-side only)',  'None'),
(47, 'SPVM3-tech-solution-websites',                                              'Collection of websites built for SPVM Tech Solution clients.',                                                   'HTML, CSS, JavaScript',    'None (client-side only)',  'None'),
(48, 'sanjay-gl-website-carbon-intelligence',                                     'Carbon footprint / carbon intelligence website.',                                                                'HTML, CSS, JavaScript',    'None (client-side only)',  'None'),
(49, 'resume-analyzer',                                                           'Resume analyser that checks resumes against keywords.',                                                          'HTML, CSS, JavaScript',    'None (client-side only)',  'None'),
(50, 'image-to-svg-converter',                                                    'Converts raster images to SVG vector graphics.',                                                                     'JavaScript',               'None (client-side only)',              'None'),
(51, 'Paperless-Office-System',                                                   'Digital document management system to reduce paper use.',                                                             'JavaScript (React)',       'Node.js (Express)',                    'MongoDB'),
(52, 'bluetooth-chat',                                                            'Bluetooth-based chat mobile app.',                                                                                    'Dart (Flutter)',           'Dart (Flutter, device Bluetooth)',      'None (on-device)'),
(53, 'DataGauge-Dataset-Quality-Monitoring-System',                               'Dataset quality monitoring and reporting system.',                                                                    'Python (Streamlit)',       'Python',                               'None'),
(54, 'accident-risk-prediction',                                                  'ML-based road accident risk prediction.',                                                                             'HTML, CSS, JavaScript',    'Python (Flask), scikit-learn',         'None (CSV dataset)'),
(55, 'prop-manager-dash-95721',                                                   'Property management dashboard.',                                                                                 'TypeScript (React)',       'Supabase (BaaS)',           'PostgreSQL (Supabase)'),
(56, 'portfolio',                                                                 'Personal portfolio website.',                                                                                    'HTML, CSS, JavaScript',    'None (client-side only)',  'None'),
(57, 'expense-tracker',                                                           'Expense tracker web app.',                                                                                       'HTML, CSS, JavaScript',    'None (client-side only)',  'None (browser LocalStorage)'),
(58, '-Handcrafted-with-Love-Pure-Weaves',                                        'Online store website for handcrafted handloom products.',                                                        'HTML, CSS',               'None (client-side only)',  'None'),
(59, 'Surya-chatbot',                                                             'AI chatbot web app.',                                                                                            'HTML, CSS, JavaScript',    'Node.js',                  'None'),
(60, 'AI-Agent-used-google-api',                                                  'AI agent that uses Google APIs to automate tasks.',                                                              'Command line',             'Python',                   'None (Google services)'),
(61, 'pixel-perfect',                                                             'Pixel-art / UI design web app.',                                                                                 'TypeScript (React)',       'None (client-side only)',  'None'),
(62, 'srimariyammatemple-ad2fd3a5',                                               'Website for Sri Mariyamma Temple.',                                                                              'TypeScript (React)',       'Supabase (BaaS)',           'PostgreSQL (Supabase)'),
(63, 'bmi_calculator',                                                            'BMI calculator.',                                                                                                'HTML, CSS, JavaScript',    'None (client-side only)',  'None'),
(64, 'pizza-shop-website',                                                        'Pizza shop website.',                                                                                            'HTML, CSS',               'None (client-side only)',  'None'),
(65, 'maya-angelou-tribute',                                                      'Tribute web page for Maya Angelou.',                                                                             'HTML, CSS',               'None (client-side only)',  'None'),
(66, 'vault-secure-auth',                                                         'Secure login/authentication demo.',                                                                              'HTML, CSS, JavaScript',    'None (client-side only)',  'None (browser LocalStorage)'),
(67, 'daily-task-nexus',                                                          'Daily task manager web app.',                                                                                    'HTML, CSS, JavaScript',    'None (client-side only)',  'None (browser LocalStorage)'),
(68, 'web-calculator-js',                                                         'JavaScript web calculator.',                                                                                     'HTML, CSS, JavaScript',    'None (client-side only)',  'None'),
(69, 'temp-convert-web-app',                                                      'Temperature converter web app.',                                                                                 'HTML, CSS, JavaScript',    'None (client-side only)',  'None'),
(70, 'vpn-landing-page1',                                                         'VPN landing page.',                                                                                              'HTML, CSS',               'None (client-side only)',  'None'),
(71, 'srimariyammatemple',                                                        'Website for Sri Mariyamma Temple (earlier version).',                                                            'TypeScript (React)',       'Supabase (BaaS)',           'PostgreSQL (Supabase)'),
(72, 'Pure-Weaves',                                                               'Handloom products website (Pure Weaves).',                                                                       'HTML, CSS',               'None (client-side only)',  'None'),
(73, 'Registration-form',                                                         'User registration form.',                                                                                        'HTML, CSS, JavaScript',    'None (client-side only)',  'None'),
(74, 'digital-board-duel',                                                        'Two-player digital board game.',                                                                                 'TypeScript (React)',       'Supabase (BaaS)',           'PostgreSQL (Supabase)');
