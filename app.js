const express = require('express');
const app = express();
const tasks = require('./utils/routes/tasks');
const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGO_URI;
const cors = require('cors');
app.use(express.json());
app.use(express.static('dist'));
app.use(
  cors({
    origin: '*',
  })
);
app.use('/api/v1/tasks', tasks);
const PORT = process.env.PORT || 3000;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) =>
    app.listen(PORT, () => {
      console.log(`app listening on port ${PORT}`);
    })
  );
