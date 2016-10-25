//Simple API middle man for OpenWeatherAPI

var express 		= require('express');
var app 			= express();
var server      	= require('http').createServer(app);
var fs              = require('fs');
var port 			= 8080;
var morgan			= require('morgan');
var cookieParser 	= require('cookie-parser');
var bodyParser  	= require('body-parser');
var multer 			= require('multer');
var winston         = require('winston');

//server configurations
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
  limit: '50mb',   
  extended: true
}));
app.use('/css', express.static(__dirname + '/views/css/'));
app.use('/js', express.static(__dirname +  '/views/js/'));

app.set('view engine', 'ejs');

winston.add(
	winston.transports.File,
	{
		filename: __dirname + '/logs/info.log',
		level: 'info',
		json: true,
		eol: '\n',
		timestamp: true,
		handleExceptions: true
	}
);

var args = {
	app: app,
	express: express,
	fs: fs,
	winston: winston
}

//load routes
require('./app/routes.js')(args);

server.listen(port);
winston.info("The server is listening on port: " + port);


//TODO add controller that controls communication with the OpenWeatherAPI. 
//TODO Add model that represents a single location's worth of Weather data.