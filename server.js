// set up ======================================================================
var express  	= require('express');
var app      	= express(); 								// create our app w/ express
var Settings 	= require('settings');					// add settings module for easier config
var config 	 	= new Settings(require('./config/config'));
var mongo 		= require('mongoskin'); 					// driver for mongodb
var morgan   	= require('morgan');
var bodyParser 	= require('body-parser');
var methodOverride = require('method-override');

// database initialization =====================================================
var db 			= mongo.db("mongodb://" + config.mongodb.host + ":" + 
	config.mongodb.port + "/" + config.mongodb.dbname + "?" + 
	config.mongodb.options, { safe: true });			// connect to mongodb
db.helper 	= mongo.helper;							// mongodb helper

// configuration ===============================================================

app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


// routes ======================================================================
require('./app/routes.js')(app, db);

// listen (start app with node server.js) ======================================
app.listen(config.serverPort);
console.log("App listening on port " + config.serverPort);
