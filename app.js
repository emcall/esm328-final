var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var handlebars = require('express-handlebars').create({'defaultLayout':'main'});

var path = require("path");


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));

var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

//mongoose stuff
var DreamDragonSchema = new mongoose.Schema({ 
	player: String, 
	breed: {type:String, enum: ['guardian', 'tundra', ""]},
	sex: Boolean,
	element: {type:String, enum: ['fire', 'ice', ""]},
	primary: Number,
	secondary: Number,
	tertiary: Number,
	pgene: {type:String, enum: ['basic', 'speckle', ""]},
	sgene: {type:String, enum: ['basic', 'stripes', ""]},
	tgene: {type:String, enum: ['basic', 'underbelly', ""]}
	});
	
mongoose.model('DDragon', DreamDragonSchema);
	DDragon = mongoose.model('DDragon');

	
	mongoose.connect('mongodb://localhost/dragons');



//log all requests
app.use(function(req, res, next) {
	console.log(req.method, req.path);
	next();
});

//main page
app.get('/', function(req, res) {
	res.render('index');

});

//buy
app.get('/buy', function(req, res) {
	res.render('search');
});






//buy search results
app.get('/buy/search', function(req, res){
	DDragon.find(function(err, dragons, count){
		console.log(dragons);
		
	});
	res.render('searchresults');

});

//add request to database
app.post('/buy/add', function(req, res){

	//search the sales database
	//no results? add request

	new DDragon({
		player: "me",
		breed: req.body.breed,
		sex: null,
		element: req.body.element,
		primary: req.body.primary,
		secondary: req.body.secondary,
		tertiary: req.body.tertiary,
		pgene: req.body.pgene,
		sgene: req.body.sgene,
		tgene: req.body.tgene
	}).save();
	res.redirect('/buy/search');
});

app.listen(3000);
console.log("listening on port 3000");