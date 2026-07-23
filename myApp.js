require('dotenv').config();

let express = require('express');
let app = express();

// Root-level logger middleware
app.use(function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

// Serve static files
app.use('/public', express.static(__dirname + '/public'));

// Home page
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// JSON route
app.get('/json', function(req, res) {
  let message = "Hello json";

  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }

  res.json({ message: message });
});

module.exports = app;
