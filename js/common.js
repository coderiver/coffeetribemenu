head.ready(function() {

  $('.menu-item').on('click', function() {
    $('.menu-item').removeClass('is-active');
    $(this).addClass('is-active');
  });

});