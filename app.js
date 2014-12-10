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
	breed: {type:String, enum: ['guardian', 'tundra', "fae", "mirror", "spiral", "snapper", "ridgeback", "pearlcatcher", "skydancer", "wildclaw", "coatl", "imperial", "" ]},
	sex: Boolean,
	element: {type:String, enum: ['fire', 'ice', "lightning", "shadow", "light", "nature", "plague", "arcane", "water", "wind", "earth"]},
	primary: Number,
	secondary: Number,
	tertiary: Number,
	pgene: {type:String, enum: ['basic', 'speckle', "tiger", "clown", "iridescent", "crystal", "ripple", "bar", ""]},
	sgene: {type:String, enum: ['basic', 'stripes', "shimmer", "eyespots", "freckle", "seraph", "current", "daub", ""]},
	tgene: {type:String, enum: ['basic', 'underbelly', "circuit", "gembond", "smoke", "spines", "crackle", ""]},
	id : Number,
	price: Number
	});//end dreamdragonschema
	
mongoose.model('SDragon', SaleDragonSchema);
	SDragon = mongoose.model('SDragon');
	
var AccountSchema = new mongoose.Schema({
	"name" : String,
	"id" : Number,
	"password" : String
	});

mongoose.model('Account', AccountSchema);
	Account = mongoose.model('Account');
	
mongoose.connect('mongodb://localhost/dragons');

//handle cookies



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

app.get('/login', function(req, res){
	res.render('login');
}); //end get login

app.get('/register', function(req, res){
	res.render('register');
});

app.get('/allreq', function(req, res){
	DDragon.find( {}, function(err, dragons, count){
				res.render('ssearchresults', {dragons : dragons});
		});
});//end get all requests

app.get('/allsale', function(req, res){
	SDragon.find( {}, function(err, dragons, count){
				res.render('ssearchresults', {dragons : dragons});
		});
});//end get all requests




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

//sell search results
app.post('/sell/search', function(req, res){	
	DDragon.find(
	{
		breed: {$in: [req.body.breed, ""]},
		sex: {$in: [req.body.sex, null]},
		element: {$in: [req.body.element, ""]},
		primary: {$in: [ req.body.primary, 0]},
		//secondary: {$in: [ req.body.secondary, 0]},
		//tertiary: {$in: [ req.body.tertiary, 0]},
		//pgene: {$in: [ req.body.pgene, ""]},
		//sgene: {$in: [ req.body.sgene, ""]},
		//tgene: {$in: [ req.body.tgene, ""]}
	
	}, function(err, dragons, count){
		
		//if results are empty
		if(dragons.length == 0){
			//srequest.player = "me";
			//new SDragon(srequest).save();
		//	res.send("No matches :C Your dragon has been added to the sale database");
		
		}//end if
		
		else{
			res.render('ssearchresults', {dragons : dragons});
		}
		
		});//end find
});//end sell/search

//login
app.post('/logged', function(req, res){
	Account.find({name: req.body.name, password: req.body.password}, function(err, account, count){
		if(account.length >=0){
			
			res.redirect('/');
		}
		else{
			res.send("Sorry, wrong username or password.");
		}
	});
});//end login 

app.post('/makeaccount', function(req, res){
	if(req.body.pw1 != req.body.pw2){
		res.send("Passwords don't match!");
	}
	else{
	
	Account.find({name: req.body.name}, function(err, account, count){
		if(account.length >0){
			res.send("Sorry, that name is taken!");
		}//end if
		else{
			new Account({name: req.body.name, id: req.body.id, password: req.body.pw1}).save();
			
			res.send("You made your account! Now go <a href=/login>log in</a>");
		}//end else
	});//end find
	}//end else
});//end register



app.listen(3000);
console.log("listening on port 3000");