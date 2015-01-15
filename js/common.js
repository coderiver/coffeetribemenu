head.ready(function() {

    // if ( $('html').hasClass('touch') ) {
    //     // $('.menu-item').on('touchstart', function() {
    //     //   $('.menu-item').removeClass('is-active');
    //     //   $(this).addClass('is-active');
    //     // });
    //     $('.category').on('touchstart', function() {
    //         $('.category').removeClass('is-active');
    //         $(this).addClass('is-active');
    //         $('.menu-container').addClass('is-visible');
    //         $('.out').addClass('menu-is-open');
    //     });

    // } else {

    //     $('.category').on('click', function() {
    //         $('.category').removeClass('is-active');
    //         $(this).addClass('is-active');
    //         $('.menu-container').addClass('is-visible');
    //         $('.out').addClass('menu-is-open');
    //     });
    // }

    // $('.menu-item').on('click', function() {
    //     $('.menu-item').removeClass('is-active');
    //     $(this).addClass('is-active');
    //     $('.overlay').addClass('is-visible');
    //     $('.photo').addClass('is-visible');
    //     $('.info').addClass('is-visible');
    // });

    // $('.js-hide-menu').on('click', function() {
    //     $('.overlay').removeClass('is-visible');
    //     $('.photo').removeClass('is-visible');
    //     $('.info').removeClass('is-visible');
    //     $('.menu-container').removeClass('is-visible');
    //     $('.out').removeClass('menu-is-open');
    //     $('.category').removeClass('is-active');
    // });

    (function() {
        var root          = $('.out'),
            category      = $('.category'),
            menuContainer = $('.menu-container'),
            closeBtn      = menuContainer.find('.menu-container__close'),
            menu          = $('.menu'),
            menuList      = [],
            info          = {
                main: $('.info'),
                name: $('.info__name'),
                text: $('.info__text')
            },
            classes = {
                visible  : 'is-visible',
                active   : 'is-active',
                menuOpen : 'menu-is-open'
            },
            photo         = $('.photo'),
            overlay       = $('.overlay'),
            lastOpenedMenu;

        closeBtn.on('click', function() {
            hideMenuContainer();
        });

        menu.each(function(index) {
            var el        = $(this),
                elName    = el.data('menu'),
                menuItems = el.find('.menu-item');

            menuList[elName] = el;

            menuItems.on('click', function() {
                menuItems.removeClass(classes.active);
                $(this).addClass(classes.active);
            });
        });

        function showMenu(el) {
            el.addClass(classes.visible);
            lastOpenedMenu = el;
        }

        function hideMenu(el) {
            el.removeClass(classes.visible);
        }

        function showMenuContainer() {
            menuContainer.addClass(classes.visible);
            root.addClass(classes.menuOpen);
        }

        function hideMenuContainer() {
            menuContainer.removeClass(classes.visible);
            root.removeClass(classes.menuOpen);
            category.removeClass(classes.active);
        }

        function showInfo(text, photo) {
            overlay.addClass(classes.visible);
            photo.addClass(classes.visible);
            info.addClass(classes.visible);
        }

        function hideInfo() {
            overlay.removeClass(classes.visible);
            photo.removeClass(classes.visible);
            info.removeClass(classes.visible);
        }

        // function showInfo(activeMenu) {
        //     $(activeMenu).find('.menu__items').
        // }

        category.each(function() {
            var el         = $(this);
            var targetMenu = el.data('menu');
            el.on('click', function(event) {
                event.preventDefault();
                category.removeClass(classes.active);
                el.addClass(classes.active);
                if (!menuContainer.hasClass(classes.visible)) {
                    showMenuContainer();
                }
                if (lastOpenedMenu) {
                    hideMenu(lastOpenedMenu);
                }
                showMenu(menuList[targetMenu]);
            });
        });

    })();

});