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
	breed: {type:String, enum: ['guardian', 'tundra', "fae", "mirror", "spiral", "snapper", "ridgeback", "pearlcatcher", "skydancer", "wildclaw", "coatl", "imperial", "" ]},
	sex: Boolean,
	element: {type:String, enum: ['fire', 'ice', "lightning", "shadow", "light", "nature", "plague", "arcane", "water", "wind", "earth"]},
	primary: Number,
	secondary: Number,
	tertiary: Number,
	pgene: {type:String, enum: ['basic', 'speckle', "tiger", "clown", "iridescent", "crystal", "ripple", "bar", ""]},
	sgene: {type:String, enum: ['basic', 'stripes', "shimmer", "eyespots", "freckle", "seraph", "current", "daub", ""]},
	tgene: {type:String, enum: ['basic', 'underbelly', "circuit", "gembond", "smoke", "spines", "crackle", ""]}
	});
	
mongoose.model('DDragon', DreamDragonSchema);
	DDragon = mongoose.model('DDragon');

var SaleDragonSchema = new mongoose.Schema({ 
	player: String, 
	breed: {type:String, enum: ['guardian', 'tundra', ""]},
	sex: Boolean,
	element: {type:String, enum: ['fire', 'ice', ""]},
	primary: Number,
	secondary: Number,
	tertiary: Number,
	pgene: {type:String, enum: ['basic', 'speckle', ""]},
	sgene: {type:String, enum: ['basic', 'stripes', ""]},
	tgene: {type:String, enum: ['basic', 'underbelly', ""]},
	id : Number,
	price: Number
	});//end dreamdragonschema
	
mongoose.model('SDragon', SaleDragonSchema);
	SDragon = mongoose.model('SDragon');
	
	mongoose.connect('mongodb://localhost/dragons');



//log all requests
app.use(function(req, res, next) {
	console.log(req.method, req.path);
	next();
});//end log

//main page
app.get('/', function(req, res) {
	res.render('index');

});//end get main

//buy
app.get('/buy', function(req, res) {
	res.render('search');
});//end get buy

//buy
app.get('/sell', function(req, res) {
	res.render('ssearch');
});//end get buy




//buy search results
app.post('/buy/search', function(req, res){
	
	//check for null values!
	var drequest = {};
	if(req.body.breed){
		drequest.breed = req.body.breed;
	}
	if(req.body.sex){
		drequest.sex = req.body.sex;
	}
	if(req.body.element){
		drequest.element = req.body.element;
	}
	if(req.body.primary){
		drequest.primary = req.body.primary;
	}
	if(req.body.secondary){
		drequest.secondary = req.body.secondary;
	}
	if(req.body.tertiary){
		drequest.tertiary = req.body.tertiary;
	}
	if(req.body.pgene){
		drequest.pgene = req.body.pgene;
	}
	if(req.body.sgene){
		drequest.sgene = req.body.sgene;
	}
	if(req.body.tgene){
		drequest.tgene = req.body.tgene;
	}
	DDragon.find(drequest, function(err, dragons, count){
		
		//if results are empty
		if(dragons.length == 0){
			drequest.player = "me";
			new DDragon(drequest).save();
			res.send("No matches :C Your dragon has been added to the dream database");
		
		}//end if
		
		else{
			res.render('searchresults', {dragons : dragons, drequest : drequest });
		}
		
	});//end find
	

});//end post buy

//add request to database
app.post('/buy/add', function(req, res){
		var drequest = {"player" : "me"};
	if(req.body.breed){
		drequest.breed = req.body.breed;
	}
	if(req.body.sex){
		drequest.sex = req.body.sex;
	}
	if(req.body.element){
		drequest.element = req.body.element;
	}
	if(req.body.primary){
		drequest.primary = req.body.primary;
	}
	if(req.body.secondary){
		drequest.secondary = req.body.secondary;
	}
	if(req.body.tertiary){
		drequest.tertiary = req.body.tertiary;
	}
	if(req.body.pgene){
		drequest.pgene = req.body.pgene;
	}
	if(req.body.sgene){
		drequest.sgene = req.body.sgene;
	}
	if(req.body.tgene){
		drequest.tgene = req.body.tgene;
	}
	
	new DDragon(drequest).save();
	res.send("hooray");
});//end buy/add


app.post('/sell/search', function(req, res){
	res.send("TODO");
});


app.listen(3000);
console.log("listening on port 3000");