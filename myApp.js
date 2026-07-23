require('dotenv').config();

let express = require('express');
let app = express();

// Root-level logger middleware
app.use(function(req, res, next) {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
});

// Serve static assets
app.use('/public', express.static(__dirname + '/public'));

// Home page
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// JSON route
app.get('/json', function(req, res) {
  let message = 'Hello json';

  if (process.env.MESSAGE_STYLE === 'uppercase') {
    message = message.toUpperCase();
  }

  res.json({ message: message });
});

// Time server
app.get(
  '/now',
  function(req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function(req, res) {
    res.json({ time: req.time });
  }
);

// Route parameter
app.get('/:word/echo', function(req, res) {
  res.json({
    echo: req.params.word
  });
});

// Query parameter
app.get('/name', function(req, res) {
  let firstName = req.query.first;
  let lastName = req.query.last;

  res.json({
    name: firstName + ' ' + lastName
  });
});

module.exports = app;
