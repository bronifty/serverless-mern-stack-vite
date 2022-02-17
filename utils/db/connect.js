const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGO_URI;
const db =
  global.db ||
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
if (process.env.NODE_ENV === 'development') global.db = db;
module.exports = db;
