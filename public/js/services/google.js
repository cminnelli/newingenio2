
app.service("googleService" , function(){

	// USUARIO ACTUAL INFO
	this.currentUser = function(){
		var user = firebase.auth().currentUser;
		return user;
	}


	// NUEVO REGISTRO

	this.nuevoDato = function(path , obj, cb){
		database = firebase.database();
		firebase.database().ref(path).push(obj);
		cb();				
	}

	this.update = function(path , obj){
		database = firebase.database();
		firebase.database().ref(path).update(obj);						
	}


	// NUEVA JOB OFFER
	this.newJob = function(obj,cb){
		database = firebase.database();	
		var newOffer = firebase.database().ref('empleos/').push(obj);
		var key = newOffer.key;
		cb(key)
	}

		// REMOVE JOB OFFER
		this.remJob = function(path , key){
			database = firebase.database();	
			var delofer = firebase.database().ref(path).child(key).remove();		
		
		}





	//FILTRAR 

	this.filter = function(pth , property , equalTo ,  callback) {
		var database = firebase.database().ref(pth).orderByChild(property).equalTo(equalTo);
		database.once('value', function(snapshot) {
			 callback(snapshot.val())
		});
	}



	//MONITOREAR BASE DE DATOS
	this.monitor = function(pth , callback) {
		var database = firebase.database().ref(pth);
		database.on('value', function(snapshot) {
		 callback(snapshot.val())		 
		});
		
	}

	//MONITOREAR BASE DE DATOS UNA VEZ
	this.onmonitor = function(pth , callback) {
		var database = firebase.database().ref(pth);
		database.once('value', function(snapshot) {
		 callback(snapshot.val())
		
		});
		
	}

	//GOOGLE AUTH

	this.googleAuth = function(cb){
	  var provider = new firebase.auth.GoogleAuthProvider();
	  firebase.auth().signInWithPopup(provider).then(function(result) {
	  	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
	    var token = result.credential.accessToken;
	    var user = result.user;

	    cb(user)

	  }).catch(function(error) {

	    var errorCode = error.code;
	    var errorMessage = error.message;
	    var email = error.email;
	    var credential = error.credential;

	  });
	}

	this.signOut = function(){
		firebase.auth().signOut().then(function() {
		  $(".avatar").slideUp(400)
		  $(".avatar").attr('src', "../../../imagenes/web/avatar2.png");
		  $(".avatar").slideDown(400)


		}).catch(function(error) {
		  // An error happened.
		});
	}



})

