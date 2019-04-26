
var express = require("express");
var app = express();
const port = process.env.PORT || 3000  
var path = require("path");
var fs = require("fs");
var mail = require("./node_aux/nodeMailer.js")
//var mailingenio = "contacto.ingeniotecnico@gmail.com";
var mailingenio = "cminnelli@gmail.com";

var user = "ingeniotecnico"
var ps = "ingenio2017."

/*MONGO Y MONGOOSE*/
//var mongoose = require("mongoose");
//mongoose.connect("mongodb://admin:ingenio88@ds243085.mlab.com:43085/ingeniotecnico");
// /*mongoose.connect("mongodb://localhost:27017/autos");  MODO LOCAL  */

/*MODELOS DE MONGOOSE*/
var joboffer = require("./models/jobofferbd_bd.js") 
var linkedinUser = require("./models/linkedin_bd.js") 


/*BODY PARSER MIDDLEWARE*/
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*SERVE STATIC FILES*/
app.use(express.static(path.join(__dirname, 'public')));



/*APP ROUTES*/
app.listen(port, function(req , res){
	console.log("Listening ingenio tecnico IT in port: " + port);
})


app.get("/" , function(req , res){

	res.sendFile(path.join(__dirname ,"index_it.html"));

})

app.get("/ingenieria" , function(req,res){
	res.sendFile(path.join(__dirname ,"index_in.html"));
})

app.get("/it" , function(req,res){
	res.sendFile(path.join(__dirname ,"index_it.html"));
})


app.get("/admin" , function(req,res){
	res.sendFile(path.join(__dirname ,"admin.html"));
})

app.get("/mailcontacto" , function(req,res){
	res.sendFile(path.join(__dirname ,"contactomsj.html"));
})


var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var Busboy = require('busboy');




app.post("/sendMail" , upload.single('adjunto'),  function(req, res, next){
	var pt = req.file;
		var bd = req.body;

	var mailOptions = {
	  from: req.body.mail ,
	  to: mailingenio,
	   attachments: [{
	    filename: pt.originalname,
	    path: pt.path,
	   contentType: 'application/pdf'
	  }],

	  subject: 'Usuario: ' + req.body.nombre +' - Mail: ' + req.body.mail + " - Asunto: " + req.body.asunto,
	  text: req.body.comentario
	};


mail.enviar(mailOptions , function(data){
	console.log(data);
	var check =data.indexOf("OK")
	console.log("check: " + check)
	if (check > 0){
		res.redirect("/mailcontacto")
	}else{
		console.log("error");		
	}
})
})




