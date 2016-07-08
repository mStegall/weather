var express = require('express');
var morgan = require('morgan');
var compression = require('compression');


module.exports = function (app, config) {
    // Logging
    if (process.env.NODE_ENV != 'production') {
        app.use(morgan('dev'));
    }    

    // Enable Gzip Compression
    app.use(compression());

    // Serve Statics
    app.use(express.static('public'));
    
};