head.ready(function() {

  // $(document).on("click", function(){
  //  $(".js-popup").hide();
  // });

  // function scrollFixedElements() {
  //     var scroll_left = $(this).scrollLeft();
  //     $(".fixed-element").css({
  //         left: -scroll_left
  //     });
  // }
  // scrollFixedElements();
  // $(window).scroll(function(){
  //     scrollFixedElements()
  // });

  (function() {
    if ($('.curved-text').length) {
      var str = $('.curved-text').html();
      var curved = '';
      for (var i = 0, len = str.length; i < len; i++) {
        curved += '<span class="char';
        curved += i;
        curved += '">';
        curved += str[i];
        curved += '</span>';
      }
      $('.curved-text').html(curved);
    }
  })();



});