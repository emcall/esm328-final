require('./db');

var express = require('express');
var app = express();
var mongoose = require('mongoose');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var session = require('express-session');
var handlebars = require('express-handlebars').create({'defaultLayout':'main'});
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var path = require("path");
//var Account = require('./models/account');


app.use(session({secret: '123456789sdfghj', resave: true,	saveUninitialized: true}));

/*app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
//passport.serializeUser(Account.serializeUser());
//passport.deserializeUser(Account.deserializeUser());
*/
app.use(cookieParser());


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));



//log all requests
app.use(function(req, res, next) {
	console.log(req.method, req.path);
	next();
});//end log

//main page
app.get('/', function(req, res) {
	res.render('index', {user:req.session.name, id:req.session.accountID});

});//end get main

//buy
app.get('/buy', function(req, res) {
	res.render('search', {user:req.session.name});
});//end get buy

//buy
app.get('/sell', function(req, res) {
	res.render('ssearch', {user:req.session.name});
});//end get buy

app.get('/login', function(req, res){
	res.render('login', {user:req.session.name});
}); //end get login

app.get('/register', function(req, res){
	res.render('register', {user:req.session.name});
});





//buy search results
app.post('/buy/search', function(req, res){
	var drequest = {};
		drequest.breed = req.body.breed;
		drequest.sex = req.body.sex;
		drequest.element = req.body.element;
		drequest.primary = req.body.primary;
		drequest.secondary = req.body.secondary;
		drequest.tertiary = req.body.tertiary;
		drequest.pgene = req.body.pgene;
		drequest.sgene = req.body.sgene;
		drequest.tgene = req.body.tgene;
	SDragon.find(drequest, function(err, dragons, count){
		
		//if results are empty
		if(dragons.length == 0){
			//GET SESSION
			drequest.player = req.session.accountID;
			new DDragon(drequest).save();
			res.send("No matches :C Your dragon has been added to the dream database");
		
		}//end if
		
		else{
			res.render('searchresults', {dragons : dragons, drequest : drequest, user:req.session.name });
		}
		
	});//end find
	

});//end post buy

//add request to database
app.post('/buy/add', function(req, res){
		var drequest = {"player" : req.session.accountID};
		drequest.breed = req.body.breed;
		drequest.sex = req.body.sex;
		drequest.element = req.body.element;
		drequest.primary = req.body.primary;
		drequest.secondary = req.body.secondary;
		drequest.tertiary = req.body.tertiary;
		drequest.pgene = req.body.pgene;
		drequest.sgene = req.body.sgene;
		drequest.tgene = req.body.tgene;
	
	
//	new DDragon(drequest).insert();
	res.send("Your request has been added. <a href='/'>Go Back</a>");
});//end buy/add

//sell search results
app.post('/sell/search', function(req, res){	
		var drequest = {"player" : req.session.accountID};
		drequest.breed = req.body.breed;
		drequest.sex = req.body.sex;
		drequest.element = req.body.element;
		drequest.primary = req.body.primary;
		drequest.secondary = req.body.secondary;
		drequest.tertiary = req.body.tertiary;
		drequest.pgene = req.body.pgene;
		drequest.sgene = req.body.sgene;
		drequest.tgene = req.body.tgene;
	DDragon.find(
	{
		breed: {$in: [req.body.breed, null]} ,
		sex: {$in: [req.body.sex, ""]},
		element: {$in: [req.body.element, ""]},
		primary: {$in: [ req.body.primary, null]},
		secondary: {$in: [ req.body.secondary, null]},
		tertiary: {$in: [ req.body.tertiary, null]},
		pgene: {$in: [ req.body.pgene, ""]},
		sgene: {$in: [ req.body.sgene, ""]},
		tgene: {$in: [ req.body.tgene, ""]}
	}, function(err, dragons, count){
			if(dragons.length!=0){
			res.render('ssearchresults', {dragons : dragons, user: req.session.name, srequest: drequest });
			}
			
		});//end find
});//end sell/search

app.post('/sell/add', function(req, res){
		var drequest = {"player" : req.session.accountID};
		drequest.breed = req.body.breed;
		drequest.sex = req.body.sex;
		drequest.element = req.body.element;
		drequest.primary = req.body.primary;
		drequest.secondary = req.body.secondary;
		drequest.tertiary = req.body.tertiary;
		drequest.pgene = req.body.pgene;
		drequest.sgene = req.body.sgene;
		drequest.tgene = req.body.tgene;
		drequest.id = req.body.did;
		
		new SDragon(drequest).save();
		res.send("Added your dragon to the sales. <a href='/'>Go Back</a>");
});

//unfortunately while registering works fine, logging in... not so much.
app.post('/register', function(req,res){
	if(req.body.pw1 != req.body.pw2){
		res.send("Passwords don't match!");
	}
	else{
	
	Account.find({username: req.body.name}, function(err, account, count){
		if(account.length >0){
			res.send("Sorry, that name is taken!");
		}//end if
		else{
			new Account({username: req.body.name, id: req.body.id, password: req.body.pw1}).save();
			
			res.send("You made your account! Now go <a href=/login>log in</a>");
		}//end else
	});//end find
	}//end else
	
	/*Account.register(new Account({ username: req.body.name, id: req.body.id }), req.body.pw1, function(err) {
		if (err) {
			console.log(err);
			res.send("Oh no! There was a problem. Your username/password may be taken");
			}
		else{
			res.redirect('/login');
			}
  });*/
	
  
});

//THIS IS POOPY AND CHEATING. logging in isn't working right so for now I'm doing this.
app.post('/login', function(req,res){
	Account.find({username:req.body.username}, function(error, account, count){
		if(account.length !=0){
			req.session.name = req.body.username;
			req.session.accountID = account[0].id;
			console.log("logged in" + account);
			res.redirect('/');
			}
		else{
			res.send("Sorry, no user with that name exists");
			}
	});
}); 

app.get('/logout', function(req, res){
	req.session.name = '';
	res.redirect('/login');
});


app.listen(3000);
console.log("listening on port 3000");