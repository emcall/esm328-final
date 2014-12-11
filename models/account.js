var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
   	"id" : {type:Number, required:[true, "need an ID#"]},
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);