$(document).ready(function () {
                $('#myCarousel').oneCarousel({
                    easeIn: 'rotateIn',
                    interval: 5000,
                    pause: 'hover'
                });
                jQuery(function ($) {
                    $(".tweet").tweet({
                        join_text: "auto",
                        username: "wrapbootstrap",
                        avatar_size: 100,
                        count: 2,
                        auto_join_text_default: " we said, ",
                        auto_join_text_ed: " we ",
                        auto_join_text_ing: " we were ",
                        auto_join_text_reply: " we replied ",
                        auto_join_text_url: " we were checking out ",
                        loading_text: "loading tweets..."
                    });
                });
                $('.flickr').jflickrfeed({
                    limit: 6,
                    qstrings: {
                        id: '44802888@N04'
                    },
                    itemTemplate:
                    '<li class="span1">' +
                        '<a href="{{image_b}}"><img src="{{image_s}}" alt="{{title}}" /></a>' +
                    '</li>'
                });
                var $menu_select = $("<select />");
                $("<option />", { "selected": "selected", "value": "", "text": "Site Navigation" }).appendTo($menu_select);
                $menu_select.appendTo(".header .navbar-inner");

                $(".header .navbar-inner ul li a").each(function () {
                    var menu_url = $(this).attr("href");
                    var menu_text = $(this).text();
                    if ($(this).parents("li").length == 2) { menu_text = '- ' + menu_text; }
                    if ($(this).parents("li").length == 3) { menu_text = "-- " + menu_text; }
                    if ($(this).parents("li").length > 3) { menu_text = "--- " + menu_text; }
                    $("<option />", { "value": menu_url, "text": menu_text }).appendTo($menu_select)
                });

                field_id = ".header .navbar-inner select";
                $(field_id).change(function () {
                    value = $(this).attr('value');
                    window.location = value;
                    //go
                });
                // cache container
                var $container = $('.portfolio .thumbnails');
                var $filter = $('.portfolio-filter');
                // initialize isotope
                $container.isotope({
                    // options...
                    filter: '*'
                });
                // filter items when filter link is clicked
                $('#filters a').click(function () {
                    var selector = $(this).attr('data-filter');
                    $container.isotope({ filter: selector });
                    return false;
                });
                // update columnWidth on window resize
                $(window).smartresize(function () {
                    $container.isotope('reLayout');
                });
                // Filter items when filter link is clicked
                $filter.find('a').click(function () {
                    var selector = $(this).attr('data-filter');
                    $filter.find('a').removeClass('selected');
                    $(this).addClass('selected');
                });
                $("a[rel^='prettyPhoto']").prettyPhoto();
            });