//Main routing

module.exports = function(args) {
	var fs = args.fs;
	var app = args.app;


	app.get('/', function(req, res){
		res.render('index.ejs');
	});

	app.get('/weather', function(req, res) {
		var query = req.body.qry;
		//TODO Add parameters needed for OpenWeatherAPI call

		res.send("Success");
	});

};