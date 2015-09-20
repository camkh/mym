// JavaScript Document
//<![CDATA[

                function thumbWidth(e, t, n) {
                    $(e).each(function() {
                        $(this).attr({
                            src: $(this).attr("src").replace("/s" + t + "-c/", "/s" + n + "-c/"),
                            width: n,
                            height: n
                        })
                    })
                }
                document.write(n);
                var homepage = "http://" + window.location.hostname + "";
                textloading = "loading", textloadingSroll = "load more post",
                        thistime = new Date;
                loaderImages = "http://4.bp.blogspot.com/-ESDejuwiky4/UYQ36o3D6nI/AAAAAAAAItQ/DPvdh6q_eew/s000/load.gif";
                $(function() {
                    var e = $(document),
                            t = $(window),
                            n = $("#load-wrap"),
                            r = $("body"),
                            i = $("#blog-pager"),
                            s = $(".icon-sidebar-close"),
                            o = $(".menu > li > ul"),
                            u = $(".menu > li > a"),
                            a = $(".icon-sidebar"),
                            f = $("#hidde-left-menu"),
                            l = $("#wrapper"),
                            c = $("a.icon-search"),
                            h = $("#search-box"),
                            p = $(".search-main"),
                            d = $("a.close"),
                            v = $(".tombol-komentar"),
                            m = $("#comments.comments,.comment-form"),
                            g = $("li.tb-1,li.tb-2"),
                            y = $("#sidebar-wrapper .widget h2"),
                            b = $("#sidebar-wrapper .widget .widget-content"),
                            w = $("#sidebar-wrapper .widget .widget-content:first,#sidebar-wrapper .widget-content.cloud-label-widget-content,.widget-content.popular-posts"),
                            E = $("#tabs li"),
                            S = $(".tab_content"),
                            x = $(".banner div"),
                            T = $(".banner"),
                            N = $(".thumbz-home"),
                            C = $(".no-thumb"),
                            k = $("#tab1"),
                            L = $("#tab3,#tab2"),
                            A = $("#container"),
                            O = $("#cbp-vimenu .active"),
                            M = $('#cbp-vimenu li a.show[href="#"]'),
                            _ = $("#overlay"),
                            D = $(".posting a:has(img)"),
                            P = $(".group1");
                    r.prepend('<div id="load-wrap"><div class="load-main"><img src="' + loaderImages + '"/><div><em>' + textloading + " <br/>" + this.title + "</em></div></div></div>");
                    $("#load-wrap").delay("1000").fadeOut("slow");
                    s.hide(0);
                    thumbWidth("#top-widget .widget .popular-posts .item-thumbnail img ", "72", "250"), thumbWidth(" .popular-posts .item-thumbnail img ", "72", "150"), thumbWidth(".thumb-home-img", "72", "215");
                    o.hide();
                    u.click(function(e) {
                        e.preventDefault();
                        if (!$(this).hasClass("active")) {
                            u.removeClass("active");
                            o.filter(":visible").slideUp("normal");
                            $(this).addClass("active").next().stop(true, true).slideDown("normal")
                        } else {
                            $(this).removeClass("active");
                            $(this).next().stop(true, true).slideUp("normal")
                        }
                    });
                    D.addClass("group1");
                    $(".group1").colorbox({
                        rel: "group1"
                    });
                    a.click(function() {
                        f.animate({
                            left: "0px"
                        }, "fast");
                        l.animate({
                            left: "260px"
                        }, "fast");
                        $(this).fadeOut(0);
                        s.fadeIn(0)
                    });
                    s.click(function() {
                        f.animate({
                            left: "-=260px"
                        }, "fast");
                        l.animate({
                            left: "0"
                        }, "fast");
                        $(this).fadeOut(0);
                        a.fadeIn(0)
                    });
                    O.removeClass("active");
                    M.click(function(e) {
                        $("#cbp-vimenu li ul:visible").hide();
                        _.fadeIn("fast");
                        h.fadeOut("slow");
                        $(this).next().show("fast");
                        e.stopPropagation();
                        return false
                    });
                    e.click(function() {
                        $("#cbp-vimenu li ul:visible").fadeOut("slow"), _.fadeOut("slow")
                    });
                    c.click(function() {
                        _.fadeOut("fast");
                        h.fadeIn("slow");
                        p.fadeIn("slow")
                    });
                    d.click(function() {
                        $(this).parent().fadeOut("fast", function() {
                            h.fadeOut("slow")
                        })
                    });
                    v.click(function() {
                        m.slideToggle("slow");
                        k.fadeIn("slow");
                        L.fadeOut();
                        $(this).toggleClass("active");
                        return false
                    });
                    g.click(function() {
                        m.fadeOut("slow")
                    });
                    y.css("cursor", "pointer").fadeOut();
                    if ($) {
                        y.slideDown()
                    }
                    b.fadeOut();
                    if ($) {
                        w.delay("slow").slideDown()
                    }
                    y.click(function(e) {
                        e.preventDefault();
                        $(this).closest("#sidebar-wrapper .widget").find("#sidebar-wrapper .widget-content").slideToggle()
                    });
                    y.click(function(e) {
                        e.preventDefault();
                        $(this).closest("#sidebar-wrapper .widget").find(".widget-content").not(":animated").slideToggle()
                    });
                    E.click(function() {
                        E.removeClass("active");
                        $(this).addClass("active");
                        S.hide();
                        var e = $(this).find("a").attr("href");
                        $(e).fadeIn();
                        return false
                    });
                    x.css("opacity", .4);
                    T.hover(function() {
                        var e = $(this);
                        e.find("div").stop().animate({
                            width: 200,
                            height: 200
                        }, "slow", function() {
                            e.find("p").fadeIn("fast")
                        })
                    }, function() {
                        var e = $(this);
                        e.find("p").stop(true, true).hide();
                        e.find("div").stop().animate({
                            width: 60,
                            height: 60
                        }, "fast")
                    }).click(function() {
                        window.open($(this).find("a").attr("href"))
                    });
                    A.masonry({
                        itemSelector: ".box-home",
                        columnWidth: 225,
                        gutterWidth: 12,
                        isFitWidth: true,
                        isAnimated: true
                    });
                    t.on("resize", function() {
                        A.masonry("reload")
                    });
                    N.hover(function() {
                        var e = $(this);
                        e.find("div").animate({}, "slow", function() {
                            e.find(".thumb-bottom-1").delay("1000").animate({
                                top: "0"
                            })
                        })
                    }, function() {
                        var e = $(this);
                        e.find(".thumb-bottom-1").animate({
                            top: "-300px"
                        })
                    });
                    C.hover(function() {
                        var e = $(this);
                        e.find("div").animate({}, "slow", function() {
                            e.find(".thumb-bottom-1").delay("1000").animate({
                                bottom: "0"
                            })
                        })
                    }, function() {
                        var e = $(this);
                        e.find(".thumb-bottom-1").animate({
                            bottom: "-300px"
                        })
                    })


                })
                //]]>