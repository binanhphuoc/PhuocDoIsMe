const express = require('express');
const app = express();
const questionpd = require('./routes/questionpd');
const bodyParser = require('body-parser');

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird')
mongoose.connect(process.env.DB_ENV_VAR, {
  promiseLibrary: require('bluebird')
})
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/questionpd', questionpd);

module.exports = app;