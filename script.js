$(function(){	
	var carousel = $('#carousel'),
		carouselList = $("#carousel ul"),
		interval;

	var ANIMATION_TIMEOUT = 2000,
		IMAGE_WIDTH = 400,
		ANIMATION_DURATION = 500,
		LEFT_DIRECTION = 'left',
		RIGHT_DIRECTION = 'right';
	
	interval = setInterval(function() {
		changeSlide(RIGHT_DIRECTION);
	}, ANIMATION_TIMEOUT);
	
	function changeSlide(direction) {
		switch (direction) {
			case LEFT_DIRECTION:
				moveLastSlide();
				carouselList.animate({'marginLeft': 0}, ANIMATION_DURATION);
				break;
			case RIGHT_DIRECTION:
				carouselList.animate({'marginLeft': -IMAGE_WIDTH}, ANIMATION_DURATION, moveFirstSlide);
				break;
		}						
	}

	function moveFirstSlide () {
		var firstItem = carouselList.find("li:first");
		var lastItem = carouselList.find("li:last");
		lastItem.after(firstItem);
		carouselList.css({marginLeft: 0});
	}	

	function moveLastSlide () {
		var firstItem = carouselList.find("li:first");
		var lastItem = carouselList.find("li:last");
		firstItem.before(lastItem);
		carouselList.css({marginLeft: -IMAGE_WIDTH});
	}	

	carousel.hover(
		function() {
			// wyłączam interval
			clearInterval(interval);
		},
		function() {
			// włączam interval
			interval = setInterval(function() {
				changeSlide(RIGHT_DIRECTION);
			}, ANIMATION_TIMEOUT);
		}
	);

	$('#next').click(function(e) {
		e.preventDefault();
		changeSlide(RIGHT_DIRECTION);
	});	

	$('#prev').click(function(e) {
		e.preventDefault();
		changeSlide(LEFT_DIRECTION);
	});	
});
