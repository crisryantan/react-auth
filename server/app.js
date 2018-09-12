'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const {
  DB_URL: dbUrl = 'mongodb://localhost/USER_RECORDS',
  NODE_ENV: environment = '',
  PORT: port = 8001
} = process.env;

// connect db
mongoose.connect(dbUrl);

mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection open to  ${dbUrl}`);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/api', require('./routes'));

app.use(express.static('public'));
app.use((req, res) => {
  res.send(path.join(__dirname, '/index.html'));
});

console.log('About to crank up node');
console.log(`PORT= ${port}`);
console.log(`NODE_ENV= ${environment}`);

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
