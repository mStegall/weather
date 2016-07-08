var express = require('express');

var port = process.env.PORT || 3000;

// Init express app
var app = express();

var config = {
    rootPath : __dirname
};

// Express App
require('./server/config/express')(app, config);


// Express Routing
require('./server/config/routes')(app, config);

// Start server
app.listen(port, function() {
  console.log("Starting the magic box!");
});
