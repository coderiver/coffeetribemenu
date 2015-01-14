head.ready(function() {

  if ( $('html').hasClass('touch') ) {
    // $('.menu-item').on('touchstart', function() {
    //   $('.menu-item').removeClass('is-active');
    //   $(this).addClass('is-active');
    // });
    $('.category').on('touchstart', function() {
      $('.category').removeClass('is-active');
      $(this).addClass('is-active');
      $('.menu-container').addClass('is-visible');
      $('.out').addClass('menu-is-open');
    });

  } else {

    $('.category').on('click', function() {
      $('.category').removeClass('is-active');
      $(this).addClass('is-active');
      $('.menu-container').addClass('is-visible');
      $('.out').addClass('menu-is-open');
    });
  }

  $('.menu-item').on('click', function() {
    $('.menu-item').removeClass('is-active');
    $(this).addClass('is-active');
    $('.overlay').addClass('is-visible');
    $('.photo').addClass('is-visible');
    $('.info').addClass('is-visible');
  });

  $('.js-hide-menu').on('click', function() {
    $('.overlay').removeClass('is-visible');
    $('.photo').removeClass('is-visible');
    $('.info').removeClass('is-visible');
    $('.menu-container').removeClass('is-visible');
    $('.out').removeClass('menu-is-open');
    $('.category').removeClass('is-active');
  });

});