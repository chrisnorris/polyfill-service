var express = require('express');
var app = express.Router();

app.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('test', { title: 'Testbed for CORS' });
});

module.exports = app;
