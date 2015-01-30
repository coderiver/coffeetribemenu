head.ready(function() {

    // $('a').on('click', function(e) {
    //     e.preventDefault();
    //     window.location = $(this).attr('href');
    // });

    $(window).load(function() {
        $('.out').addClass('is-loaded');
        $.fixLinks();
    });

    // (function(){
    //     var menuBtn = $('.menu-btn');
    //     if (menuBtn) {
    //         menuBtn.on('touchstart', function(event) {
    //             event.stopPropagation();
    //             $(this).toggleClass('is-clicked');
    //         });
    //         $(document).on('touchstart', function() {
    //             menuBtn.removeClass('is-clicked');
    //         });
    //     }
    // })();

    if ( $('.app').length ) {
        (function() {

            var app              = $('.app'),
                category         = $('.category'),
                menuContainer    = $('.menu-container'),
                closeBtn         = menuContainer.find('.menu-container__close'),
                arrow            = $('.category-arrow'),
                menu             = $('.menu'),
                menuItemSelector = '.menu-item',
                headIcon         = $('.head'),
                infoBlock        = $('.info'),
                infoBlockName    = infoBlock.find('.info__name'),
                infoBlockText    = infoBlock.find('.info__text'),
                photoBlock       = $('.photo-container'),
                defaultPhoto     = 'img/photos/default.jpg',
                overlay          = $('.overlay'),
                classes = {
                    visible  : 'is-visible',
                    active   : 'is-active',
                    menuOpen : 'menu-is-open',
                    infoOpen : 'info-is-open'
                },

                menuList         = [],
                headIconList     = [],
                menuItemsList    = [],
                photosList       = [],

                activeMenu,
                activeMenuItemIndex;

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
                category.removeClass(classes.active);
                headIconList[activeMenu].removeClass(classes.visible);
                app.removeClass(classes.menuOpen);
            }

            function showInfoBlock() {
                overlay.addClass(classes.visible);
                photoBlock.addClass(classes.visible);
                infoBlock.addClass(classes.visible);
                app.addClass(classes.infoOpen);
            }

            function hideInfoBlock() {
                clearInfoBlock();
                infoBlock.removeClass(classes.visible);
                photoBlock.removeClass(classes.visible);
                overlay.removeClass(classes.visible);
                app.removeClass(classes.infoOpen);
            }

            // parameter is name of menu that will be showed
            function changeHeadIcon(menu) {
                if ( checkActiveMenu() ) {
                        headIconList[activeMenu].removeClass(classes.visible);
                }

                headIconList[menu].addClass(classes.visible);
            }

            // parameter is active category
            function changeArrowPosition(category) {
                if ( app.hasClass(classes.menuOpen) ) {
                    var topPos = (category.offset().top + category.height() / 2).toFixed(0);
                    arrow.css('top', topPos + 'px');
                } else {
                    arrow.css('top', '');
                }
            }

            function clearInfoBlock() {
                if ( typeof(activeMenuItemIndex) !== 'undefined' ) {
                    menuItemsList[activeMenu][activeMenuItemIndex].removeClass(classes.active);
                    photosList[activeMenu][activeMenuItemIndex].removeClass(classes.visible);
                    infoBlockName.html('');
                    infoBlockText.html('');
                    activeMenuItemIndex = undefined;
                }
            }

            // parameters is name of active menu and index of item that was clicked
            function showMenuItemInfo(menu, itemIndex) {
                var selectedMenuItem = menuItemsList[menu][itemIndex];

                console.log('Selected item: ' + menu + '[' + itemIndex + ']');

                // clear info block from previous information
                clearInfoBlock();

                // add active class to selected menu item
                menuItemsList[menu][itemIndex].addClass(classes.active);
                // show photo which corresponds to the selected menu item
                photosList[menu][itemIndex].addClass(classes.visible);
                // write text about menu item into info block
                infoBlockName.html(selectedMenuItem.infoName);
                infoBlockText.text(selectedMenuItem.infoText);

                if ( !app.hasClass(classes.infoOpen) ) {
                    showInfoBlock();
                }

                activeMenuItemIndex = itemIndex;
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

                el.on('click', function(event) {
                    event.preventDefault();
                    category.removeClass(classes.active);
                    el.addClass(classes.active);

                    if ( !menuContainer.hasClass(classes.visible) ) {
                        showMenuContainer();
                    }
                    // hide previous menu and info block
                    hideMenu();
                    hideInfoBlock();

                    setTimeout(function() {
                        changeHeadIcon(menuToOpen);
                        showMenu(menuToOpen);
                        changeArrowPosition(el);
                    }, 300);
                });
            });

            // select menu item
            menu.each(function() {
                var el        = $(this),
                    elName    = el.data('menu'),
                    menuItems = el.find(menuItemSelector);

                // create associative arrays with jQuery object
                menuList[elName] = el;
                menuItemsList[elName] = [];
                photosList[elName] = [];

                menuItems.each(function(index) {
                    var menuItem  = $(this),
                        itemPhoto = $('<li class="photo" data-menu="' + elName + '" data-item="' + index + '"></li>'),
                        itemPhotoSrc = menuItem.find('.menu-item__photo').attr('src');

                    // add photo from each menus item to global photo-container
                    itemPhoto.appendTo(photoBlock);

                    if ( itemPhotoSrc ) {
                        itemPhoto.css('background-image', 'url(' + itemPhotoSrc + ')');
                    } else {
                        itemPhoto.css('background-image', 'url(' + defaultPhoto + ')');
                    }

                    var prop = {
                        infoName  : menuItem.find('.menu-item__name').html(),
                        infoText  : menuItem.find('.menu-item__about').text()
                    };

                    // add additional property with data for information block to each menu item in array
                    $.extend(true, menuItem, prop);

                    // add photo to array as jQuery object
                    menuItemsList[elName][index] = menuItem;

                    // add photo to array as jQuery object
                    photosList[elName][index] = itemPhoto;

                    menuItem.on('click', function(event) {
                        event.preventDefault();
                        if ( !menuItem.hasClass(classes.active) ) {
                            showMenuItemInfo(elName, index);
                        }
                    });
                });
            });

            closeBtn.on('touchend click', function(event) {
                event.preventDefault();
                hideMenuContainer();
                hideMenu();
                hideInfoBlock();
                changeArrowPosition();
            });

            console.log(menuList);
            console.log(menuItemsList);
            console.log(photosList);

        })();

    }
});