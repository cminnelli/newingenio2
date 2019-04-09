
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var jobSchema =  new Schema({
	empresa:String,
	puesto:String,
	seniority:String,
	rubro:String,
	segmento:String,
	area:String,
	location:String,
	linkedin:String,
	fecha:Date	
	

}, {collection:"joboffer"});

var jobs = mongoose.model("jobs" , jobSchema)



module.exports = jobs;


