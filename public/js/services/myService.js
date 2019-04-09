


app.service("myService" , function($http){



	this.getExtension = function(fileName){
		var pos = fileName.indexOf(".");
		var ext = fileName.substr(pos , 4);
		return ext;
	}

	this.checkExtension = function(ext){

		var list = [".pdf" , ".doc" , ".doc" , ".txt"];
		if (list.indexOf(ext)>-1){
			return true;
		}else{
			return false;
		}

	}

	this.object2array = function(obj){
		
		var arr = [];
		for (x in obj){
			var empresa = obj[x];
			arr.push(empresa)
		}
		return arr;
	}

	this.objLength = function(obj){
		var counter = 0;
		
		for (x in obj){
			counter ++
		}

		return counter;
	}

	this.angularhttp = function(method, urlx ,cb){
	        console.log("Ejecutando Servicio Angular HTTP")
	        var protocol = location.protocol;
	        var host = location.host;
	        var web = protocol + "//" + host+ "/"+ urlx

	        $http({
	          method: method,
	          url: web


	        }).then(function successCallback(response) {
	            cb(response.data)
	          }, function errorCallback(response) {
	            // called asynchronously if an error occurs
	            // or server returns response with an error status.
	          });
	    }
    
})
