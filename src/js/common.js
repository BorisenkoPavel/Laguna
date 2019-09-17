$(document).ready(function () {
	
	// AOS.init();
  $( function() {
    $( "#tabs" ).tabs();
  } );
	svg4everybody({});

	// Modernizr.on('webp', function(result) {
	// 	if (result) {
	// 		// supported
	// 	} else {
	// 		// not-supported
	// 	}
	// });

$('.hamburger').on('click', function(){
  $(this).toggleClass('is-active')
  $('.menu').toggleClass('is-active')
  $('header').toggleClass('is-active')
  $('.wrapper').toggleClass('overflow-hidden')
  $('.logo').toggleClass('change-color')
})


	var mySwiper= new Swiper('.swiper-container.banner-slider', {
			speed: 400,
      navigation: {
        nextEl: '.swiper-button-next.banner-button-next',
        prevEl: '.swiper-button-prev.banner-button-prev',
      },
	});

	console.clear();

canvasWidth = 1600;
canvasHeight = 170;

pCount = 0;


pCollection = new Array();

var puffs = 1;
var particlesPerPuff = 2000;
var img = '../img/general/smoke2.png';

var smokeImage = new Image();
smokeImage.src = img;

for (var i1 = 0 ; i1 < puffs; i1++)
{
  var puffDelay = i1 * 1500; //300 ms between puffs

  for (var i2 = 0 ; i2 < particlesPerPuff; i2++)
  {
    addNewParticle((i2*50) + puffDelay);    
  }
}


draw(new Date().getTime(), 3000)



function addNewParticle(delay)
{

  var p = {};
  p.top = canvasHeight;
  p.left = randBetween(-200,800);

  p.start = new Date().getTime() + delay;
  p.life = 8000;
  p.speedUp = 30;


  p.speedRight = randBetween(0,20);

  p.rot = randBetween(-1,1);
  p.red = Math.floor(randBetween(0,255));
  p.blue = Math.floor(randBetween(0,255));
  p.green = Math.floor(randBetween(0,255));


  p.startOpacity = .5
  p.newTop = p.top;
  p.newLeft = p.left;
  p.size = 200;
  p.growth = 15;

  pCollection[pCount] = p;
  pCount++;


}

function draw(startT, totalT)
{
  //Timing
  var timeDelta = new Date().getTime() - startT;
  var stillAlive = false;

  //Grab and clear the canvas
  var c=document.getElementById("myCanvas");
  var ctx=c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  c.width = c.width;

  //Loop through particles
  for (var i= 0; i < pCount; i++)
  {    
    //Grab the particle
    var p = pCollection[i];

    //Timing
    var td = new Date().getTime() - p.start;
    var frac = td/p.life

    if (td > 0)
    {
      if (td <= p.life )
      { stillAlive = true; }

      //attributes that change over time
      var newTop = p.top - (p.speedUp * (td/1000));
      var newLeft = p.left + (p.speedRight * (td/1000));
      var newOpacity = Math.max(p.startOpacity * (1-frac),0);

      var newSize = p.size + (p.growth * (td/1000));
      p.newTop = newTop;
      p.newLeft = newLeft;

      //Draw!
      ctx.fillStyle = 'rgba(150,150,150,' + newOpacity + ')';      
      ctx.globalAlpha  = newOpacity;
      ctx.drawImage(smokeImage, newLeft, newTop, newSize, newSize);
    }
  }



  //Repeat if there's still a living particle
  if (stillAlive)
  {
    requestAnimationFrame(function(){draw(startT,totalT);}); 
  }
  else
  {
    clog(timeDelta + ": stopped");
  }
}

function randBetween(n1,n2)
{
  var r = (Math.random() * (n2 - n1)) + n1;
  return r;
}

function randOffset(n, variance)
{
  //e.g. variance could be 0.1 to go between 0.9 and 1.1
  var max = 2 + variance;
  var min = 1 - variance;
  var r = Math.random() * (max - min) + min;
  return n * r;
}

function clog(s)
{  
  console.log(s);
}

var hallSlider = new Swiper('.swiper-container.halls-slider', {
  slidesPerView: 2,
  spaceBetween: 20,
  navigation: {
    nextEl: '.swiper-button-next.hall-button-next',
    prevEl: '.swiper-button-prev.hall-button-prev',
  },
   breakpoints: {
    768: {
      slidesPerView: 1,
    },
  }
})
var photoSlider = new Swiper('.swiper-container.swiper-photo', {
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    clickable: true,
    el: '.swiper-pagination.swiper-pagination--photo',
    type: 'bullets',
  },
})
var reviewSlider = new Swiper('.swiper-container.swiper-reviews', {
  slidesPerView: 3,
  spaceBetween: 20,
  pagination: {
    clickable: true,
    el: '.swiper-pagination.swiper-pagination--reviews',
    type: 'bullets',
  },
  
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    576: {
      slidesPerView: 1,
    },
  }
  
})

// /* a Pen by Diaco m.lotfollahi  : https://diacodesign.com */
// var falling = true;

// TweenLite.set("#container",{perspective:600})
// // TweenLite.set("img",{xPercent:"-50%",yPercent:"-50%"})

// var total = 5;
// var container = document.getElementById("container"),	w = 50 , h = 3000;
 
//  for (i=0; i<total; i++){ 
//    var Div = document.createElement('div');
//    TweenLite.set(Div,{attr:{class:'dot'},x:R(0,w),y:R(-200,-150),z:R(-00,200)});
//    container.appendChild(Div);
//    animm(Div);
//  }
 
//  function animm(elm){   
//    TweenMax.to(elm,R(6,15),{y:h+100,ease:Linear.easeNone,repeat:-1,delay:-15});
//    TweenMax.to(elm,R(4,8),{x:'+=100',rotationZ:R(0,180),repeat:-1,yoyo:true,ease:Sine.easeInOut});
//    TweenMax.to(elm,R(2,8),{rotationX:R(0,360),rotationY:R(0,360),repeat:-1,yoyo:true,ease:Sine.easeInOut,delay:-5});
//  };

// function R(min,max) {return min+Math.random()*(max-min)};






// /* a Pen by Diaco m.lotfollahi  : https://diacodesign.com */
$(window).scroll(function(e){
  parallaxScroll();
});
 
function parallaxScroll(){
  var scrolled = $(window).scrollTop();
  $('#parallax-bg-1').css('top',(1300-(scrolled*.75))+'px');
  $('#parallax-bg-2').css('top',(1300-(scrolled*.4))+'px');
  $('#parallax-bg-3').css('top',(1300-(scrolled*.25))+'px')
}
})
