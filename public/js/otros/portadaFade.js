window.onbeforeunload = function() {window.scrollTo(0,0);}//
/*ANIMACION PARA CAMBIAR SLOGAN*/

function changeSlogan (slogansArray , time){
	var titulo = document.getElementById("slogans");
	var currText = 0;
		

	setInterval(function(){
		var textSel = slogansArray[currText];
		titulo.textContent = textSel;								
		//console.log(textSel)
		currText += 1;

		if (currText === slogansArray.length){
		currText = 0 ;
		}

	},time)	

	setTimeout(function(){
		setInterval(function(){
			titulo.classList.add("shide");	
			//console.log("repeticion desaparecer")					
		},time)
			//console.log("empieza a desaparecer")
	} , time-500)


	setTimeout(function(){
		setInterval(function(){
			titulo.classList.remove("shide");	
			//console.log("repeticion aparecer")					
			},time)
			//console.log("empieza a aparecer")
	} , time+500)					

}



var time = 4500;
//changeSlogan(text1 , time)
//changePortada(ima2 , time)


/*MODULO NAVBAR*/

function navbar(){
	var nav = $("#navbar");
	var ima = $("#isotipo")
	window.onscroll = function(){
		var x = window.scrollY;
		if (x >600){
			nav.addClass("highNav")

			ima.css({
			display:"inline-block"
			})

			$(".navbar-default .navbar-nav>li>a").css({color:"whitesmoke"})
			$(".nav .navbar-header").css({backgroundColor:"#055174"})
			$(".navbar-collapse").css({backgroundColor:"#055174"})
			$(".navbar-default .navbar-nav>li>a").css({color:"whitesmoke"})

			$(".navbar-default .navbar-nav>li>a>.item").text("nada")


		}else{
			nav.removeClass("highNav")
	
			ima.css({
			display:"none"
			})
		
		}
	}
}


/*ANIMACION LOADING*/

function loading(time){
	// var protocol = location.protocol;
	// var host = location.host;
	// window.location = protocol + '//' + host + '/#loading';
	
	$(".sloganIT").hide("fast");
	$(".logoIT").hide("fast");
	var ini = false;
	var anim = setInterval(function(){
		if (ini === true){
			ini = false;
			$(".sloganIT").fadeIn(1000);
			$(".logoIT").fadeIn(1000);
		}else{
			ini = true
			$(".sloganIT").fadeOut(500);
			$(".logoIT").fadeOut(500);
		}


	},1100)


	setTimeout( function(){
		$(".loading").fadeOut("slow")
		$(".bodyMain").css({
			overflowY:"visible",
		})
		$(".navbar-header , .navbar-default").css({
			visible:"block",
		})
		
		clearInterval(anim)
		$(".logoIT").show("slow");

	} ,time)

}



function visualize (text){
	var txt = document.getElementsByClassName(text)[0]
	var group = document.getElementsByClassName("intro")
	var qgroup = group.length;
	for (i = 0 ; i<qgroup ; i++){
		var group = document.getElementsByClassName("intro")[i]	;
		group.style.display = 'none';	
	} 

	var txt = document.getElementsByClassName(text)[0]
	txt.style.display = 'block';

}

navbar()
loading(0);