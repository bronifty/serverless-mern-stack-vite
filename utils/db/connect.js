const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGO_URI;
let db;

if (process.env.NODE_ENV === 'production') {
  db = mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
} else {
  if (!global.__db) {
    global.__db = mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  }
  db = global.__db;
}
module.exports = db;
