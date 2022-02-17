const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGO_URI;
const connectDb = async (url) => {
  return await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};
// const connectDb = connexion(uri).then((db) => db);
const closeDb = async () => {
  return await mongoose.connection.close();
};
module.exports = { connectDb, closeDb };
