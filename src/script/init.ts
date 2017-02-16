$(function () {
	// Init scrollSpy for topnav and sidenav.
	$('.scrollspy').scrollSpy({
		scrollOffset: 56
	})
	
	// Init a sidenav.
  $(".button-collapse").sideNav({
		closeOnClick: true
	});

	// Init a swiper used in works section.
	var mySwiper = new Swiper ('.swiper-container', {		
		// Navigation arrows
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		parallax: true,
		speed: 600,
		// effect: 'fade' ** caused previou slide to stay behind.
	})        

	// Init WOW (Reveal CSS animation as you scroll down a page.)
	new WOW().init()
})