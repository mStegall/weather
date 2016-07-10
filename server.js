var express = require('express');

var port = process.env.PORT || 3000;

// Init express app
var app = express();

app.use(express.static('public'));

// Start server
app.listen(port, function() {
  console.log("Starting the magic box!");
});
