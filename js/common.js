head.ready(function() {

    (function() {
        var app              = $('.out'),
            category         = $('.category'),
            menuContainer    = $('.menu-container'),
            closeBtn         = menuContainer.find('.menu-container__close'),
            menu             = $('.menu'),
            menuItemSelector = '.menu-item',
            menuList         = [],
            infoBlock        = $('.info'),
            infoBlockName    = infoBlock.find('.info__name'),
            infoBlockText    = infoBlock.find('.info__text'),
            photo            = $('.photo'),
            overlay          = $('.overlay'),
            activeMenu,
            menuItems,
            classes = {
                visible  : 'is-visible',
                active   : 'is-active',
                menuOpen : 'menu-is-open',
                infoOpen : 'info-is-open'
            };

        closeBtn.on('click', function() {
            hideMenuContainer();
            hideInfoBlock();
            setTimeout(function() {
                menuItems.removeClass(classes.active);
            }, 300);
        });

        menu.each(function(index) {
            var el        = $(this),
                elName    = el.data('menu'),
                menuItems = el.find(menuItemSelector);

            menuList[elName] = el;
        });

        function showMenu(el) {
            el.addClass(classes.visible);
            lastOpenedMenu = el;
            activeMenu = el;
        }

        function hideMenu(el) {
            el.removeClass(classes.visible);
        }

        function showMenuContainer() {
            menuContainer.addClass(classes.visible);
            app.addClass(classes.menuOpen);
        }

        function hideMenuContainer() {
            menuContainer.removeClass(classes.visible);
            app.removeClass(classes.menuOpen);
            category.removeClass(classes.active);
        }

        function showInfoBlock() {
            overlay.addClass(classes.visible);
            photo.addClass(classes.visible);
            infoBlock.addClass(classes.visible);
            app.addClass(classes.infoOpen);
        }

        function hideInfoBlock() {
            overlay.removeClass(classes.visible);
            photo.removeClass(classes.visible);
            infoBlock.removeClass(classes.visible);
            app.removeClass(classes.infoOpen);
        }

        function calculateOrigin(category) {
            var c = category,
                originY = ((category.offset().top + category.height() / 2) / $(window).height() * 100).toFixed(0);
                console.log(originY);
            menuContainer.css({
                '-webkit-transform-origin' : '100% ' + originY + '%',
                        'transform-origin' : '100% ' + originY + '%'
            });
        }

        function menuFunctionality() {
            menuItems = activeMenu.find(menuItemSelector);
            var menuItemInfo = {};

            menuItems.on('click', function() {
                menuItems.removeClass(classes.active);
                $(this).addClass(classes.active);
                // get info about current menu item
                menuItemInfo.name = $(this).find('.menu-item__name').html();
                menuItemInfo.text = $(this).find('.menu-item__about').text();
                // write info about current menu item to info block
                infoBlockName.html(menuItemInfo.name);
                infoBlockText.html(menuItemInfo.text);

                if ( !app.hasClass(classes.infoOpen) ) {
                    showInfoBlock();
                }
            });
        }

        category.each(function() {
            var el         = $(this);
            var targetMenu = el.data('menu');

            el.on('click', function(event) {
                event.preventDefault();
                category.removeClass(classes.active);
                el.addClass(classes.active);
                if ( !menuContainer.hasClass(classes.visible) ) {
                    showMenuContainer();
                }
                if ( activeMenu ) {
                    hideMenu(activeMenu);
                }
                showMenu(menuList[targetMenu]);
                menuFunctionality();
                calculateOrigin(el);
            });
        });

    })();

});