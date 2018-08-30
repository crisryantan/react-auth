'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var port = process.env.PORT || 8001;
var four0four = require('./utils/404')();
var mongoose = require('mongoose');

var environment = process.env.NODE_ENV;
var dbURI = 'mongodb://localhost/USER_RECORDS';

// connect db
mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
  console.log('Mongoose default connection open to ' + dbURI);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
