head.ready(function() {

    (function() {
        var app              = $('.out'),
            category         = $('.category'),
            menuContainer    = $('.menu-container'),
            closeBtn         = menuContainer.find('.menu-container__close'),
            menu             = $('.menu'),
            menuItemSelector = '.menu-item',
            headIcon         = $('.head'),
            infoBlock        = $('.info'),
            infoBlockName    = infoBlock.find('.info__name'),
            infoBlockText    = infoBlock.find('.info__text'),
            photo            = $('.photo'),
            overlay          = $('.overlay'),
            classes = {
                visible  : 'is-visible',
                active   : 'is-active',
                menuOpen : 'menu-is-open',
                infoOpen : 'info-is-open'
            },

            activeMenu,
            menuItems,
            menuList         = [],
            headIconList     = [],
            menuItemsList    = [];

        function showMenu(menu) {
            menu.addClass(classes.visible);
            // lastOpenedMenu = menu;
            activeMenu = menu;
        }

        function hideMenu(menu) {
            menu.removeClass(classes.visible);
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
            menuContainer.css({
                '-webkit-transform-origin' : '100% ' + originY + '%',
                        'transform-origin' : '100% ' + originY + '%'
            });
        }

        function changeHeadIcon(menu) {
            headIcon.removeClass(classes.visible);
            headIconList[menu].addClass(classes.visible);
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

        closeBtn.on('click', function() {
            hideMenuContainer();
            hideInfoBlock();
            setTimeout(function() {
                menuItems.removeClass(classes.active);
            }, 300);
        });

        headIcon.each(function() {
            var el     = $(this),
                elName = el.data('menu');

            headIconList[elName] = el;
        });

        console.log(headIconList);

        // open menu
        category.each(function() {
            var el         = $(this),
                targetMenu = el.data('menu');

            el.on('click', function() {
                category.removeClass(classes.active);
                el.addClass(classes.active);

                if ( !menuContainer.hasClass(classes.visible) ) {
                    showMenuContainer();
                }

                if ( activeMenu ) {
                    hideMenu(activeMenu);
                }
                setTimeout(function() {
                    showMenu(menuList[targetMenu]);
                    // menuFunctionality();
                    changeHeadIcon(targetMenu);
                }, 200);
                // calculateOrigin(el);
            });
        });

        // select menu item
        menu.each(function() {
            var el     = $(this),
                elName = el.data('menu');
                menuItems = el.find(menuItemSelector);

            menuList[elName] = el;

            menuItemsList[elName] = menuItems;

            menuItems.each(function(index) {
                var menuItem = $(this);
                var prop = {
                    infoName : menuItem.find('.menu-item__name').html(),
                    infoText : menuItem.find('.menu-item__about').text()
                };

                $.extend(true, menuItemsList[elName][index], prop);
                // $.extend(true, menuItemsList, object1);


                // menuItemsList[elName] = menuItem;

                // console.log(typeof(menuItem));
                // console.log(prop);

                $(this).on('click', function() {
                    console.log(menuItemsList[elName][index]);
                });
            });
        });
        console.log(menuItemsList);


    })();

});