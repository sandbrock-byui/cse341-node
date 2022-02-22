const express = require('express');
const bodyParser = require('body-parser');

const feedRoutes = require('./routes/feed');

const PORT = 8080;

const app = express(); 

//app.use(bodyParser.urlencoded()); // x-www-form-urlencoded
app.use(bodyParser.json()); // application/json

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
