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

            menuList         = [],
            headIconList     = [],
            menuItemsList    = [];

        // parameter is name of menu that need to show
        function showMenu(menu) {
            menuList[menu].addClass(classes.visible);
            activeMenu = menu;
            console.log('Active menu: ' + activeMenu);
        }

        function hideMenu() {
            if ( checkActiveMenu() ) {
                menuList[activeMenu].removeClass(classes.visible);
            }
        }

        function checkActiveMenu() {
            if ( typeof(activeMenu) !== 'undefined' ) {
                return true;
            } else {
                return false;
            }
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

        // parameter is name of menu that will be showed
        function changeHeadIcon(menu) {
            if ( checkActiveMenu() ) {
                    headIconList[activeMenu].removeClass(classes.visible);
            }

            headIconList[menu].addClass(classes.visible);
        }

        // parameters is name of active menu and index of item that was clicked
        function showMenuItemInfo(menu, itemIndex) {
            var selectedMenuItem = menuItemsList[menu][itemIndex];

            console.log('Selected item: ' + menu + '[' + itemIndex + ']');

            if ( checkActiveMenu() ) {
                $(menuItemsList[activeMenu]).removeClass(classes.active);
            }

            $(selectedMenuItem).addClass(classes.active);

            infoBlockName.html(selectedMenuItem.infoName);
            infoBlockText.html(selectedMenuItem.infoText);

            if ( !app.hasClass(classes.infoOpen) ) {
                showInfoBlock();
            }
        }

        // add each head icon as jQuery object to associative array
        headIcon.each(function() {
            var el     = $(this),
                elName = el.data('menu');

            headIconList[elName] = el;
        });

        // open menu
        category.each(function() {
            var el         = $(this),
                menuToOpen = el.data('menu');

            el.on('click', function() {
                category.removeClass(classes.active);
                el.addClass(classes.active);

                if ( !menuContainer.hasClass(classes.visible) ) {
                    showMenuContainer();
                }

                hideMenu();

                setTimeout(function() {
                    changeHeadIcon(menuToOpen);
                    showMenu(menuToOpen);
                }, 300);
            });
        });

        // select menu item
        menu.each(function() {
            var el     = $(this),
                elName = el.data('menu'),
                menuItems = el.find(menuItemSelector);

            // add each menu as jQuery object to associative array
            menuList[elName] = el;
            // add each menu item as jQuery object to associative array
            menuItemsList[elName] = menuItems;


            menuItems.each(function(index) {
                var menuItem = $(this);

                var prop = {
                    infoName : menuItem.find('.menu-item__name').html(),
                    infoText : menuItem.find('.menu-item__about').text()
                };

                // add additional property with data for information block to each menu item in array
                $.extend(true, menuItemsList[elName][index], prop);

                menuItem.on('click', function() {
                    showMenuItemInfo(elName, index);
                });
            });
        });

        closeBtn.on('click', function() {
            hideMenuContainer();
            hideInfoBlock();
            setTimeout(function() {
                menuItemsList[activeMenu].removeClass(classes.active);
            }, 300);
        });

    })();

});