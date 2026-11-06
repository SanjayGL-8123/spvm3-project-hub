// ============================================================
//  Vercel Serverless Function: GET /api/projects
//  Returns the complete 74 projects dataset with CORS & cache headers
// ============================================================

const projects = require('../public/projects-data.js');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.status(200).json(projects);
};
