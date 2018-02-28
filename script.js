$(function(){	
	var carousel = $('#carousel'),
		carouselList = $("#carousel ul"),
		$pagination = $('#pagination'),
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
		var currentIndex = +carouselList.find('li').first().attr('data-id'),
			nextIndex = currentIndex;

		switch (direction) {
			case LEFT_DIRECTION:
				moveLastSlide();
				carouselList.animate({'marginLeft': 0}, ANIMATION_DURATION);

				if (currentIndex === 0) {
					nextIndex = carouselList.find('li').length - 1;
				} else {
					nextIndex--;
				}
				break;
			case RIGHT_DIRECTION:
				carouselList.animate({'marginLeft': -IMAGE_WIDTH}, ANIMATION_DURATION, moveFirstSlide);
				
				if (currentIndex === carouselList.find('li').length - 1) {
					nextIndex = 0;
				} else {
					nextIndex++;
				}
				break;
		}	
		
		$pagination.find('li').removeClass('active').eq(nextIndex).addClass('active');
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

	function createPagination() {
		var liElements = carouselList.find('li').length,
			paginationElements = [];

		for (var i = 0; i < liElements; i++) {
			paginationElements.push($('<li>'));
		}

		paginationElements[0].addClass('active');
		$pagination.append(paginationElements);
	}

	function addIdsToSlides() {
		carouselList.find('li').each(function(index, element) {
			$(element).attr('data-id', index);
		});
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

	addIdsToSlides();
	createPagination();
});
