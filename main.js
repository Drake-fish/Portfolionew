$(document).ready(function() {
	//sizing code
	$('.greeting').css('paddingTop', $(window).height() / 2 - 90);
	$('.home-container').height($(window).height());
	$('.triangle').css({
		borderTopWidth: 100 + 'px',
		borderLeftWidth: $(window).width() / 2 + 'px',
		borderBottomWidth: 0,
		borderRightWidth: $(window).width() / 2 + 'px'
	});
	//set the home container the same size as the window.
	$(window).resize(function() {
		$('.greeting').css('paddingTop', $(window).height() / 2 - 90);
		$('.home-container').height($(window).height());
		$('.triangle').css({
			borderTopWidth: 100 + 'px',
			borderLeftWidth: $(window).width() / 2 + 'px',
			borderBottomWidth: 0,
			borderRightWidth: $(window).width() / 2 + 'px'
		});
	});

	//typewriting code
	var TxtType = function(el, toRotate, period) {
		this.toRotate = toRotate;
		this.el = el;
		this.loopNum = 0;
		this.period = parseInt(period, 10) || 2000;
		this.txt = '';
		this.tick();
		this.isDeleting = false;
	};

	TxtType.prototype.tick = function() {
		var i = this.loopNum % this.toRotate.length;
		var fullTxt = this.toRotate[i];

		if (this.isDeleting) {
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}

		this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

		var that = this;
		var delta = 200 - Math.random() * 100;

		if (this.isDeleting) {
			delta /= 2;
		}

		if (!this.isDeleting && this.txt === fullTxt) {
			delta = this.period;
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === '') {
			this.isDeleting = false;
			this.loopNum++;
			delta = 500;
		}

		setTimeout(function() {
			that.tick();
		}, delta);
	};

	window.onload = function() {
		var elements = document.getElementsByClassName('typewrite');
		for (var i = 0; i < elements.length; i++) {
			var toRotate = elements[i].getAttribute('data-type');
			var period = elements[i].getAttribute('data-period');
			if (toRotate) {
				new TxtType(elements[i], JSON.parse(toRotate), period);
			}
		}
		// INJECT CSS
		var css = document.createElement('style');
		css.type = 'text/css';
		css.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid #fff}';
		document.body.appendChild(css);
	};

	//scrolling code
	$(window).scroll(function() {
		if ($(window).scrollTop() > 750) {
			$('#nav_bar').addClass('navbar-fixed-top');
		}

		if ($(window).scrollTop() < 751) {
			$('#nav_bar').removeClass('navbar-fixed-top');
		}
	});

	navAnimate = () => {
		$('#nav_bar').toggleClass('navbar-fixed-top-open');
		$('.nav_links').toggleClass('nav_link_open');
		$('.hamburger-top').toggleClass('top-open');
		$('.hamburger-middle').toggleClass('middle-open');
		$('.hamburger-bottom').toggleClass('bottom-open');
	};

	$('.hamburger').click(() => {
		navAnimate();
	});

	$('.nav_links').click(() => {
		if ($(window).width() < 900) {
			navAnimate();
		}
	});

	var slideIndex = 1;
	showDivs(slideIndex);

	var plusDivs = function(n) {
		showDivs((slideIndex += n));
	};

	function showDivs(n) {
		var i;
		var x = document.getElementsByClassName('mySlides');
		if (n > x.length) {
			slideIndex = 1;
		}
		if (n < 1) {
			slideIndex = x.length;
		}
		for (i = 0; i < x.length; i++) {
			x[i].style.display = 'none';
		}
		x[slideIndex - 1].style.display = 'block';
	}

	$('.left-arrow').click(() => {
		plusDivs(-1);
	});
	$('.right-arrow').click(() => {
		plusDivs(1);
	});

	//modal code
	var modals = [
		$('#email-blaster-modal'),
		$('#you-pick-modal'),
		$('#narwhal-modal'),
		$('#bestest-modal')
	];

	var displayModal = function(index, modal) {
		console.log(index, modal);
		$('.learn-button')[index].onclick = function() {
			modal.css({
				transform: 'scale(1)',
				opacity: 1
			});
		};
		$('.close')[index].onclick = function() {
			modal.css({
				transform: 'scale(0)',
				opacity: 1
			});
		};
	};
	var btns = $('.learn-button');
	btns.each((i, btn) => {
		btn.click(i => {
			console.log('clicked something');
		});
	});

	modals.forEach((modal, i) => {
		displayModal(i, modal);
	});

	// contact form logic
	$('#name').on('focus', () => {
		$('.name-label').addClass('focused');
	});
	$('#name').focusout(() => {
		if ($('#name').val() == '') {
			$('.name-label').removeClass('focused');
		}
	});
	$('#email').on('focus', () => {
		$('.email-label').addClass('focused');
	});
	$('#email').focusout(() => {
		if ($('#email').val() == '') {
			$('.email-label').removeClass('focused');
		}
	});
	$('#message').on('focus', () => {
		$('.message-label').addClass('focused');
	});
	$('#message').focusout(() => {
		if ($('#message').val() == '') {
			$('.message-label').removeClass('focused');
		}
	});
});

$(document).ready(function() {
	$(document).on('scroll', onScroll);

	//smoothscroll
	$('a[href^="#"]').on('click', function(e) {
		e.preventDefault();
		$(document).off('scroll');

		$('a').each(function() {
			$(this).removeClass('active');
		});
		$(this).addClass('active');

		var target = this.hash,
			menu = target;
		$target = $(target);
		$('html, body')
			.stop()
			.animate(
				{
					scrollTop: $target.offset().top + 2
				},
				500,
				'swing',
				function() {
					window.location.hash = target;
					$(document).on('scroll', onScroll);
				}
			);
	});
});

function onScroll(event) {
	var scrollPos = $(document).scrollTop();
	$('#nav_bar a').each(function() {
		var currLink = $(this);
		var refElement = $(currLink.attr('href'));
		if (
			refElement.position().top <= scrollPos &&
			refElement.position().top + refElement.height() > scrollPos
		) {
			$('#nav_bar ul li a').removeClass('active');
			currLink.addClass('active');
		} else {
			currLink.removeClass('active');
		}
	});
}
