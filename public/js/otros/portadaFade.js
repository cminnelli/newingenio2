
var i = 0,
    a = 0,
    isBackspacing = false,
    isParagraph = false;

var textArray = [
  "Creatividad   | (exigencias del mercado) ", 
  "Flexibilidad  | (necesidades del cliente)", 
  "Inteligencia  | (orden del día)",
  "Dinamismo | (de respuesta)",
  "INGENIO IT | Inteligencia y Creatividad aplicada a tus soluciones tecnologicas de recursos humanos "

];

// Speed (in milliseconds) of typing.
var speedForward = 32, //Typing Speed
    speedWait = 1000, // Wait between typing and backspacing
    speedBetweenLines = 100, //Wait between first and second lines
    speedBackspace = 25; //Backspace Speed


window.onload = function () {
	Particles.
		init
		({

			// normal options
			selector:
				'.part'
			,
			maxParticles:
				170
			,
			connectParticles:true,
			color:"#26D0CE",
			minDistance:120,
			sizeVariations: 3,
			speed: 1.2,

			// options for breakpoints
			responsive: [
				{
					breakpoint:
						768
					,
					options: {
						maxParticles:
							65
						,
						color:
							'#26D0CE'
						,
						connectParticles:
							true
					}
				}, {
					breakpoint:
						425
					,
					options: {
						maxParticles:
							60
						,
						connectParticles:
							true
					}
				}, {
					breakpoint:
						320
					,
					options: {
						maxParticles:
							0

						// disables particles.js
					}
				}
			]
		});
};


/*ANIMACION LOADING*/

function loading(time){


	setTimeout( function(){


		$(".bodyMain , body").css({
			overflowY:"visible",
		})

		$("nav ,.navbar , .navbar-expand-md , .navbar-dark , .bg-primary").css({
			display:"block"
		})

    if (window.matchMedia("(min-width: 600px)").matches) {
      $(".portada").css({
        height:"380px",
      })
    } else {
      $(".portada").css({
        height:"100vh",
      })
    }
    $(".loading").fadeOut(1200)
    typew();

    // alert("listo")

	} ,time)

}




var typew = function(){


//Run the loop
typeWriter("output", textArray);

function typeWriter(id, ar) {
  var element = $("#" + id),
      aString = ar[a],
      eHeader = element.children("h1"), //Header element
      eParagraph = element.children("p"); //Subheader element
  
  // Determine if animation should be typing or backspacing
  if (!isBackspacing) {
    
    // If full string hasn't yet been typed out, continue typing
    if (i < aString.length) {
      
      // If character about to be typed is a pipe, switch to second line and continue.
      if (aString.charAt(i) == "|") {
        isParagraph = true;
        eHeader.removeClass("cursor");
        eParagraph.addClass("cursor");
        i++;
        setTimeout(function(){ typeWriter(id, ar); }, speedBetweenLines);
        
      // If character isn't a pipe, continue typing.
      } else {
        // Type header or subheader depending on whether pipe has been detected
        if (!isParagraph) {
          eHeader.text(eHeader.text() + aString.charAt(i));
        } else {
          eParagraph.text(eParagraph.text() + aString.charAt(i));
        }
        i++;
        setTimeout(function(){ typeWriter(id, ar); }, speedForward);
      }
      
    // If full string has been typed, switch to backspace mode.
    } else if (i == aString.length) {
      
      isBackspacing = true;
      setTimeout(function(){ typeWriter(id, ar); }, speedWait);
      
    }
    
  // If backspacing is enabled
  } else {
    
    // If either the header or the paragraph still has text, continue backspacing
    if (eHeader.text().length > 0 || eParagraph.text().length > 0) {
      
      // If paragraph still has text, continue erasing, otherwise switch to the header.
      if (eParagraph.text().length > 0) {
        eParagraph.text(eParagraph.text().substring(0, eParagraph.text().length - 1));
      } else if (eHeader.text().length > 0) {
        eParagraph.removeClass("cursor");
        eHeader.addClass("cursor");
        eHeader.text(eHeader.text().substring(0, eHeader.text().length - 1));
      }
      setTimeout(function(){ typeWriter(id, ar); }, speedBackspace);
    
    // If neither head or paragraph still has text, switch to next quote in array and start typing.
    } else { 
      
      isBackspacing = false;
      i = 0;
      isParagraph = false;
      a = (a + 1) % ar.length; //Moves to next position in array, always looping back to 0
      setTimeout(function(){ typeWriter(id, ar); }, 50);
      
    }
  }
}
}


loading(2000);
