# Serverless-MERN-Stack

- aws and vercel are running on the /api/v1/tasks endpoint; netlify is running on /.netlify/functions/index/api/v1/tasks/
  to run locally:
- vercel or aws:
  - uncomment const baseURL = '/api/v1/tasks/';
  - comment const baseURL = '/.netlify/functions/index/api/v1/tasks/';
- netlify:
  - uncomment const baseURL = '/.netlify/functions/index/api/v1/tasks/';
  - comment const baseURL = '/api/v1/tasks/';
