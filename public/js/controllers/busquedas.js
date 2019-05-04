

 var config = {
    apiKey: "AIzaSyC4YSAIYjUtCNxXPOaaGlYNqPwdURNsxT0",
    authDomain: "ingeniotecnico-554ef.firebaseapp.com",
    databaseURL: "https://ingeniotecnico-554ef.firebaseio.com",
    projectId: "ingeniotecnico-554ef",
    storageBucket: "ingeniotecnico-554ef.appspot.com",
    messagingSenderId: "539431846999"
  };

firebase.initializeApp(config);


app.controller("busquedaController" , function($scope , $http , googleService , myService){

	$scope.servicios_in = [
		{nombre:"Busqueda y Selección" , descripcion:"Porque somos especialistas, estamos comprometidos en la búsqueda de un resultado que signifique tanto un crecimiento personal y profesional para nuestros candidatos, como también una incorporación de valor al equipo humano y técnico de nuestros clientes." , img:"/imagenes/web/portada2.jpg"},
		{nombre:"Capacitación" , descripcion:"Como creemos en la búsqueda constante de excelencia, potenciamos equipos y profesionales mediante la implementación y el diseño de innovadoras propuestas de capacitación, orientadas a impactar directamente sobre su performance personal y profesional." , img:"/imagenes/web/portada5.jpg"},
		{nombre:"Psicotécnicos y Evaluaciones" , descripcion:"Involucrados con la calidad, facilitamos una amplia gama de evaluaciones psicotecnicas diseñadas y administradas por psicólogos y especialistas en las distintas ramas de la industria, lo cual nos permite alcanzar los mejores resultados en cada proceso de reclutamiento." , img:"/imagenes/web/service2.jpg"},
		
	]

	$scope.servicios_it = [
		{nombre:"Busqueda de desarrolladores" , descripcion:"Porque somos especialistas, estamos comprometidos en la búsqueda de un resultado que signifique tanto un crecimiento personal y profesional para nuestros candidatos, como también una incorporación de valor al equipo humano y técnico de nuestros clientes." , img:"/imagenes/web/portada2.jpg"},
		{nombre:"Psicotécnicos y Evaluaciones" , descripcion:"Involucrados con la calidad, facilitamos una amplia gama de evaluaciones psicotecnicas diseñadas y administradas por psicólogos y especialistas en las distintas ramas de la industria, lo cual nos permite alcanzar los mejores resultados en cada proceso de reclutamiento." , img:"/imagenes/web/service2.jpg"},
		
	]
	
	


//GOOGLE VARIABLES
	$scope.gmailUser // data de google
	$scope.userMail;
	$scope.userName = null;
	$scope.sesionMsg = "Inicia Sesion!";
	$scope.firstName = "";

//MENSAJE MODAL LOGUEADO
$scope.sign = false;
$scope.nosign = true;

//BD EMPLEOS
$scope.job;
$scope.robot = false;

// BUTTONS , LOADER & PROGRESS

$scope.buttonGoogle = true;
$scope.ingenio = false;
$scope.loader = true;
$scope.signOut = false;
$scope.spinnerContact = false;
/*BOTONERA SIGN GOOGLE FUNCTION*/


$scope.conect = function(event){
	$scope.spinnerContact = true;

}

// $scope.sendMail = function(){
	
// 	myService.angularhttp("post", "sendMail" , function(data){
// 		console.log(data);
// 	})
// }


$scope.displayButtons = function(data){
		$scope.gmailUser = data;
		$scope.userMail = data.email;
		$scope.firstName = data.displayName.split(" ")[0];
		$scope.buttonGoogle = false;
		$scope.signOut = true;
		
		$(".avatar").attr('src', data.photoURL);

	if ($scope.userMail === "cminnelli@gmail.com" || $scope.userMail ==="web.ingeniotecnico@gmail.com"){
		$scope.sesionMsg = "Hola  " + $scope.firstName + " Ingenio !";
		$scope.ingenio = true;
	}else{
		$scope.sesionMsg = "Acceso denegado"
	}

	$scope.$apply();
}



/*TRANSFORMAR FIREBASE DB EN UN JSON Y MUESTRA LAS OFERTAS LABORALES*/

googleService.monitor("empleos" ,function(data){

	if(data != null){
		var arr = myService.object2array(data)
		$scope.job = myService.object2array(data);
		$scope.loader = false;		
	}else{
		$scope.robot = true;
	}


	try{
		var userName = googleService.currentUser();
		$scope.displayButtons(userName);	
		console.log("Usuario Logueado " + userName.displayName)
	}
	catch(e){
		console.log("No hay usuario de gmail logueado")
		$scope.$apply();
	}
	
})



$scope.simulate =function(){

	$("#division").val("division test"),
	$("#cuit").val("30256323235"),
	$("#empresa").val("IT Solutions"),
	$("#puesto").val("Gerente de IT"),
	$("#seniority").val("Gerente"),
	$("#rubro").val("IT"),
	$("#segmento").val("TECNO"),
	$("#area").val("Software"),
	$("#ubicacion").val("Martinez"),
	$("#comentarios").val("lorem ipsum lorem ipsum lorem ipsum lorem ipsum")

}


$scope.newJob = function(){

		var newOffer = {
			division:$("#division").val(),
			cuit:$("#cuit").val(),
			empresa:$("#empresa").val(),
			puesto:$("#puesto").val(),
			seniority:$("#seniority").val(),
			rubro:$("#rubro").val(),
			segmento:$("#segmento").val(),
			area:$("#area").val(),
			ubicacion:$("#ubicacion").val(),
			comentarios:$("#comentarios").val()
		} //Creacion objeto oferta

		googleService.newJob(newOffer , function(key){
			console.log("agregando key : " + key)
			googleService.update("empleos/" + key , {key: key}) //agrego id-key como property
		}); //agregrando oferta


}

$scope.eliminarJob = function(key){
	googleService.remJob("empleos/" , key);
}




$scope.googleSignIn = function(){
	
	//INICIAMOS LA AUTENTIFICACION DE GOOGLE
	googleService.googleAuth(function(data){
		// INFORMACION DE GMAIL
		console.log(data)
		$scope.displayButtons(data);
		$('#postulModal').modal('hide');

	})

}

$scope.googleSignOut = function(){
	googleService.signOut();
	$scope.sesionMsg = "Inicia Sesion!";
	$scope.buttonGoogle = true;
	$scope.butCv = false;
	$scope.ingenio = false; 
	$scope.signOut = false;
	$scope.userName = null;

}

// DEFINIR ESTRELLA DE PUESTOS NG REPEAT
$scope.getStars = function(seniority){
	var arrOne = [1,2,3,4,5];
	var arrTwo = [1,2];

	if (seniority === "Senior"){
		return arrOne
	}else{
		return arrTwo   
	}
}



})	


//Diferencia entre update, set y push
//Set reemplaza, update agrega o cambia valores y push genera un objeto nuevo con un key predeterminado
