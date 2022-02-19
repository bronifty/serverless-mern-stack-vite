# Serverless-MERN-Stack

### AWS

- in /src/hooks/tasks:
- uncomment const baseURL = '/api/v1/tasks/';
- comment const baseURL = '/.netlify/functions/index/api/v1/tasks/';
- requires serverless cli and serverless-offline npm packages

```bash
yarn build
sls offline start
```

### Vercel

- in /src/hooks/tasks:
- uncomment const baseURL = '/api/v1/tasks/';
- comment const baseURL = '/.netlify/functions/index/api/v1/tasks/';
- requires vercel cli npm package

```bash
vercel dev
```

### Netlify

- in /src/hooks/tasks:
- comment const baseURL = '/api/v1/tasks/';
- uncomment const baseURL = '/.netlify/functions/index/api/v1/tasks/';

```bash
ntl dev
```

-Note:

- aws and vercel are running on the /api/v1/tasks endpoint; netlify is running on /.netlify/functions/index/api/v1/tasks/
  to run locally:
- vercel or aws:
  - uncomment const baseURL = '/api/v1/tasks/';
  - comment const baseURL = '/.netlify/functions/index/api/v1/tasks/';
- netlify:
  - uncomment const baseURL = '/.netlify/functions/index/api/v1/tasks/';
  - comment const baseURL = '/api/v1/tasks/';
