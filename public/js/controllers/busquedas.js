

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
		{nombre:"Búsqueda y Selección" , descripcion:"Porque somos especialistas, estamos comprometidos en la búsqueda de un resultado que signifique tanto un crecimiento personal y profesional para nuestros candidatos, como también una incorporación de valor al equipo humano y técnico de nuestros clientes." , img:"/imagenes/web/portada1.jpg"},
		{nombre:"Capacitación" , descripcion:"Como creemos en la búsqueda constante de excelencia, potenciamos equipos y profesionales mediante la implementación y el diseño de innovadoras propuestas de capacitación, orientadas a impactar directamente sobre su performance personal y profesional." , img:"/imagenes/web/capacitacion.jpeg"},
		{nombre:"Psicotécnicos y Evaluaciones" , descripcion:"Involucrados con la calidad, facilitamos una amplia gama de evaluaciones psicotecnicas diseñadas y administradas por psicólogos y especialistas en las distintas ramas de la industria, lo cual nos permite alcanzar los mejores resultados en cada proceso de reclutamiento." , img:"/imagenes/web/psicotecnicos.jpg"},
		
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
$scope.notlogin = true;

//BD EMPLEOS
$scope.job;
$scope.robot = false;

// BUTTONS , LOADER & PROGRESS

$scope.buttonGoogle = true;
$scope.ingenio = false;
$scope.loader = false;
$scope.signOut = false;
$scope.spinnerContact = false;



/*TRANSFORMAR FIREBASE DB EN UN JSON Y MUESTRA LAS OFERTAS LABORALES*/

$scope.activatemonitor = function(){
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
			console.log("Usuario Logueado " + userName.displayName);
			$scope.loader = true;
		}
		catch(e){
			console.log("No hay usuario de gmail logueado")
			$scope.$apply();
		}
		
	})

}


$scope.newJob = function(){

		var newOffer = {
			division:$("#division").val(),
			empresa:$("#empresa").val(),
			puesto:$("#puesto").val(),
			seniority:$("#seniority").val(),
			rubro:$("#rubro").val(),
			area:$("#area").val(),
			ubicacion:$("#ubicacion").val(),
			comentarios:$("#comentarios").val()
		} //Creacion objeto oferta

		googleService.newJob(newOffer , function(key){
			console.log("agregando key : " + key)
			googleService.update("empleos/" + key , {key: key}) //agrego id-key como property
		}); //agregrando oferta

		$("input").val("");
		$('#modal').modal('toggle');
}

$scope.eliminarJob = function(key){
	googleService.remJob("empleos/" , key);
}




$scope.googleSignIn = function(){
	$scope.loader = true;
	//INICIAMOS LA AUTENTIFICACION DE GOOGLE
	googleService.googleAuth(function(data){
		// INFORMACION DE GMAIL
		console.log(data)
		$scope.gmailUser = data;
		$scope.userMail = data.email;
		$scope.firstName = data.displayName.split(" ")[0];
			
		if ($scope.userMail === "cminnelli@gmail.com" || $scope.userMail ==="web.ingeniotecnico@gmail.com" || $scope.userMail ==="jsalvador.ingeniotecnico@gmail.com" || $scope.userMail ==="ezequieljaburr@gmail.com"){
			$scope.sesionMsg = "Hola  " + $scope.firstName + " Ingenio !";
			$scope.ingenio = true;
			$scope.buttonGoogle = false;
			$scope.signOut = true;
			$scope.activatemonitor();
			$(".avatar").attr('src', data.photoURL);
			$(".sesion").css({"background": "#11998e" , "background": "-webkit-linear-gradient(to right, #11998e, #38ef7d)" , "background": "linear-gradient(to right, #ed213a, #93291e)"});
			$(".sesion").css({"background": "#ed213a" , "background": "-webkit-linear-gradient(to right, #ed213a, #93291e)" , "background": "linear-gradient(to right, #11998e, #38ef7d)"});
		}else{
			$scope.sesionMsg = "Acceso denegado";
			$scope.job = "";
			$scope.loader = false;
			$scope.$apply();
			$(".sesion").css({"background": "#11998e" , "background": "-webkit-linear-gradient(to right, #11998e, #38ef7d)" , "background": "linear-gradient(to right, #ed213a, #93291e)"});

		}

		$('#postulModal').modal('hide');

	
		$scope.notlogin = false;

	})

}


$scope.googleSignOut = function(){
	googleService.signOut();
	$scope.sesionMsg = "Inicia Sesion!";
	$scope.buttonGoogle = true;
	$scope.butCv = false;
	$scope.ingenio = false; 
	$scope.signOut = false;
	$scope.loader = false;
	$scope.userName = null;
	$scope.job = true;
	$scope.notlogin = true;

}
})	

