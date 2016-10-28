var path = require('path');
var express = require('express');
require('dotenv').config();
var request = require('request');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var rp = require('request-promise');
var router = require('./routes');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

var app = express();

var db = require('./db').db;

var port = process.env.PORT || 8000;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '../client')));

// app.use(expressJWT({ secret: 'this is the secret token!' }).unless({ path: ['/api/auth/signin', '/api/search', '/api/activity', '/api/auth/signup', '/api/activity/expedia'] }))

// Handle known routes
app.use('/api', router);

// Display error 404 for unknown routes
app.use(function(req, res) {
  res.send('Error 404: Page not found');
});

app.listen(port, function() {
  console.log(`server listening on port ${port}`);
});
