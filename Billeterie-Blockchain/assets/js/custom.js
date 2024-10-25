(function ($) {
	
	"use strict";

	$('.owl-show-events').owlCarousel({
		items:4,
		loop:true,
		dots: true,
		nav: true,
		autoplay: true,
		margin:30,
		  responsive:{
			  0:{
				  items:1
			  },
			  600:{
				  items:2
			  },
			  1000:{
				  items:4
			  }
		  }
	  })

	const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

	let countDown = new Date('Mar 31, 2022 09:30:00').getTime(),
    x = setInterval(function() {    

      let now = new Date().getTime(),
          distance = countDown - now;

      document.getElementById('days').innerText = Math.floor(distance / (day)),
        document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
        document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
        document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);

      //do something later when date is reached
      //if (distance < 0) {
      //  clearInterval(x);
      //  'IT'S MY BIRTHDAY!;
      //}

    }, second)

	$(function() {
        $("#tabs").tabs();
    });
	

	$('.schedule-filter li').on('click', function() {
        var tsfilter = $(this).data('tsfilter');
        $('.schedule-filter li').removeClass('active');
        $(this).addClass('active');
        if (tsfilter == 'all') {
            $('.schedule-table').removeClass('filtering');
            $('.ts-item').removeClass('show');
        } else {
            $('.schedule-table').addClass('filtering');
        }
        $('.ts-item').each(function() {
            $(this).removeClass('show');
            if ($(this).data('tsmeta') == tsfilter) {
                $(this).addClass('show');
            }
        });
    });


	// Window Resize Mobile Menu Fix
	mobileNav();


	// Scroll animation init
	window.sr = new scrollReveal();
	

	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// Page loading animation
	 $(window).on('load', function() {

        $('#js-preloader').addClass('loaded');

    });


	// Window Resize Mobile Menu Fix
	$(window).on('resize', function() {
		mobileNav();
	});


	// Window Resize Mobile Menu Fix
	function mobileNav() {
		var width = $(window).width();
		$('.submenu').on('click', function() {
			if(width < 767) {
				$('.submenu ul').removeClass('active');
				$(this).find('ul').toggleClass('active');
			}
		});
	}


})(window.jQuery);
// assets/js/custom.js
document.addEventListener('DOMContentLoaded', function() {
    const eventForm = document.getElementById('event-form');
    const eventsDisplay = document.getElementById('events-display');

    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const eventName = document.getElementById('event-name').value;
        const eventOrganizer = document.getElementById('event-organizer').value;
        const eventDate = document.getElementById('event-date').value;
        const eventLocation = document.getElementById('event-location').value;
        const eventDescription = document.getElementById('event-description').value;
        const ticketPrice = document.getElementById('ticket-price').value;
        const ticketQuantity = document.getElementById('ticket-quantity').value;
        const eventImage = document.getElementById('event-image').files[0];

        // Créez une URL d'image
        const reader = new FileReader();
        reader.onloadend = function() {
            const newEvent = document.createElement('div');
            newEvent.className = 'col-lg-4 col-md-6 col-sm-12 mb-4';
            newEvent.innerHTML = `
                <div class="event-card">
                    <img src="${reader.result}" alt="${eventName}" class="event-image">
                    <h5>${eventName}</h5>
                    <p>Organisé par: ${eventOrganizer}</p>
                    <p>Date: ${eventDate}</p>
                    <p>Lieu: ${eventLocation}</p>
                    <p>${eventDescription}</p>
                    <p>Prix: ${ticketPrice} €</p>
                    <p>Quantité: ${ticketQuantity}</p>
                </div>
            `;
            eventsDisplay.appendChild(newEvent);

            // Réinitialiser le formulaire
            eventForm.reset();
        }

        if (eventImage) {
            reader.readAsDataURL(eventImage);
        }
    });
});
