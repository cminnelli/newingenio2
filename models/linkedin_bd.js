
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var linkedinSchema =  new Schema({
	linkedin:String,
}, {collection:"linkedinoffer"});

var linkedinUser = mongoose.model("linkedin" , linkedinSchema)

module.exports = linkedinUser;