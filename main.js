$(document).ready(function() {
  //sizing code
  $('.greeting').css('paddingTop', $(window).height() / 2 - 90);
  $('.home-container').height($(window).height());
  $('.triangle').css({
    'borderTopWidth': 100 + 'px',
    'borderLeftWidth': $(window).width() / 2 + 'px',
    'borderBottomWidth': 0,
    'borderRightWidth': $(window).width() / 2 + 'px'
  });
  //set the home container the same size as the window.
  $(window).resize(function() {
    $('.greeting').css('paddingTop', $(window).height() / 2 - 90);
    $('.home-container').height($(window).height());
    $('.triangle').css({
      'borderTopWidth': 100 + 'px',
      'borderLeftWidth': $(window).width() / 2 + 'px',
      'borderBottomWidth': 0,
      'borderRightWidth': $(window).width() / 2 + 'px'
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
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
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


    //code to control the changing of the navigation state.


    var windscroll = $(window).scrollTop();
    var fromBottom = $(document).height() - ($(window).scrollTop() + $(window).height());
    if (fromBottom == 0) { // <-- scrolled to the bottom
      $('nav a.active').removeClass('active');
      $('nav a:last').addClass('active');
    } else if (windscroll > 60) {
      $('.container > div').each(function(i) {
        if ($(this).position().top <= windscroll + 60) {
          $('nav a.active').removeClass('active');
          $('nav a').eq(i).addClass('active');
        }
      });
    } else {
      $('nav a.active').removeClass('active');
      $('nav a:first').addClass('active');
    }
  });

  navAnimate = () => {
    $('#nav_bar').toggleClass('navbar-fixed-top-open');
    $('.nav_links').toggleClass('nav_link_open');
    $('.hamburger-top').toggleClass('top-open');
    $('.hamburger-middle').toggleClass('middle-open');
    $('.hamburger-bottom').toggleClass('bottom-open');
  }

  $('.hamburger').click(() => {
    navAnimate();
  });
  $('.nav_links').click(() => {
    navAnimate();
  });
  $('.right-arrow').click(() => {

  });
  var slideIndex = 1;
  showDivs(slideIndex);

  var plusDivs = function(n) {
    showDivs(slideIndex += n);
  }

  function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) {
      slideIndex = 1
    }
    if (n < 1) {
      slideIndex = x.length
    };
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
  }

  $('.left-arrow').click(() => {
    plusDivs(-1);
  });
  $('.right-arrow').click(() => {
    plusDivs(1);
  });
  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            };
          });
        }
      }
    });
  var modals = [$('#you-pick-modal'), $('#narwhal-modal'), $('#bestest-modal')];



  var displayModal = function(index, modal) {
    console.log(index, modal);
    $('.learn-button')[index].onclick = function() {
      modal.css({
        'transform': 'scale(1)',
        'opacity': 1
      });
    }
    $('.close')[index].onclick = function() {
      modal.css({
        'transform': 'scale(0)',
        'opacity': 1
      });
    };
  }
  var btns = $('.learn-button');
  btns.each((i, btn) => {
    btn.click((i) => {
      console.log("clicked something");
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