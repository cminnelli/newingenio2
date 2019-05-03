
/*ANIMACION LOADING*/

function loading(time){


	setTimeout( function(){
		$(".loading").fadeOut(1000)

		$("body").css({
			overflowY:"visible",
		})
		$(".navbar-header , .navbar-default").css({
			visible:"block",
		})

		var typed = new Typed("#typed", {

			strings: ["Innovacion   <p class='function'> ( anticiparnos al futuro ) </p> ", "Creatividad   <p class='function'> ( exigencias del mercado ) </p> ", "Flexibilidad  <p class='function'> ( Necesidades del cliente )</p> ", "Dinamismo  <p class='function'> ( Respuesta )  </p> "],
			typeSpeed: 30,//specifies the typing speed of the text
			backSpeed: 15, //specifies speed of deletion of the text,
			contentType: 'html',
			loop: false //repetition
		});
		setTimeout(function () {

		}, 1000)

	} ,time)

}



// function visualize (text){
// 	var txt = document.getElementsByClassName(text)[0]
// 	var group = document.getElementsByClassName("intro")
// 	var qgroup = group.length;
// 	for (i = 0 ; i<qgroup ; i++){
// 		var group = document.getElementsByClassName("intro")[i]	;
// 		group.style.display = 'none';	
// 	} 

// 	var txt = document.getElementsByClassName(text)[0]
// 	txt.style.display = 'block';

// }

// navbar()
loading(3000);