

$(document).ready(function() {
//sizing code


$('.greeting').css('paddingTop', $(window).height()/2-90);
$('.home-container').height($(window).height());
$('.triangle').css({'borderTopWidth': 100 +'px', 'borderLeftWidth':$(window).width()/2 + 'px', 'borderBottomWidth': 0, 'borderRightWidth': $(window).width()/2 + 'px'});
  //set the home container the same size as the window.
$(window).resize(function(){
  $('.greeting').css('paddingTop', $(window).height()/2-90);
  $('.home-container').height($(window).height());
  $('.triangle').css({'borderTopWidth': 100 +'px', 'borderLeftWidth':$(window).width()/2 + 'px', 'borderBottomWidth': 0, 'borderRightWidth': $(window).width()/2 + 'px'});
});




//scrolling code

  $(window).scroll(function () {

    if ($(window).scrollTop() > 750) {
      $('#nav_bar').addClass('navbar-fixed-top');
    }

    if ($(window).scrollTop() < 751) {
      $('#nav_bar').removeClass('navbar-fixed-top');
    }


  //code to control the changing of the navigation state.


  var windscroll = $(window).scrollTop();
  var fromBottom = $(document).height() - ($(window).scrollTop() + $(window).height());
  if (fromBottom == 0) {     // <-- scrolled to the bottom
      $('nav a.active').removeClass('active');
      $('nav a:last').addClass('active');
  } else if (windscroll > 60) {
      $('.container > div').each(function (i) {
          if ($(this).position().top <= windscroll + 60 ) {
              $('nav a.active').removeClass('active');
              $('nav a').eq(i).addClass('active');
          }
      });
  } else {
      $('nav a.active').removeClass('active');
      $('nav a:first').addClass('active');
  }
  });






  // Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
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
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          };
        });
      }
    }
  });
  var modals=[$('#you-pick-modal'),$('#narwhal-modal')];



var displayModal=function(index,modal){
  console.log(index,modal);
  $('.learn-button')[index].onclick=function(){
    modal.css('display','block');
  }
  $('.close')[index].onclick=function(){
    modal.css('display','none');
  };
}
  var btns=$('.learn-button');
    btns.each((i,btn)=>{
      btn.click((i)=>{
        console.log("clicked something");
      });
    });

modals.forEach((modal,i)=>{
  displayModal(i,modal);
});



// contact form logic
  $('#name').on('focus',()=>{
    $('.name-label').addClass('focused');
  });
  $('#name').focusout(()=>{
    if($('#name').val() == ''){
      $('.name-label').removeClass('focused');
    }
  });
  $('#email').on('focus',()=>{
    $('.email-label').addClass('focused');
  });
  $('#email').focusout(()=>{
    if($('#email').val() == ''){
      $('.email-label').removeClass('focused');
    }
  });
  $('#message').on('focus',()=>{
    $('.message-label').addClass('focused');
  });
  $('#message').focusout(()=>{
    if($('#message').val() == ''){
      $('.message-label').removeClass('focused');
    }
  });

});
