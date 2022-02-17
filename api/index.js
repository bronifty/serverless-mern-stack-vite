const express = require('express');
const app = express();
const tasks = require('../utils/routes/tasks');
const connectDb = require('../utils/db/connect');
require('dotenv').config();
const cors = require('cors');
// middleware
app.use(express.json());
app.use(express.static('dist'));
app.use(
  cors({
    origin: '*',
  })
);
// routes
app.use(tasks);

// app.get('/api/v1/tasks')
// app.post('/api/v1/tasks')
// app.get('/api/v1/tasks/:id')
// app.patch('/api/v1/tasks/:id')
// app.delete('/api/v1/tasks/:id')

app.get('/', (req, res) => {
  res.send('Task Manager App');
});

// const PORT = 3000;
// connectDb(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`server listening on port ${PORT}...`);
//     });
//     console.log('connected to mongoDB');
//   })
//   .catch((err) => console.log(err));

module.exports = app;
