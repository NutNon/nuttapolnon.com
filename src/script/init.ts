$(function () {
	$('.scrollspy').scrollSpy({
		scrollOffset: 64
	})

	var mySwiper = new Swiper ('.swiper-container', {		
		// Navigation arrows
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		parallax: true,
		speed: 600,
		// effect: 'fade' ** caused previou slide to stay behind.
	})        
})