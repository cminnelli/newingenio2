

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
		$(".loading").fadeOut(1000)

		$("body").css({
			overflowY:"visible",
		})
		$(".navbar-header , .navbar-default").css({
			visible:"block",
		})

    $(".portada").css({
      height:"400px",
    })

  


	} ,time)

}


//animacion TYPE

 

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
loading(5000);


var i = 0,
    a = 0,
    isBackspacing = false,
    isParagraph = false;

// Typerwrite text content. Use a pipe to indicate the start of the second line "|". 

//creatividad exigencias del mercado flexibilidad necesidades del cliente inteligencia ver que mas dinamismo respuesta

var textArray = [
  "Creatividad   | (exigencias del mercado) ", 
  "Flexibilidad  | (necesidades del cliente)", 
  "Inteligencia  | (orden del día)",
  "Dinamismo | ( de respuesta)",
  "INGENIO IT | Inteligencia y Creatividad aplicada a tus soluciones tecnologicas de recursos humanos "

];

// Speed (in milliseconds) of typing.
var speedForward = 32, //Typing Speed
    speedWait = 1000, // Wait between typing and backspacing
    speedBetweenLines = 100, //Wait between first and second lines
    speedBackspace = 25; //Backspace Speed

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

// (function () {
// 	// 3d Rotating Navigation - by CodyHouse.co
// 	var threeDNav = document.getElementsByClassName('js-cd-3d-nav');
// 	if (threeDNav.length > 0) {
// 		var header = document.getElementsByClassName('cd-header')[0],
// 			main = document.getElementsByClassName('cd-main')[0],
// 			marker = document.getElementsByClassName('cd-3d-nav__marker')[0],
// 			navTrigger = document.getElementsByClassName('cd-header__nav-trigger')[0],
// 			navItems = threeDNav[0].getElementsByTagName('li');

// 		//set marker width
// 		updateMarkerWidth();

// 		navTrigger.addEventListener('click', function (event) { // open/close navigation
// 			event.preventDefault();
// 			toggle3dBlock(!Util.hasClass(header, 'cd-header--is-translated'));
// 		});

// 		threeDNav[0].addEventListener('click', function (event) {
// 			var selectedItem = event.target.closest('li');
// 			if (!selectedItem) return;
// 			event.preventDefault();
// 			if (!Util.hasClass(selectedItem, 'cd-3d-nav__item--selected')) {
// 				Util.removeClass(threeDNav[0].getElementsByClassName('cd-3d-nav__item--selected')[0], 'cd-3d-nav__item--selected');
// 				Util.addClass(selectedItem.closest('li'), 'cd-3d-nav__item--selected');
// 				updateSelectedNav('close');
// 			}
// 		});

// 		window.addEventListener('resize', function () { // reset marker position on resize
// 			window.requestAnimationFrame(updateSelectedNav);
// 		});

// 		function toggle3dBlock(addOrRemove) {
// 			if (typeof (addOrRemove) === 'undefined') addOrRemove = true;
// 			Util.toggleClass(header, 'cd-header--is-translated', addOrRemove);
// 			Util.toggleClass(threeDNav[0], 'cd-3d-nav--is-visible', addOrRemove);
// 			Util.toggleClass(main, 'cd-main--is-translated', addOrRemove);
// 			main.addEventListener('transitionend', function cb() {
// 				//fix marker position when opening the menu (after a window resize)
// 				addOrRemove && updateSelectedNav();
// 				main.removeEventListener('transitionend', cb);
// 			});
// 		};

// 		function updateSelectedNav(type) { // update the marker position
// 			var selectedItem = threeDNav[0].getElementsByClassName('cd-3d-nav__item--selected')[0],
// 				selectedItemPosition = Util.getIndexInArray(navItems, selectedItem) + 1,
// 				leftPosition = selectedItem.getBoundingClientRect().left;

// 			removeClassPrefix(marker, 'cd-3d-nav__marker--col')
// 			Util.addClass(marker, 'cd-3d-nav__marker--col-' + selectedItemPosition);
// 			marker.style.left = leftPosition + 'px';
// 			updateMarkerWidth();
// 			if (type == 'close') {
// 				marker.addEventListener('transitionend', function cb() {
// 					marker.removeEventListener('transitionend', cb);
// 					toggle3dBlock(false);
// 				});
// 			}
// 		};

// 		function updateMarkerWidth() { // update the marker width
// 			marker.style.width = window.getComputedStyle(navItems[0]).getPropertyValue('width');
// 		};

// 		function removeClassPrefix(el, prefix) {
// 			var classes = el.className.split(" ").filter(function (c) {
// 				return c.lastIndexOf(prefix, 0) !== 0;
// 			});
// 			el.className = classes.join(" ").trim();
// 		};
// 	}
// })();

// // Utility function
// function Util() { };

// /* 
// 	class manipulation functions
// */
// Util.hasClass = function (el, className) {
// 	if (el.classList) return el.classList.contains(className);
// 	else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
// };

// Util.addClass = function (el, className) {
// 	var classList = className.split(' ');
// 	if (el.classList) el.classList.add(classList[0]);
// 	else if (!Util.hasClass(el, classList[0])) el.className += " " + classList[0];
// 	if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
// };

// Util.removeClass = function (el, className) {
// 	var classList = className.split(' ');
// 	if (el.classList) el.classList.remove(classList[0]);
// 	else if (Util.hasClass(el, classList[0])) {
// 		var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
// 		el.className = el.className.replace(reg, ' ');
// 	}
// 	if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
// };

// Util.toggleClass = function (el, className, bool) {
// 	if (bool) Util.addClass(el, className);
// 	else Util.removeClass(el, className);
// };

// Util.setAttributes = function (el, attrs) {
// 	for (var key in attrs) {
// 		el.setAttribute(key, attrs[key]);
// 	}
// };

// /* 
//   DOM manipulation
// */
// Util.getChildrenByClassName = function (el, className) {
// 	var children = el.children,
// 		childrenByClass = [];
// 	for (var i = 0; i < el.children.length; i++) {
// 		if (Util.hasClass(el.children[i], className)) childrenByClass.push(el.children[i]);
// 	}
// 	return childrenByClass;
// };

// /* 
// 	Animate height of an element
// */
// Util.setHeight = function (start, to, element, duration, cb) {
// 	var change = to - start,
// 		currentTime = null;

// 	var animateHeight = function (timestamp) {
// 		if (!currentTime) currentTime = timestamp;
// 		var progress = timestamp - currentTime;
// 		var val = parseInt((progress / duration) * change + start);
// 		element.setAttribute("style", "height:" + val + "px;");
// 		if (progress < duration) {
// 			window.requestAnimationFrame(animateHeight);
// 		} else {
// 			cb();
// 		}
// 	};

// 	//set the height of the element before starting animation -> fix bug on Safari
// 	element.setAttribute("style", "height:" + start + "px;");
// 	window.requestAnimationFrame(animateHeight);
// };

// /* 
// 	Smooth Scroll
// */

// Util.scrollTo = function (final, duration, cb) {
// 	var start = window.scrollY || document.documentElement.scrollTop,
// 		currentTime = null;

// 	var animateScroll = function (timestamp) {
// 		if (!currentTime) currentTime = timestamp;
// 		var progress = timestamp - currentTime;
// 		if (progress > duration) progress = duration;
// 		var val = Math.easeInOutQuad(progress, start, final - start, duration);
// 		window.scrollTo(0, val);
// 		if (progress < duration) {
// 			window.requestAnimationFrame(animateScroll);
// 		} else {
// 			cb && cb();
// 		}
// 	};

// 	window.requestAnimationFrame(animateScroll);
// };

// /* 
//   Focus utility classes
// */

// //Move focus to an element
// Util.moveFocus = function (element) {
// 	if (!element) element = document.getElementsByTagName("body")[0];
// 	element.focus();
// 	if (document.activeElement !== element) {
// 		element.setAttribute('tabindex', '-1');
// 		element.focus();
// 	}
// };

// /* 
//   Misc
// */

// Util.getIndexInArray = function (array, el) {
// 	return Array.prototype.indexOf.call(array, el);
// };

// Util.cssSupports = function (property, value) {
// 	if ('CSS' in window) {
// 		return CSS.supports(property, value);
// 	} else {
// 		var jsProperty = property.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
// 		return jsProperty in document.body.style;
// 	}
// };

// /* 
// 	Polyfills
// */
// //Closest() method
// if (!Element.prototype.matches) {
// 	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
// }

// if (!Element.prototype.closest) {
// 	Element.prototype.closest = function (s) {
// 		var el = this;
// 		if (!document.documentElement.contains(el)) return null;
// 		do {
// 			if (el.matches(s)) return el;
// 			el = el.parentElement || el.parentNode;
// 		} while (el !== null && el.nodeType === 1);
// 		return null;
// 	};
// }

// //Custom Event() constructor
// if (typeof window.CustomEvent !== "function") {

// 	function CustomEvent(event, params) {
// 		params = params || { bubbles: false, cancelable: false, detail: undefined };
// 		var evt = document.createEvent('CustomEvent');
// 		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
// 		return evt;
// 	}

// 	CustomEvent.prototype = window.Event.prototype;

// 	window.CustomEvent = CustomEvent;
// }

// /* 
// 	Animation curves
// */
// Math.easeInOutQuad = function (t, b, c, d) {
// 	t /= d / 2;
// 	if (t < 1) return c / 2 * t * t + b;
// 	t--;
// 	return -c / 2 * (t * (t - 2) - 1) + b;
// };


