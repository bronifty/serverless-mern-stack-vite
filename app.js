const express = require('express');
const app = express();
const tasks = require('./utils/routes/tasks');
const mongoose = require('mongoose');
// const connectDb = require('./db/connect');
require('dotenv').config();
const uri = process.env.MONGO_URI;
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
app.use('/api/v1/tasks', tasks);

// app.get('/api/v1/tasks')
// app.post('/api/v1/tasks')
// app.get('/api/v1/tasks/:id')
// app.patch('/api/v1/tasks/:id')
// app.delete('/api/v1/tasks/:id')

app.get('/', (req, res) => {
  res.send('Task Manager App');
});
const PORT = process.env.PORT || 3000;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then((db) =>
    app.listen(PORT, () => {
      console.log(`app listening on port ${PORT}`);
    })
  );
// const handler = serverless(app);
// // aws doesn't play nice with the cached db connexion, so we need to close it
// module.exports.handler = async (event, context) => {
//   await mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   });
//   const result = await handler(event, context);
//   await mongoose.connection.close();
//   return result;
// };
