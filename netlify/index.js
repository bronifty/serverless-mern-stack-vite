('use strict');
const serverless = require('serverless-http');
const express = require('express');
const app = express();
const tasks = require('../utils/routes/tasks');
require('../utils/db/connect');
const cors = require('cors');
app.use(express.json());
app.use(express.static('dist'));
app.use(
  cors({
    origin: '*',
  })
);
app.use('/.netlify/functions/index/api/v1/tasks', tasks);
module.exports.handler = serverless(app);
