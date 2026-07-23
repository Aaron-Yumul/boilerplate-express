let express = require('express');
let app = express();

// Serve static files
app.use('/public', express.static(__dirname + '/public'));

// Home page
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// JSON route
app.get('/json', function(req, res) {
  res.json({
    message: 'Hello json'
  });
});

module.exports = app;
