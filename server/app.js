const { configure } = require('./config');
const express = require('express');
const mongoose = require('./mongoose');
const cors = require('cors');
const routes = require('./routes/index.route');

const app = express();
// connect to MongoDB
mongoose.connect(mongoose.get('db_uri'));

// configure
const { server } = configure;
for (const key of Object.keys(server)) {
  app.set(key, server[key]);
}

app.use(cors());

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.json());

app.use('/api', routes);

// error handling
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    status: Number(error.status) || 500,
    message: error.message
  });
});

module.exports = app;
