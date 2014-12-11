var mongoose = require('mongoose');

var passportLocalMongoose = require('passport-local-mongoose');


var DreamDragonSchema = new mongoose.Schema({ 
	player: Number, 
	breed: {type:String, enum: ['guardian', 'tundra', "fae", "mirror", "spiral", "snapper", "ridgeback", "pearlcatcher", "skydancer", "wildclaw", "coatl", "imperial", "" ]},
	sex: String,
	element: {type:String, enum: ['fire', 'ice', "lightning", "shadow", "light", "nature", "plague", "arcane", "water", "wind", "earth", ""]},
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
	player: Number, 	
	breed: {type:String, enum: ['guardian', 'tundra', "fae", "mirror", "spiral", "snapper", "ridgeback", "pearlcatcher", "skydancer", "wildclaw", "coatl", "imperial", "" ]},
	sex: String,
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
	
/*var User = new mongoose.Schema({
	"id" : {type:Number, required:[true, "need an ID#"]},
	});

	
	User.plugin(passportLocalMongoose);
	
	module.exports = mongoose.model('User', User);*/
	
mongoose.connect('mongodb://localhost/dragons');
