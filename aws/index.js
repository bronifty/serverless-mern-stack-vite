('use strict');
const serverless = require('serverless-http');
const express = require('express');
const app = express();
const tasks = require('../utils/routes/tasks');
require('dotenv').config();
const uri = process.env.MONGO_URI;
const mongoose = require('mongoose');
const cors = require('cors');
app.use(express.json());
app.use(express.static('dist'));
app.use(
  cors({
    origin: '*',
  })
);
app.use('/api/v1/tasks', tasks);
const handler = serverless(app);
// aws doesn't play nice with the cached db connexion, so we need to close it
module.exports.handler = async (event, context) => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  const result = await handler(event, context);
  await mongoose.connection.close();
  return result;
};
