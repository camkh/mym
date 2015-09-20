/** Amazing Carousel - Responsive jQuery Carousel and Image Scroller
 * Copyright 2014 Magic Hills Pty Ltd All Rights Reserved
 * Website: http://amazingcarousel.com
 * Version 3.0
 */
(function ($) {
	$.fn.html5lightbox = function (options) {
		var inst = this;
		inst.options = jQuery.extend({
				freelink : "http://html5box.com/",
				autoplay : true,
				html5player : true,
				responsive : true,
				nativehtml5controls : false,
				shownavigation : false,
				thumbwidth : 90,
				thumbheight : 60,
				thumbgap : 4,
				thumbtopmargin : 12,
				thumbbottommargin : 12,
				thumbborder : 1,
				thumbbordercolor : "transparent",
				thumbhighlightbordercolor : "#fff",
				thumbopacity : 1,
				navbuttonwidth : 32,
				overlaybgcolor : "#000",
				overlayopacity : 0.8,
				bgcolor : "#fff",
				bordersize : 8,
				borderradius : 0,
				bordermargin : 16,
				barautoheight : true,
				barheight : 64,
				loadingwidth : 64,
				loadingheight : 64,
				resizespeed : 400,
				fadespeed : 400,
				jsfolder : "",
				skinsfoldername : "skins",
				loadingimage : "lightbox-loading.gif",
				nextimage : "lightbox-next.png",
				previmage : "lightbox-prev.png",
				closeimage : "lightbox-close.png",
				playvideoimage : "lightbox-playvideo.png",
				titlebgimage : "lightbox-titlebg.png",
				navarrowsprevimage : "lightbox-navprev.png",
				navarrowsnextimage : "lightbox-navnext.png",
				showtitle : true,
				titlestyle : "bottom",
				titleinsidecss : "{color:#fff; font-size:14px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:left;}",
				titlebottomcss : "{color:#333; font-size:14px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:left;}",
				showdescription : false,
				descriptioninsidecss : "{color:#fff; font-size:12px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:left; margin:4px 0px 0px; padding: 0px;}",
				descriptionbottomcss : "{color:#333; font-size:12px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:left; margin:4px 0px 0px; padding: 0px;}",
				errorwidth : 280,
				errorheight : 48,
				errorcss : "{text-align:center; color:#ff0000; font-size:14px; font-family:Arial, sans-serif;}",
				supportesckey : true,
				supportarrowkeys : true,
				version : "3.3",
				stamp : false,
				freemark : "hmtamgli5cboxh.iclolms",
				watermark : "",
				watermarklink : ""
			}, options);
		if (typeof html5lightbox_options != "undefined" && html5lightbox_options)
			jQuery.extend(inst.options, html5lightbox_options);
		if ($("div#html5lightbox_options").length)
			$.each($("div#html5lightbox_options").data(), function (key, value) {
				inst.options[key.toLowerCase()] = value
			});
		inst.options.htmlfolder = window.location.href.substr(0, window.location.href.lastIndexOf("/") + 1);
		inst.options.skinsfolder =
			inst.options.skinsfoldername;
		if (inst.options.skinsfolder.length > 0 && inst.options.skinsfolder[inst.options.skinsfolder.length - 1] != "/")
			inst.options.skinsfolder += "/";
		if (inst.options.skinsfolder.charAt(0) != "/" && inst.options.skinsfolder.substring(0, 5) != "http:" && inst.options.skinsfolder.substring(0, 6) != "https:")
			inst.options.skinsfolder = inst.options.jsfolder + inst.options.skinsfolder;
		var i;
		var l;
		var mark = inst.options.freemark;
		for (i = 1; i <= 5; i++)
			mark = mark.slice(0, i) + mark.slice(i + 1);
		l = mark.length;
		for (i = 0; i < 5; i++)
			mark =
				mark.slice(0, l - 9 + i) + mark.slice(l - 8 + i);
		inst.options.freemark = mark;
		if (inst.options.htmlfolder.indexOf(inst.options.freemark) != -1)
			inst.options.stamp = false;
		inst.options.navheight = 0;
		inst.options.thumbgap += 2 * inst.options.thumbborder;
		inst.options.types = ["IMAGE", "FLASH", "VIDEO", "YOUTUBE", "VIMEO", "PDF", "MP3", "WEB", "FLV"];
		inst.elemArray = new Array;
		inst.options.curElem = -1;
		inst.options.flashInstalled = false;
		try {
			if (new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))
				inst.options.flashInstalled = true
		} catch (e) {
			if (navigator.mimeTypes["application/x-shockwave-flash"])
				inst.options.flashInstalled =
					true
		}
		inst.options.html5VideoSupported = !!document.createElement("video").canPlayType;
		inst.options.isChrome = navigator.userAgent.match(/Chrome/i) != null;
		inst.options.isFirefox = navigator.userAgent.match(/Firefox/i) != null;
		inst.options.isOpera = navigator.userAgent.match(/Opera/i) != null || navigator.userAgent.match(/OPR\//i) != null;
		inst.options.isSafari = navigator.userAgent.match(/Safari/i) != null;
		inst.options.isIE = navigator.userAgent.match(/MSIE/i) != null && !inst.options.isOpera;
		inst.options.isIE9 = navigator.userAgent.match(/MSIE 9/i) !=
			null && !inst.options.isOpera;
		inst.options.isIE8 = navigator.userAgent.match(/MSIE 8/i) != null && !inst.options.isOpera;
		inst.options.isIE7 = navigator.userAgent.match(/MSIE 7/i) != null && !inst.options.isOpera;
		inst.options.isIE6 = navigator.userAgent.match(/MSIE 6/i) != null && !inst.options.isOpera;
		inst.options.isIE678 = inst.options.isIE6 || inst.options.isIE7 || inst.options.isIE8;
		inst.options.isIE6789 = inst.options.isIE6 || inst.options.isIE7 || inst.options.isIE8 || inst.options.isIE9;
		inst.options.isAndroid = navigator.userAgent.match(/Android/i) !=
			null;
		inst.options.isIPad = navigator.userAgent.match(/iPad/i) != null;
		inst.options.isIPhone = navigator.userAgent.match(/iPod/i) != null || navigator.userAgent.match(/iPhone/i) != null;
		inst.options.isIOS = inst.options.isIPad || inst.options.isIPhone;
		inst.options.isMobile = inst.options.isAndroid || inst.options.isIPad || inst.options.isIPhone;
		inst.options.isIOSLess5 = inst.options.isIPad && inst.options.isIPhone && (navigator.userAgent.match(/OS 4/i) != null || navigator.userAgent.match(/OS 3/i) != null);
		inst.options.supportCSSPositionFixed =
			!inst.options.isIE6 && !inst.options.isIOSLess5;
		inst.options.resizeTimeout = -1;
		if (inst.options.isMobile)
			inst.options.autoplay = false;
		inst.init = function () {
			inst.showing = false;
			inst.readData();
			inst.createMarkup();
			inst.supportKeyboard()
		};
		var ELEM_TYPE = 0,
		ELEM_HREF = 1,
		ELEM_TITLE = 2,
		ELEM_GROUP = 3,
		ELEM_WIDTH = 4,
		ELEM_HEIGHT = 5,
		ELEM_HREF_WEBM = 6,
		ELEM_HREF_OGG = 7,
		ELEM_THUMBNAIL = 8,
		ELEM_DESCRIPTION = 9;
		inst.readData = function () {
			inst.each(function () {
				if (this.nodeName.toLowerCase() != "a" && this.nodeName.toLowerCase() != "area")
					return;
				var $this = $(this);
				var fileType = inst.checkType($this.attr("href"));
				if (fileType < 0)
					return;
				for (var i = 0; i < inst.elemArray.length; i++)
					if ($this.attr("href") == inst.elemArray[i][ELEM_HREF])
						return;
				inst.elemArray.push(new Array(fileType, $this.attr("href"), $this.attr("title"), $this.data("group"), $this.data("width"), $this.data("height"), $this.data("webm"), $this.data("ogg"), $this.data("thumbnail"), $this.data("description")))
			})
		};
		inst.createMarkup = function () {
			if (inst.options.titlestyle == "inside") {
				inst.options.titlecss =
					inst.options.titleinsidecss;
				inst.options.descriptioncss = inst.options.descriptioninsidecss
			} else if (inst.options.titlestyle == "bottom") {
				inst.options.titlecss = inst.options.titlebottomcss;
				inst.options.descriptioncss = inst.options.descriptionbottomcss
			}
			var styleCss = "#html5-text " + inst.options.titlecss;
			styleCss += ".html5-description " + inst.options.descriptioncss;
			styleCss += ".html5-error " + inst.options.errorcss;
			$("head").append("<style type='text/css'>" + styleCss + "</style>");
			inst.$lightbox = jQuery("<div id='html5-lightbox' style='display:none;top:0px;left:0px;width:100%;height:100%;z-index:9999998;'>" +
					"<div id='html5-lightbox-overlay' style='display:block;position:absolute;top:0px;left:0px;width:100%;min-height:100%;background-color:" + inst.options.overlaybgcolor + ";opacity:" + inst.options.overlayopacity + ";filter:alpha(opacity=" + Math.round(inst.options.overlayopacity * 100) + ");'></div>" + "<div id='html5-lightbox-box' style='display:block;position:relative;margin:0px auto;'>" + "<div id='html5-elem-box' style='display:block;position:relative;margin:0px auto;text-align:center;overflow:hidden;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;'>" +
					"<div id='html5-elem-wrap' style='display:block;position:relative;margin:0px auto;text-align:center;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;background-color:" + inst.options.bgcolor + ";'>" + "<div id='html5-loading' style='display:none;position:absolute;top:0px;left:0px;text-align:center;width:100%;height:100%;background:url(\"" + inst.options.skinsfolder + inst.options.loadingimage + "\") no-repeat center center;'></div>" + "<div id='html5-error' class='html5-error' style='display:none;position:absolute;padding:" +
					inst.options.bordersize + "px;text-align:center;width:" + inst.options.errorwidth + "px;height:" + inst.options.errorheight + "px;'>" + "The requested content cannot be loaded.<br />Please try again later." + "</div>" + "<div id='html5-image' style='display:none;position:absolute;top:0px;left:0px;padding:" + inst.options.bordersize + "px;text-align:center;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;'></div>" + "<div id='html5-next' style='display:none;cursor:pointer;position:absolute;right:" +
					inst.options.bordersize + "px;top:50%;margin-top:-16px;'><img src='" + inst.options.skinsfolder + inst.options.nextimage + "'></div>" + "<div id='html5-prev' style='display:none;cursor:pointer;position:absolute;left:" + inst.options.bordersize + "px;top:50%;margin-top:-16px;'><img src='" + inst.options.skinsfolder + inst.options.previmage + "'></div>" + "</div>" + "</div>" + "<div id='html5-watermark' style='display:none;position:absolute;left:" + String(inst.options.bordersize + 2) + "px;top:" + String(inst.options.bordersize + 2) +
					"px;'></div>" + "</div>" + "</div>");
			inst.$lightbox.css({
				position : inst.options.supportCSSPositionFixed && inst.options.responsive ? "fixed" : "absolute"
			});
			inst.$lightbox.appendTo("body");
			inst.$lightboxBox = $("#html5-lightbox-box", inst.$lightbox);
			inst.$elem = $("#html5-elem-box", inst.$lightbox);
			inst.$elemWrap = $("#html5-elem-wrap", inst.$lightbox);
			inst.$loading = $("#html5-loading", inst.$lightbox);
			inst.$error = $("#html5-error", inst.$lightbox);
			inst.$image = $("#html5-image", inst.$lightbox);
			inst.$next = $("#html5-next", inst.$lightbox);
			inst.$prev = $("#html5-prev", inst.$lightbox);
			var elemText = "<div id='html5-elem-data-box' style='display:none;'><div id='html5-text' style='display:block;overflow:hidden;'></div></div>";
			inst.$elem.append(elemText);
			inst.$elemData = $("#html5-elem-data-box", inst.$lightbox);
			inst.$text = $("#html5-text", inst.$lightbox);
			if (inst.options.borderradius > 0) {
				inst.$elem.css({
					"border-radius" : inst.options.borderradius + "px",
					"-moz-border-radius" : inst.options.borderradius + "px",
					"-webkit-border-radius" : inst.options.borderradius +
					"px"
				});
				if (inst.options.titlestyle == "inside")
					inst.$elemWrap.css({
						"border-radius" : inst.options.borderradius + "px",
						"-moz-border-radius" : inst.options.borderradius + "px",
						"-webkit-border-radius" : inst.options.borderradius + "px"
					});
				else {
					inst.$elemWrap.css({
						"border-top-left-radius" : inst.options.borderradius + "px",
						"-moz-top-left-border-radius" : inst.options.borderradius + "px",
						"-webkit-top-left-border-radius" : inst.options.borderradius + "px",
						"border-top-right-radius" : inst.options.borderradius + "px",
						"-moz-top-right-border-radius" : inst.options.borderradius +
						"px",
						"-webkit-top-right-border-radius" : inst.options.borderradius + "px"
					});
					inst.$elemData.css({
						"border-bottom-left-radius" : inst.options.borderradius + "px",
						"-moz-top-bottom-border-radius" : inst.options.borderradius + "px",
						"-webkit-bottom-left-border-radius" : inst.options.borderradius + "px",
						"border-bottom-right-radius" : inst.options.borderradius + "px",
						"-moz-bottom-right-border-radius" : inst.options.borderradius + "px",
						"-webkit-bottom-right-border-radius" : inst.options.borderradius + "px"
					})
				}
			}
			if (inst.options.titlestyle ==
				"inside") {
				inst.$elemData.css({
					position : "absolute",
					margin : inst.options.bordersize + "px",
					bottom : 0,
					left : 0,
					"background-color" : "#333",
					"background-color" : "rgba(51, 51, 51, 0.6)"
				});
				inst.$text.css({
					padding : inst.options.bordersize + "px " + 2 * inst.options.bordersize + "px"
				})
			} else {
				inst.$elemData.css({
					position : "relative",
					width : "100%",
					height : inst.options.barautoheight ? "auto" : inst.options.barheight + "px",
					"padding" : "0 0 " + inst.options.bordersize + "px" + " 0",
					"background-color" : inst.options.bgcolor,
					"text-align" : "left"
				});
				inst.$text.css({
					"margin" : "0 " +
					inst.options.bordersize + "px"
				})
			}
			inst.$lightboxBox.append("<div id='html5-close' style='display:none;cursor:pointer;position:absolute;top:0;right:0;margin-top:-16px;margin-right:-16px;'><img src='" + inst.options.skinsfolder + inst.options.closeimage + "'></div>");
			inst.$close = $("#html5-close", inst.$lightbox);
			inst.$watermark = $("#html5-watermark", inst.$lightbox);
			if (inst.options.stamp)
				inst.$watermark.html("<a href='" + inst.options.freelink + "' style='text-decoration:none;' title='jQuery Lightbox'><div style='display:block;width:100px;height:20px;text-align:center;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;background-color:#fff;color:#333;font:12px Arial,sans-serif;'><div style='line-height:20px;'>" +
					inst.options.freemark + "</div></div></a>");
			else if (inst.options.watermark) {
				var html = "<img src='" + inst.options.watermark + "' style='border:none;' />";
				if (inst.options.watermarklink)
					html = "<a href='" + inst.options.watermarklink + "' target='_blank'>" + html + "</a>";
				inst.$watermark.html(html)
			}
			$("#html5-lightbox-overlay", inst.$lightbox).click(inst.finish);
			inst.$close.click(inst.finish);
			inst.$next.click(function () {
				inst.gotoSlide(-1)
			});
			inst.$prev.click(function () {
				inst.gotoSlide(-2)
			});
			$(window).resize(function () {
				if (!inst.options.isMobile) {
					clearTimeout(inst.options.resizeTimeout);
					inst.options.resizeTimeout = setTimeout(function () {
							inst.resizeWindow()
						}, 500)
				}
			});
			$(window).scroll(function () {
				inst.scrollBox()
			});
			$(window).bind("orientationchange", function (e) {
				if (inst.options.isMobile)
					inst.resizeWindow()
			});
			if (inst.options.isIPhone) {
				inst.options.windowInnerHeight = window.innerHeight;
				setInterval(function () {
					if (inst.options.windowInnerHeight != window.innerHeight) {
						inst.options.windowInnerHeight = window.innerHeight;
						inst.resizeWindow()
					}
				}, 500)
			}
			inst.enableSwipe()
		};
		inst.calcNextPrevElem = function () {
			inst.options.nextElem =
				-1;
			inst.options.prevElem = -1;
			var j,
			curGroup = inst.elemArray[inst.options.curElem][ELEM_GROUP];
			if (curGroup != undefined && curGroup != null) {
				for (j = inst.options.curElem + 1; j < inst.elemArray.length; j++)
					if (inst.elemArray[j][ELEM_GROUP] == curGroup) {
						inst.options.nextElem = j;
						break
					}
				if (inst.options.nextElem < 0)
					for (j = 0; j < inst.options.curElem; j++)
						if (inst.elemArray[j][ELEM_GROUP] == curGroup) {
							inst.options.nextElem = j;
							break
						}
				if (inst.options.nextElem >= 0) {
					for (j = inst.options.curElem - 1; j >= 0; j--)
						if (inst.elemArray[j][ELEM_GROUP] == curGroup) {
							inst.options.prevElem =
								j;
							break
						}
					if (inst.options.prevElem < 0)
						for (j = inst.elemArray.length - 1; j > inst.options.curElem; j--)
							if (inst.elemArray[j][ELEM_GROUP] == curGroup) {
								inst.options.prevElem = j;
								break
							}
				}
			}
		};
		inst.clickHandler = function () {
			if (inst.elemArray.length <= 0)
				return true;
			var $this = $(this);
			inst.hideObjects();
			for (var i = 0; i < inst.elemArray.length; i++)
				if (inst.elemArray[i][ELEM_HREF] == $this.attr("href"))
					break;
			if (i == inst.elemArray.length)
				return true;
			inst.options.curElem = i;
			inst.options.nextElem = -1;
			inst.options.prevElem = -1;
			inst.calcNextPrevElem();
			inst.$next.hide();
			inst.$prev.hide();
			inst.reset();
			inst.$lightbox.show();
			if (!inst.options.supportCSSPositionFixed)
				inst.$lightbox.css("top", $(window).scrollTop());
			var boxW = inst.options.loadingwidth + 2 * inst.options.bordersize;
			var boxH = inst.options.loadingheight + 2 * inst.options.bordersize;
			var winH = window.innerHeight ? window.innerHeight : $(window).height();
			var boxT = Math.round(winH / 2 - boxH / 2);
			if (inst.options.titlestyle != "inside")
				boxT -= Math.round(inst.options.barheight / 2);
			if (boxT < 16)
				boxT = 16;
			inst.$lightboxBox.css({
				"margin-top" : boxT,
				"width" : boxW,
				"height" : boxH
			});
			inst.$elemWrap.css({
				"width" : boxW,
				"height" : boxH
			});
			inst.loadCurElem();
			return false
		};
		inst.loadThumbnail = function (src, index) {
			var imgLoader = new Image;
			$(imgLoader).load(function () {
				var style;
				if (this.width / this.height <= inst.options.thumbwidth / inst.options.thumbheight)
					style = "width:100%;";
				else
					style = "height:100%;";
				$(".html5-nav-thumb").eq(index).html("<img style='" + style + "' src='" + src + "' />")
			});
			imgLoader.src = src
		};
		inst.showNavigation = function () {
			if (!inst.options.shownavigation)
				return;
			if (!inst.currentElem || !inst.currentElem[ELEM_GROUP])
				return;
			var i;
			var showNav = false;
			var group = inst.currentElem[ELEM_GROUP];
			for (i = 0; i < inst.elemArray.length; i++)
				if (group == inst.elemArray[i][ELEM_GROUP])
					if (inst.elemArray[i][ELEM_THUMBNAIL] && inst.elemArray[i][ELEM_THUMBNAIL].length > 0) {
						showNav = true;
						break
					}
			if (!showNav)
				return;
			inst.options.navheight = inst.options.thumbheight + inst.options.thumbtopmargin + inst.options.thumbbottommargin;
			if ($(".html5-nav").length > 0)
				return;
			$("body").append("<div class='html5-nav' style='display:block;position:fixed;bottom:0;left:0;width:100%;height:" +
				inst.options.navheight + "px;z-index:9999999;'>" + "<div class='html5-nav-container' style='position:relative;margin:" + inst.options.thumbtopmargin + "px auto " + inst.options.thumbbottommargin + "px;'>" + "<div class='html5-nav-prev' style='display:block;position:absolute;cursor:pointer;width:" + inst.options.navbuttonwidth + 'px;height:100%;left:0;top:0;background:url("' + inst.options.skinsfolder + inst.options.navarrowsprevimage + "\") no-repeat left center;'></div>" + "<div class='html5-nav-mask' style='display:block;position:relative;margin:0 auto;overflow:hidden;'>" +
				"<div class='html5-nav-list'></div>" + "</div>" + "<div class='html5-nav-next' style='display:block;position:absolute;cursor:pointer;width:" + inst.options.navbuttonwidth + 'px;height:100%;right:0;top:0;background:url("' + inst.options.skinsfolder + inst.options.navarrowsnextimage + "\") no-repeat right center;'></div>" + "</div>" + "</div>");
			var index = 0;
			for (i = 0; i < inst.elemArray.length; i++)
				if (group == inst.elemArray[i][ELEM_GROUP])
					if (inst.elemArray[i][ELEM_THUMBNAIL] && inst.elemArray[i][ELEM_THUMBNAIL].length > 0) {
						$(".html5-nav-list").append("<div class='html5-nav-thumb' data-arrayindex='" +
							index + "' style='float:left;overflow:hidden;cursor:pointer;opacity:" + inst.options.thumbopacity + ";margin: 0 " + inst.options.thumbgap / 2 + "px;width:" + inst.options.thumbwidth + "px;height:" + inst.options.thumbheight + "px;border:" + inst.options.thumbborder + "px solid " + inst.options.thumbbordercolor + ";'></div>");
						this.loadThumbnail(inst.elemArray[i][ELEM_THUMBNAIL], index);
						index++
					}
			$(".html5-nav-thumb").hover(function () {
				$(this).css({
					opacity : 1
				});
				$(this).css({
					border : inst.options.thumbborder + "px solid " + inst.options.thumbhighlightbordercolor
				})
			},
				function () {
				$(this).css({
					opacity : inst.options.thumbopacity
				});
				$(this).css({
					border : inst.options.thumbborder + "px solid " + inst.options.thumbbordercolor
				})
			});
			$(".html5-nav-thumb").click(function () {
				var index = $(this).data("arrayindex");
				if (index >= 0)
					inst.gotoSlide(index)
			});
			inst.options.totalwidth = index * (inst.options.thumbgap + inst.options.thumbwidth + 2 * inst.options.thumbborder);
			$(".html5-nav-list").css({
				display : "block",
				position : "relative",
				"margin-left" : 0,
				width : inst.options.totalwidth + "px"
			}).append("<div style='clear:both;'></div>");
			var $navMask = $(".html5-nav-mask");
			var $navPrev = $(".html5-nav-prev");
			var $navNext = $(".html5-nav-next");
			$navPrev.click(function () {
				var $navList = $(".html5-nav-list");
				var $navNext = $(".html5-nav-next");
				var winWidth = inst.options.isMobile ? Math.max($(window).width(), $(document).width()) : $(window).width();
				var maskWidth = winWidth - 2 * inst.options.navbuttonwidth;
				var marginLeft = parseInt($navList.css("margin-left")) + maskWidth;
				if (marginLeft >= 0) {
					marginLeft = 0;
					$(this).css({
						"background-position" : "center left"
					})
				} else
					$(this).css({
						"background-position" : "center right"
					});
				if (marginLeft <= maskWidth - inst.options.totalwidth)
					$navNext.css({
						"background-position" : "center left"
					});
				else
					$navNext.css({
						"background-position" : "center right"
					});
				$navList.animate({
					"margin-left" : marginLeft
				})
			});
			$navNext.click(function () {
				var $navList = $(".html5-nav-list");
				var $navPrev = $(".html5-nav-prev");
				var winWidth = inst.options.isMobile ? Math.max($(window).width(), $(document).width()) : $(window).width();
				var maskWidth = winWidth - 2 * inst.options.navbuttonwidth;
				var marginLeft = parseInt($navList.css("margin-left")) -
					maskWidth;
				if (marginLeft <= maskWidth - inst.options.totalwidth) {
					marginLeft = maskWidth - inst.options.totalwidth;
					$(this).css({
						"background-position" : "center left"
					})
				} else
					$(this).css({
						"background-position" : "center right"
					});
				if (marginLeft >= 0)
					$navPrev.css({
						"background-position" : "center left"
					});
				else
					$navPrev.css({
						"background-position" : "center right"
					});
				$navList.animate({
					"margin-left" : marginLeft
				})
			});
			var winWidth = inst.options.isMobile ? Math.max($(window).width(), $(document).width()) : $(window).width();
			if (inst.options.totalwidth <=
				winWidth) {
				$navMask.css({
					width : inst.options.totalwidth + "px"
				});
				$navPrev.hide();
				$navNext.hide()
			} else {
				$navMask.css({
					width : winWidth - 2 * inst.options.navbuttonwidth + "px"
				});
				$navPrev.show();
				$navNext.show()
			}
		};
		inst.loadElem = function (elem) {
			inst.currentElem = elem;
			inst.showing = true;
			inst.showNavigation();
			inst.$elem.unbind("mouseenter").unbind("mouseleave").unbind("mousemove");
			inst.$loading.show();
			switch (elem[ELEM_TYPE]) {
			case 0:
				var imgLoader = new Image;
				$(imgLoader).load(function () {
					inst.showImage(elem, imgLoader.width,
						imgLoader.height)
				});
				$(imgLoader).error(function () {
					inst.showError()
				});
				imgLoader.src = elem[ELEM_HREF];
				break;
			case 1:
				inst.showSWF(elem);
				break;
			case 2:
			case 8:
				inst.showVideo(elem);
				break;
			case 3:
			case 4:
				inst.showYoutubeVimeo(elem);
				break;
			case 5:
				inst.showPDF(elem);
				break;
			case 6:
				inst.showMP3(elem);
				break;
			case 7:
				inst.showWeb(elem);
				break
			}
		};
		inst.loadCurElem = function () {
			inst.loadElem(inst.elemArray[inst.options.curElem])
		};
		inst.showError = function () {
			inst.$loading.hide();
			inst.resizeLightbox(inst.options.errorwidth, inst.options.errorheight,
				true, function () {
				inst.$error.show();
				inst.$elem.fadeIn(inst.options.fadespeed, function () {
					inst.showData()
				})
			})
		};
		inst.calcTextWidth = function (objW) {
			return objW - 36
		};
		inst.showTitle = function (w, t, description) {
			if (inst.options.titlestyle == "inside")
				inst.$elemData.css({
					width : w + "px"
				});
			var text = "";
			if (inst.options.showtitle && t && t.length > 0)
				text += t;
			if (inst.options.showdescription && description && description.length > 0)
				text += '<p class="html5-description">' + description + "</p>";
			inst.$text.html(text)
		},
		inst.showImage = function (elem,
			imgW, imgH) {
			var elemW,
			elemH;
			if (elem[ELEM_WIDTH])
				elemW = elem[ELEM_WIDTH];
			else {
				elemW = imgW;
				elem[ELEM_WIDTH] = imgW
			}
			if (elem[ELEM_HEIGHT])
				elemH = elem[ELEM_HEIGHT];
			else {
				elemH = imgH;
				elem[ELEM_HEIGHT] = imgH
			}
			var sizeObj = inst.calcElemSize({
					w : elemW,
					h : elemH
				});
			inst.resizeLightbox(sizeObj.w, sizeObj.h, true, function () {
				inst.showTitle(sizeObj.w, elem[ELEM_TITLE], elem[ELEM_DESCRIPTION]);
				inst.$image.css({
					width : sizeObj.w,
					height : sizeObj.h
				}).show();
				inst.$image.html("<img src='" + elem[ELEM_HREF] + "' width='100%' height='100%' />");
				inst.$elem.fadeIn(inst.options.fadespeed, function () {
					inst.showData()
				})
			})
		};
		inst.showSWF = function (elem) {
			var dataW = elem[ELEM_WIDTH] ? elem[ELEM_WIDTH] : 960;
			var dataH = elem[ELEM_HEIGHT] ? elem[ELEM_HEIGHT] : 540;
			var sizeObj = inst.calcElemSize({
					w : dataW,
					h : dataH
				});
			dataW = sizeObj.w;
			dataH = sizeObj.h;
			inst.resizeLightbox(dataW, dataH, true, function () {
				inst.showTitle(sizeObj.w, elem[ELEM_TITLE], elem[ELEM_DESCRIPTION]);
				inst.$image.css({
					width : sizeObj.w,
					height : sizeObj.h
				}).html("<div id='html5lightbox-swf' style='display:block;width:100%;height:100%;'></div>").show();
				inst.embedFlash($("#html5lightbox-swf"), elem[ELEM_HREF], "window", {
					width : dataW,
					height : dataH
				});
				inst.$elem.show();
				inst.showData()
			})
		};
		inst.showVideo = function (elem) {
			var dataW = elem[ELEM_WIDTH] ? elem[ELEM_WIDTH] : 960;
			var dataH = elem[ELEM_HEIGHT] ? elem[ELEM_HEIGHT] : 540;
			var sizeObj = inst.calcElemSize({
					w : dataW,
					h : dataH
				});
			dataW = sizeObj.w;
			dataH = sizeObj.h;
			inst.resizeLightbox(dataW, dataH, true, function () {
				inst.showTitle(sizeObj.w, elem[ELEM_TITLE], elem[ELEM_DESCRIPTION]);
				inst.$image.css({
					width : sizeObj.w,
					height : sizeObj.h
				}).html("<div id='html5lightbox-video' style='display:block;width:100%;height:100%;'></div>").show();
				var isHTML5 = false;
				if (inst.options.isIE6789 || elem[ELEM_TYPE] == 8)
					isHTML5 = false;
				else if (inst.options.isMobile)
					isHTML5 = true;
				else if ((inst.options.html5player || !inst.options.flashInstalled) && inst.options.html5VideoSupported)
					if (!inst.options.isFirefox && !inst.options.isOpera || (inst.options.isFirefox || inst.options.isOpera) && (elem[ELEM_HREF_OGG] || elem[ELEM_HREF_WEBM]))
						isHTML5 = true;
				if (isHTML5) {
					var videoSrc = elem[ELEM_HREF];
					if (inst.options.isFirefox || inst.options.isOpera || !videoSrc)
						videoSrc = elem[ELEM_HREF_WEBM] ?
							elem[ELEM_HREF_WEBM] : elem[ELEM_HREF_OGG];
					inst.embedHTML5Video($("#html5lightbox-video"), videoSrc, inst.options.autoplay)
				} else {
					var videoFile = elem[ELEM_HREF];
					if (videoFile.charAt(0) != "/" && videoFile.substring(0, 5) != "http:" && videoFile.substring(0, 6) != "https:")
						videoFile = inst.options.htmlfolder + videoFile;
					inst.embedFlash($("#html5lightbox-video"), inst.options.jsfolder + "html5boxplayer.swf", "transparent", {
						width : dataW,
						height : dataH,
						videofile : videoFile,
						autoplay : inst.options.autoplay ? "1" : "0",
						errorcss : ".html5box-error" +
						inst.options.errorcss,
						id : 0
					})
				}
				inst.$elem.show();
				inst.showData()
			})
		};
		inst.getYoutubeParams = function (href) {
			var result = {};
			if (href.indexOf("?") < 0)
				return result;
			var params = href.substring(href.indexOf("?") + 1).split("&");
			for (var i = 0; i < params.length; i++) {
				var value = params[i].split("=");
				if (value && value.length == 2 && value[0].toLowerCase() != "v")
					result[value[0].toLowerCase()] = value[1]
			}
			return result
		};
		inst.prepareYoutubeHref = function (href) {
			var youtubeId = "";
			var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\??v?=?))([^#\&\?]*).*/;
			var match = href.match(regExp);
			if (match && match[7] && match[7].length == 11)
				youtubeId = match[7];
			var result = "http://www.youtube.com/embed/" + youtubeId;
			var params = this.getYoutubeParams(href);
			var first = true;
			for (var key in params) {
				if (first) {
					result += "?";
					first = false
				} else
					result += "&";
				result += key + "=" + params[key]
			}
			return result
		};
		inst.showYoutubeVimeo = function (elem) {
			var dataW = elem[ELEM_WIDTH] ? elem[ELEM_WIDTH] : 960;
			var dataH = elem[ELEM_HEIGHT] ? elem[ELEM_HEIGHT] : 540;
			var sizeObj = inst.calcElemSize({
					w : dataW,
					h : dataH
				});
			dataW =
				sizeObj.w;
			dataH = sizeObj.h;
			inst.resizeLightbox(dataW, dataH, true, function () {
				inst.showTitle(sizeObj.w, elem[ELEM_TITLE], elem[ELEM_DESCRIPTION]);
				inst.$image.css({
					width : sizeObj.w,
					height : sizeObj.h
				}).html("<div id='html5lightbox-video' style='display:block;width:100%;height:100%;'></div>").show();
				var href = elem[ELEM_HREF];
				if (elem[ELEM_TYPE] == 3)
					href = inst.prepareYoutubeHref(href);
				if (inst.options.autoplay)
					if (href.indexOf("?") < 0)
						href += "?autoplay=1";
					else
						href += "&autoplay=1";
				if (elem[ELEM_TYPE] == 3)
					if (href.indexOf("?") <
						0)
						href += "?wmode=transparent&rel=0";
					else
						href += "&wmode=transparent&rel=0";
				$("#html5lightbox-video").html("<iframe width='100%' height='100%' src='" + href + "' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>");
				inst.$elem.show();
				inst.showData()
			})
		};
		inst.showPDF = function (elem) {};
		inst.showMP3 = function (elem) {};
		inst.showWeb = function (elem) {
			var winWidth = inst.options.isMobile ? Math.max($(window).width(), $(document).width()) : $(window).width();
			var winH = window.innerHeight ? window.innerHeight :
				$(window).height();
			var dataW = elem[ELEM_WIDTH] ? elem[ELEM_WIDTH] : winWidth;
			var dataH = elem[ELEM_HEIGHT] ? elem[ELEM_HEIGHT] : winH - inst.options.navheight;
			var sizeObj = inst.calcElemSize({
					w : dataW,
					h : dataH
				});
			dataW = sizeObj.w;
			dataH = sizeObj.h;
			inst.resizeLightbox(dataW, dataH, true, function () {
				inst.$loading.hide();
				inst.showTitle(sizeObj.w, elem[ELEM_TITLE], elem[ELEM_DESCRIPTION]);
				inst.$image.css({
					width : sizeObj.w,
					height : sizeObj.h
				}).html("<div id='html5lightbox-web' style='display:block;width:100%;height:100%;'></div>").show();
				$("#html5lightbox-web").html("<iframe width='100%' height='100%' src='" + elem[ELEM_HREF] + "' frameborder='0'></iframe>");
				inst.$elem.show();
				inst.showData()
			})
		};
		inst.scrollBox = function () {
			if (!inst.options.supportCSSPositionFixed)
				inst.$lightbox.css("top", $(window).scrollTop())
		};
		inst.resizeWindow = function () {
			if (!inst.currentElem)
				return;
			if (!inst.options.responsive)
				return;
			var elemW = inst.currentElem[ELEM_WIDTH] ? inst.currentElem[ELEM_WIDTH] : 960;
			var elemH = inst.currentElem[ELEM_HEIGHT] ? inst.currentElem[ELEM_HEIGHT] :
				540;
			var sizeObj = inst.calcElemSize({
					w : elemW,
					h : elemH
				});
			var winH = window.innerHeight ? window.innerHeight : $(window).height();
			var boxW = sizeObj.w + 2 * inst.options.bordersize;
			var boxH = sizeObj.h + 2 * inst.options.bordersize;
			var boxT = Math.round((winH - inst.options.navheight) / 2 - boxH / 2);
			if (inst.options.titlestyle != "inside")
				boxT -= Math.round(inst.options.barheight / 2);
			if (boxT < 16)
				boxT = 16;
			inst.$lightboxBox.css({
				"margin-top" : boxT
			});
			inst.$lightboxBox.css({
				"width" : boxW,
				"height" : boxH
			});
			inst.$elemWrap.css({
				width : boxW,
				height : boxH
			});
			inst.$image.css({
				width : sizeObj.w,
				height : sizeObj.h
			});
			if ($(".html5-nav").length <= 0)
				return;
			$(".html5-nav-list").css({
				"margin-left" : 0
			});
			var $navMask = $(".html5-nav-mask");
			var $navPrev = $(".html5-nav-prev");
			var $navNext = $(".html5-nav-next");
			var winWidth = inst.options.isMobile ? Math.max($(window).width(), $(document).width()) : $(window).width();
			if (inst.options.totalwidth <= winWidth) {
				$navMask.css({
					width : inst.options.totalwidth + "px"
				});
				$navPrev.hide();
				$navNext.hide()
			} else {
				$navMask.css({
					width : winWidth - 2 * inst.options.navbuttonwidth +
					"px"
				});
				$navPrev.show();
				$navNext.show()
			}
		};
		inst.calcElemSize = function (sizeObj) {
			if (!inst.options.responsive)
				return sizeObj;
			var winH = window.innerHeight ? window.innerHeight : $(window).height();
			var h0 = winH - inst.options.navheight - 2 * inst.options.bordersize - 2 * inst.options.bordermargin;
			if (inst.options.titlestyle != "inside")
				h0 -= inst.options.barheight;
			if (sizeObj.h > h0) {
				sizeObj.w = Math.round(sizeObj.w * h0 / sizeObj.h);
				sizeObj.h = h0
			}
			var winWidth = inst.options.isMobile ? Math.max($(window).width(), $(document).width()) : $(window).width();
			var w0 = winWidth - 2 * inst.options.bordersize - 2 * inst.options.bordermargin;
			if (sizeObj.w > w0) {
				sizeObj.h = Math.round(sizeObj.h * w0 / sizeObj.w);
				sizeObj.w = w0
			}
			return sizeObj
		};
		inst.showData = function () {
			if (inst.$text.text().length > 0)
				inst.$elemData.show();
			if (inst.$text.text().length > 0 && inst.options.titlestyle != "inside")
				inst.$lightboxBox.css({
					height : String(inst.$lightboxBox.height() + inst.options.barheight) + "px"
				});
			$("#html5-lightbox-overlay", inst.$lightbox).css({
				height : Math.max($(window).height(), $(document).height())
			})
		};
		inst.resizeLightbox = function (elemW, elemH, bAnimate, onFinish) {
			var winH = window.innerHeight ? window.innerHeight : $(window).height();
			var speed = bAnimate ? inst.options.resizespeed : 0;
			var boxW = elemW + 2 * inst.options.bordersize;
			var boxH = elemH + 2 * inst.options.bordersize;
			var boxT = Math.round((winH - inst.options.navheight) / 2 - boxH / 2);
			if (inst.options.titlestyle != "inside")
				boxT -= Math.round(inst.options.barheight / 2);
			if (boxT < 16)
				boxT = 16;
			if (boxW == inst.$elemWrap.width() && boxH == inst.$elemWrap.height())
				speed = 0;
			inst.$loading.hide();
			inst.$watermark.hide();
			inst.$elem.bind("mouseenter mousemove", function () {
				if (inst.options.prevElem >= 0 || inst.options.nextElem >= 0) {
					inst.$next.fadeIn();
					inst.$prev.fadeIn()
				}
			});
			inst.$elem.bind("mouseleave", function () {
				inst.$next.fadeOut();
				inst.$prev.fadeOut()
			});
			inst.$lightboxBox.css({
				"margin-top" : boxT
			});
			inst.$lightboxBox.css({
				"width" : boxW,
				"height" : boxH
			});
			inst.$elemWrap.animate({
				width : boxW
			}, speed).animate({
				height : boxH
			}, speed, function () {
				inst.$loading.show();
				inst.$watermark.show();
				inst.$close.show();
				inst.$elem.css({
					"background-color" : inst.options.bgcolor
				});
				onFinish()
			})
		};
		inst.reset = function () {
			if (inst.options.stamp)
				inst.$watermark.hide();
			inst.showing = false;
			inst.$image.empty();
			inst.$text.empty();
			inst.$error.hide();
			inst.$loading.hide();
			inst.$image.hide();
			inst.$elemData.hide();
			inst.$close.hide();
			inst.$elem.css({
				"background-color" : ""
			})
		};
		inst.resetNavigation = function () {
			inst.options.navheight = 0;
			$(".html5-nav").remove()
		};
		inst.finish = function () {
			inst.reset();
			inst.resetNavigation();
			inst.$lightbox.hide();
			inst.showObjects()
		};
		inst.pauseSlide = function () {};
		inst.playSlide =
		function () {};
		inst.gotoSlide = function (slide) {
			if (slide == -1) {
				if (inst.options.nextElem < 0)
					return;
				inst.options.curElem = inst.options.nextElem
			} else if (slide == -2) {
				if (inst.options.prevElem < 0)
					return;
				inst.options.curElem = inst.options.prevElem
			} else if (slide >= 0)
				inst.options.curElem = slide;
			inst.calcNextPrevElem();
			inst.reset();
			inst.loadCurElem()
		};
		inst.supportKeyboard = function () {
			$(document).keyup(function (e) {
				if (!inst.showing)
					return;
				if (inst.options.supportesckey && e.keyCode == 27)
					inst.finish();
				else if (inst.options.supportarrowkeys)
					if (e.keyCode ==
						39)
						inst.gotoSlide(-1);
					else if (e.keyCode == 37)
						inst.gotoSlide(-2)
			})
		};
		inst.enableSwipe = function () {
			inst.$elem.touchSwipe({
				preventWebBrowser : true,
				swipeLeft : function () {
					inst.gotoSlide(-1)
				},
				swipeRight : function () {
					inst.gotoSlide(-2)
				}
			})
		};
		inst.hideObjects = function () {
			$("select, embed, object").css({
				"visibility" : "hidden"
			})
		};
		inst.showObjects = function () {
			$("select, embed, object").css({
				"visibility" : "visible"
			})
		};
		inst.embedHTML5Video = function ($container, src, autoplay) {
			$container.html("<div style='display:block;width:100%;height:100%;position:relative;'><video width='100%' height='100%'" +
				(autoplay ? " autoplay" : "") + (inst.options.nativehtml5controls ? " controls='controls'" : "") + " src='" + src + "'></div>");
			if (!inst.options.nativehtml5controls) {
				$("video", $container).data("src", src);
				$("video", $container).acLightboxHTML5VideoControls(inst.options.skinsfolder, inst)
			}
		};
		inst.embedFlash = function ($container, src, wmode, flashVars) {
			if (inst.options.flashInstalled) {
				var htmlOptions = {
					pluginspage : "http://www.adobe.com/go/getflashplayer",
					quality : "high",
					allowFullScreen : "true",
					allowScriptAccess : "always",
					type : "application/x-shockwave-flash"
				};
				htmlOptions.width = "100%";
				htmlOptions.height = "100%";
				htmlOptions.src = src;
				htmlOptions.flashVars = $.param(flashVars);
				htmlOptions.wmode = wmode;
				var htmlString = "";
				for (var key in htmlOptions)
					htmlString += key + "=" + htmlOptions[key] + " ";
				$container.html("<embed " + htmlString + "/>")
			} else
				$container.html("<div class='html5lightbox-flash-error' style='display:block; position:relative;text-align:center; width:100%; left:0px; top:40%;'><div class='html5-error'><div>The required Adobe Flash Player plugin is not installed</div><br /><div style='display:block;position:relative;text-align:center;width:112px;height:33px;margin:0px auto;'><a href='http://www.adobe.com/go/getflashplayer'><img src='http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player' width='112' height='33'></img></a></div></div>")
		};
		inst.checkType = function (href) {
			if (!href)
				return -1;
			if (href.match(/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i))
				return 0;
			if (href.match(/[^\.]\.(swf)\s*$/i))
				return 1;
			if (href.match(/\.(mp4|m4v|ogv|ogg|webm)(.*)?$/i))
				return 2;
			if (href.match(/\:\/\/.*(youtube\.com)/i) || href.match(/\:\/\/.*(youtu\.be)/i))
				return 3;
			if (href.match(/\:\/\/.*(vimeo\.com)/i))
				return 4;
			if (href.match(/[^\.]\.(pdf)\s*$/i))
				return 5;
			if (href.match(/[^\.]\.(mp3)\s*$/i))
				return 6;
			if (href.match(/[^\.]\.(flv)\s*$/i))
				return 8;
			return 7
		};
		inst.showLightbox =
		function (type, href, title, width, height, webm, ogg, thumbnail, description) {
			inst.$next.hide();
			inst.$prev.hide();
			inst.reset();
			inst.$lightbox.show();
			if (!inst.options.supportCSSPositionFixed)
				inst.$lightbox.css("top", $(window).scrollTop());
			var winH = window.innerHeight ? window.innerHeight : $(window).height();
			var boxW = inst.options.loadingwidth + 2 * inst.options.bordersize;
			var boxH = inst.options.loadingheight + 2 * inst.options.bordersize;
			var boxT = Math.round(winH / 2 - boxH / 2);
			if (inst.options.titlestyle != "inside")
				boxT -= Math.round(inst.options.barheight /
					2);
			if (boxT < 16)
				boxT = 16;
			inst.$lightboxBox.css({
				"margin-top" : boxT,
				"width" : boxW,
				"height" : boxH
			});
			inst.$elemWrap.css({
				"width" : boxW,
				"height" : boxH
			});
			inst.loadElem(new Array(type, href, title, null, width, height, webm, ogg, thumbnail, description))
		};
		inst.addItem = function (href, title, group, width, height, webm, ogg, thumbnail, description) {
			type = inst.checkType(href);
			inst.elemArray.push(new Array(type, href, title, group, width, height, webm, ogg, thumbnail, description))
		};
		inst.showItem = function (href) {
			if (inst.elemArray.length <= 0)
				return true;
			inst.hideObjects();
			for (var i = 0; i < inst.elemArray.length; i++)
				if (inst.elemArray[i][ELEM_HREF] == href)
					break;
			if (i == inst.elemArray.length)
				return true;
			inst.options.curElem = i;
			inst.options.nextElem = -1;
			inst.options.prevElem = -1;
			inst.calcNextPrevElem();
			inst.$next.hide();
			inst.$prev.hide();
			inst.reset();
			inst.$lightbox.show();
			if (!inst.options.supportCSSPositionFixed)
				inst.$lightbox.css("top", $(window).scrollTop());
			var winH = window.innerHeight ? window.innerHeight : $(window).height();
			var boxW = inst.options.loadingwidth +
				2 * inst.options.bordersize;
			var boxH = inst.options.loadingheight + 2 * inst.options.bordersize;
			var boxT = Math.round(winH / 2 - boxH / 2);
			if (inst.options.titlestyle != "inside")
				boxT -= Math.round(inst.options.barheight / 2);
			if (boxT < 16)
				boxT = 16;
			inst.$lightboxBox.css({
				"margin-top" : boxT,
				"width" : boxW,
				"height" : boxH
			});
			inst.$elemWrap.css({
				"width" : boxW,
				"height" : boxH
			});
			inst.loadCurElem();
			return false
		};
		inst.init();
		return inst.unbind("click").click(inst.clickHandler)
	}
})(jQuery);
(function ($) {
	$.fn.acLightboxHTML5VideoControls = function (skinFolder, parentInst) {
		var isTouch = "ontouchstart" in window;
		var eStart = isTouch ? "touchstart" : "mousedown";
		var eMove = isTouch ? "touchmove" : "mousemove";
		var eCancel = isTouch ? "touchcancel" : "mouseup";
		var eClick = isTouch ? "touchstart" : "click";
		var BUTTON_SIZE = 32;
		var BAR_HEIGHT = isTouch ? 48 : 36;
		var hideControlsTimerId = null;
		var hideVolumeBarTimeoutId = null;
		var sliderDragging = false;
		var isFullscreen = false;
		var userActive = true;
		var isIPhone = navigator.userAgent.match(/iPod/i) !=
			null || navigator.userAgent.match(/iPhone/i) != null;
		var isHd = $(this).data("ishd");
		var hd = $(this).data("hd");
		var src = $(this).data("src");
		var $videoObj = $(this);
		$videoObj.get(0).removeAttribute("controls");
		if (isIPhone) {
			var h = $videoObj.height() - BAR_HEIGHT;
			$videoObj.css({
				height : h
			})
		}
		var $videoPlay = $("<div class='html5boxVideoPlay'></div>");
		if (!isIPhone) {
			$videoObj.after($videoPlay);
			$videoPlay.css({
				position : "absolute",
				top : "50%",
				left : "50%",
				display : "block",
				cursor : "pointer",
				width : 64,
				height : 64,
				"margin-left" : -32,
				"margin-top" : -32,
				"background-image" : "url('" + skinFolder + "html5boxplayer_playvideo.png" + "')",
				"background-position" : "center center",
				"background-repeat" : "no-repeat"
			}).bind(eClick, function () {
				$videoObj.get(0).play()
			})
		}
		var $videoFullscreenBg = $("<div class='html5boxVideoFullscreenBg'></div>");
		var $videoControls = $("<div class='html5boxVideoControls'>" + "<div class='html5boxVideoControlsBg'></div>" + "<div class='html5boxPlayPause'>" + "<div class='html5boxPlay'></div>" + "<div class='html5boxPause'></div>" + "</div>" +
				"<div class='html5boxTimeCurrent'>--:--</div>" + "<div class='html5boxFullscreen'></div>" + "<div class='html5boxHD'></div>" + "<div class='html5boxVolume'>" + "<div class='html5boxVolumeButton'></div>" + "<div class='html5boxVolumeBar'>" + "<div class='html5boxVolumeBarBg'>" + "<div class='html5boxVolumeBarActive'></div>" + "</div>" + "</div>" + "</div>" + "<div class='html5boxTimeTotal'>--:--</div>" + "<div class='html5boxSeeker'>" + "<div class='html5boxSeekerBuffer'></div>" + "<div class='html5boxSeekerPlay'></div>" + "<div class='html5boxSeekerHandler'></div>" +
				"</div>" + "<div style='clear:both;'></div>" + "</div>");
		$videoObj.after($videoControls);
		$videoObj.after($videoFullscreenBg);
		$videoFullscreenBg.css({
			display : "none",
			position : "fixed",
			left : 0,
			top : 0,
			bottom : 0,
			right : 0,
			"z-index" : 2147483647
		});
		$videoControls.css({
			display : "block",
			position : "absolute",
			width : "100%",
			height : BAR_HEIGHT,
			left : 0,
			bottom : 0,
			right : 0,
			"max-width" : "640px",
			margin : "0 auto"
		});
		var userActivate = function () {
			userActive = true
		};
		$videoObj.bind(eClick, function () {
			userActive = true
		}).hover(function () {
			userActive =
				true
		}, function () {
			userActive = false
		});
		setInterval(function () {
			if (userActive) {
				$videoControls.show();
				userActive = false;
				clearTimeout(hideControlsTimerId);
				hideControlsTimerId = setTimeout(function () {
						if (!$videoObj.get(0).paused)
							$videoControls.fadeOut()
					}, 5E3)
			}
		}, 250);
		$(".html5boxVideoControlsBg", $videoControls).css({
			display : "block",
			position : "absolute",
			width : "100%",
			height : "100%",
			left : 0,
			top : 0,
			"background-color" : "#000000",
			opacity : 0.7,
			filter : "alpha(opacity=70)"
		});
		$(".html5boxPlayPause", $videoControls).css({
			display : "block",
			position : "relative",
			width : BUTTON_SIZE + "px",
			height : BUTTON_SIZE + "px",
			margin : Math.floor((BAR_HEIGHT - BUTTON_SIZE) / 2),
			"float" : "left"
		});
		var $videoBtnPlay = $(".html5boxPlay", $videoControls);
		var $videoBtnPause = $(".html5boxPause", $videoControls);
		$videoBtnPlay.css({
			display : "block",
			position : "absolute",
			top : 0,
			left : 0,
			width : BUTTON_SIZE + "px",
			height : BUTTON_SIZE + "px",
			cursor : "pointer",
			"background-image" : "url('" + skinFolder + "html5boxplayer_playpause.png" + "')",
			"background-position" : "top left"
		}).hover(function () {
			$(this).css({
				"background-position" : "bottom left"
			})
		},
			function () {
			$(this).css({
				"background-position" : "top left"
			})
		}).bind(eClick, function () {
			$videoObj.get(0).play()
		});
		$videoBtnPause.css({
			display : "none",
			position : "absolute",
			top : 0,
			left : 0,
			width : BUTTON_SIZE + "px",
			height : BUTTON_SIZE + "px",
			cursor : "pointer",
			"background-image" : "url('" + skinFolder + "html5boxplayer_playpause.png" + "')",
			"background-position" : "top right"
		}).hover(function () {
			$(this).css({
				"background-position" : "bottom right"
			})
		}, function () {
			$(this).css({
				"background-position" : "top right"
			})
		}).bind(eClick, function () {
			$videoObj.get(0).pause()
		});
		var $videoTimeCurrent = $(".html5boxTimeCurrent", $videoControls);
		var $videoTimeTotal = $(".html5boxTimeTotal", $videoControls);
		var $videoSeeker = $(".html5boxSeeker", $videoControls);
		var $videoSeekerPlay = $(".html5boxSeekerPlay", $videoControls);
		var $videoSeekerBuffer = $(".html5boxSeekerBuffer", $videoControls);
		var $videoSeekerHandler = $(".html5boxSeekerHandler", $videoControls);
		$videoTimeCurrent.css({
			display : "block",
			position : "relative",
			"float" : "left",
			"line-height" : BAR_HEIGHT + "px",
			"font-weight" : "normal",
			"font-size" : "12px",
			margin : "0 8px",
			"font-family" : "Arial, Helvetica, sans-serif",
			color : "#fff"
		});
		$videoTimeTotal.css({
			display : "block",
			position : "relative",
			"float" : "right",
			"line-height" : BAR_HEIGHT + "px",
			"font-weight" : "normal",
			"font-size" : "12px",
			margin : "0 8px",
			"font-family" : "Arial, Helvetica, sans-serif",
			color : "#fff"
		});
		$videoSeeker.css({
			display : "block",
			cursor : "pointer",
			overflow : "hidden",
			position : "relative",
			height : "10px",
			"background-color" : "#222",
			margin : Math.floor((BAR_HEIGHT - 10) / 2) + "px 4px"
		}).bind(eStart, function (e) {
			var e0 =
				isTouch ? e.originalEvent.touches[0] : e;
			var pos = e0.pageX - $videoSeeker.offset().left;
			$videoSeekerPlay.css({
				width : pos
			});
			$videoObj.get(0).currentTime = pos * $videoObj.get(0).duration / $videoSeeker.width();
			$videoSeeker.bind(eMove, function (e) {
				var e0 = isTouch ? e.originalEvent.touches[0] : e;
				var pos = e0.pageX - $videoSeeker.offset().left;
				$videoSeekerPlay.css({
					width : pos
				});
				$videoObj.get(0).currentTime = pos * $videoObj.get(0).duration / $videoSeeker.width()
			})
		}).bind(eCancel, function () {
			$videoSeeker.unbind(eMove)
		});
		$videoSeekerBuffer.css({
			display : "block",
			position : "absolute",
			left : 0,
			top : 0,
			height : "100%",
			"background-color" : "#444"
		});
		$videoSeekerPlay.css({
			display : "block",
			position : "absolute",
			left : 0,
			top : 0,
			height : "100%",
			"background-color" : "#fcc500"
		});
		if (!isIPhone && ($videoObj.get(0).requestFullscreen || $videoObj.get(0).webkitRequestFullScreen || $videoObj.get(0).mozRequestFullScreen || $videoObj.get(0).webkitEnterFullScreen || $videoObj.get(0).msRequestFullscreen)) {
			var switchScreen = function (fullscreen) {
				if (fullscreen) {
					if ($videoObj.get(0).requestFullscreen)
						$videoObj.get(0).requestFullscreen();
					else if ($videoObj.get(0).webkitRequestFullScreen)
						$videoObj.get(0).webkitRequestFullScreen();
					else if ($videoObj.get(0).mozRequestFullScreen)
						$videoObj.get(0).mozRequestFullScreen();
					else if ($videoObj.get(0).webkitEnterFullScreen)
						$videoObj.get(0).webkitEnterFullScreen();
					if ($videoObj.get(0).msRequestFullscreen)
						$videoObj.get(0).msRequestFullscreen()
				} else if (document.cancelFullScreen)
					document.cancelFullScreen();
				else if (document.mozCancelFullScreen)
					document.mozCancelFullScreen();
				else if (document.webkitCancelFullScreen)
					document.webkitCancelFullScreen();
				else if (document.webkitExitFullscreen)
					document.webkitExitFullscreen();
				else if (document.msExitFullscreen)
					document.msExitFullscreen()
			};
			var switchScreenCSS = function (fullscreen) {
				$videoControls.css({
					position : fullscreen ? "fixed" : "absolute"
				});
				var backgroundPosY = $videoFullscreen.css("background-position") ? $videoFullscreen.css("background-position").split(" ")[1] : $videoFullscreen.css("background-position-y");
				$videoFullscreen.css({
					"background-position" : (fullscreen ? "right" : "left") + " " + backgroundPosY
				});
				$videoFullscreenBg.css({
					display : fullscreen ?
					"block" : "none"
				});
				if (fullscreen) {
					$(document).bind("mousemove", userActivate);
					$videoControls.css({
						"z-index" : 2147483647
					})
				} else {
					$(document).unbind("mousemove", userActivate);
					$videoControls.css({
						"z-index" : ""
					})
				}
			};
			document.addEventListener("fullscreenchange", function () {
				isFullscreen = document.fullscreen;
				switchScreenCSS(document.fullscreen)
			}, false);
			document.addEventListener("mozfullscreenchange", function () {
				isFullscreen = document.mozFullScreen;
				switchScreenCSS(document.mozFullScreen)
			}, false);
			document.addEventListener("webkitfullscreenchange",
				function () {
				isFullscreen = document.webkitIsFullScreen;
				switchScreenCSS(document.webkitIsFullScreen)
			}, false);
			$videoObj.get(0).addEventListener("webkitbeginfullscreen", function () {
				isFullscreen = true
			}, false);
			$videoObj.get(0).addEventListener("webkitendfullscreen", function () {
				isFullscreen = false
			}, false);
			$("head").append("<style type='text/css'>video::-webkit-media-controls { display:none !important; }</style>");
			var $videoFullscreen = $(".html5boxFullscreen", $videoControls);
			$videoFullscreen.css({
				display : "block",
				position : "relative",
				"float" : "right",
				width : BUTTON_SIZE + "px",
				height : BUTTON_SIZE + "px",
				margin : Math.floor((BAR_HEIGHT - BUTTON_SIZE) / 2),
				cursor : "pointer",
				"background-image" : "url('" + skinFolder + "html5boxplayer_fullscreen.png" + "')",
				"background-position" : "left top"
			}).hover(function () {
				var backgroundPosX = $(this).css("background-position") ? $(this).css("background-position").split(" ")[0] : $(this).css("background-position-x");
				$(this).css({
					"background-position" : backgroundPosX + " bottom"
				})
			}, function () {
				var backgroundPosX =
					$(this).css("background-position") ? $(this).css("background-position").split(" ")[0] : $(this).css("background-position-x");
				$(this).css({
					"background-position" : backgroundPosX + " top"
				})
			}).bind(eClick, function () {
				isFullscreen = !isFullscreen;
				switchScreen(isFullscreen)
			})
		}
		if (hd) {
			var $videoHD = $(".html5boxHD", $videoControls);
			$videoHD.css({
				display : "block",
				position : "relative",
				"float" : "right",
				width : BUTTON_SIZE + "px",
				height : BUTTON_SIZE + "px",
				margin : Math.floor((BAR_HEIGHT - BUTTON_SIZE) / 2),
				cursor : "pointer",
				"background-image" : "url('" +
				skinFolder + "html5boxplayer_hd.png" + "')",
				"background-position" : (isHd ? "right" : "left") + " center"
			}).bind(eClick, function () {
				isHd = !isHd;
				$(this).css({
					"background-position" : (isHd ? "right" : "left") + " center"
				});
				parentInst.isHd = isHd;
				var isPaused = $videoObj.get(0).isPaused;
				$videoObj.get(0).setAttribute("src", (isHd ? hd : src) + "#t=" + $videoObj.get(0).currentTime);
				if (!isPaused)
					$videoObj.get(0).play();
				else if (!isIPhone)
					$videoObj.get(0).pause()
			})
		}
		var volume = $videoObj.get(0).volume;
		$videoObj.get(0).volume = volume / 2 + 0.1;
		if ($videoObj.get(0).volume ===
			volume / 2 + 0.1) {
			$videoObj.get(0).volume = volume;
			var $videoVolume = $(".html5boxVolume", $videoControls);
			var $videoVolumeButton = $(".html5boxVolumeButton", $videoControls);
			var $videoVolumeBar = $(".html5boxVolumeBar", $videoControls);
			var $videoVolumeBarBg = $(".html5boxVolumeBarBg", $videoControls);
			var $videoVolumeBarActive = $(".html5boxVolumeBarActive", $videoControls);
			$videoVolume.css({
				display : "block",
				position : "relative",
				"float" : "right",
				width : BUTTON_SIZE + "px",
				height : BUTTON_SIZE + "px",
				margin : Math.floor((BAR_HEIGHT -
						BUTTON_SIZE) / 2)
			}).hover(function () {
				clearTimeout(hideVolumeBarTimeoutId);
				var volume = $videoObj.get(0).volume;
				$videoVolumeBarActive.css({
					height : Math.round(volume * 100) + "%"
				});
				$videoVolumeBar.show()
			}, function () {
				clearTimeout(hideVolumeBarTimeoutId);
				hideVolumeBarTimeoutId = setTimeout(function () {
						$videoVolumeBar.hide()
					}, 1E3)
			});
			$videoVolumeButton.css({
				display : "block",
				position : "absolute",
				top : 0,
				left : 0,
				width : BUTTON_SIZE + "px",
				height : BUTTON_SIZE + "px",
				cursor : "pointer",
				"background-image" : "url('" + skinFolder + "html5boxplayer_volume.png" +
				"')",
				"background-position" : "top left"
			}).hover(function () {
				var backgroundPosX = $(this).css("background-position") ? $(this).css("background-position").split(" ")[0] : $(this).css("background-position-x");
				$(this).css({
					"background-position" : backgroundPosX + " bottom"
				})
			}, function () {
				var backgroundPosX = $(this).css("background-position") ? $(this).css("background-position").split(" ")[0] : $(this).css("background-position-x");
				$(this).css({
					"background-position" : backgroundPosX + " top"
				})
			}).bind(eClick, function () {
				var volume =
					$videoObj.get(0).volume;
				if (volume > 0) {
					volumeSaved = volume;
					volume = 0
				} else
					volume = volumeSaved;
				var backgroundPosY = $(this).css("background-position") ? $(this).css("background-position").split(" ")[1] : $(this).css("background-position-y");
				$videoVolumeButton.css({
					"background-position" : (volume > 0 ? "left" : "right") + " " + backgroundPosY
				});
				$videoObj.get(0).volume = volume;
				$videoVolumeBarActive.css({
					height : Math.round(volume * 100) + "%"
				})
			});
			$videoVolumeBar.css({
				display : "none",
				position : "absolute",
				left : 4,
				bottom : "100%",
				width : 24,
				height : 80,
				"margin-bottom" : Math.floor((BAR_HEIGHT - BUTTON_SIZE) / 2),
				"background-color" : "#000000",
				opacity : 0.7,
				filter : "alpha(opacity=70)"
			});
			$videoVolumeBarBg.css({
				display : "block",
				position : "relative",
				width : 10,
				height : 68,
				margin : 7,
				cursor : "pointer",
				"background-color" : "#222"
			});
			$videoVolumeBarActive.css({
				display : "block",
				position : "absolute",
				bottom : 0,
				left : 0,
				width : "100%",
				height : "100%",
				"background-color" : "#fcc500"
			});
			$videoVolumeBarBg.bind(eStart, function (e) {
				var e0 = isTouch ? e.originalEvent.touches[0] : e;
				var vol = 1 - (e0.pageY -
						$videoVolumeBarBg.offset().top) / $videoVolumeBarBg.height();
				vol = vol > 1 ? 1 : vol < 0 ? 0 : vol;
				$videoVolumeBarActive.css({
					height : Math.round(vol * 100) + "%"
				});
				$videoVolumeButton.css({
					"background-position" : "left " + (vol > 0 ? "top" : "bottom")
				});
				$videoObj.get(0).volume = vol;
				$videoVolumeBarBg.bind(eMove, function (e) {
					var e0 = isTouch ? e.originalEvent.touches[0] : e;
					var vol = 1 - (e0.pageY - $videoVolumeBarBg.offset().top) / $videoVolumeBarBg.height();
					vol = vol > 1 ? 1 : vol < 0 ? 0 : vol;
					$videoVolumeBarActive.css({
						height : Math.round(vol * 100) + "%"
					});
					$videoVolumeButton.css({
						"background-position" : "left " +
						(vol > 0 ? "top" : "bottom")
					});
					$videoObj.get(0).volume = vol
				})
			}).bind(eCancel, function () {
				$videoVolumeBarBg.unbind(eMove)
			})
		}
		var calcTimeFormat = function (seconds) {
			var h0 = Math.floor(seconds / 3600);
			var h = h0 < 10 ? "0" + h0 : h0;
			var m0 = Math.floor((seconds - h0 * 60) / 60);
			var m = m0 < 10 ? "0" + m0 : m0;
			var s0 = Math.floor(seconds - (h0 * 3600 + m0 * 60));
			var s = s0 < 10 ? "0" + s0 : s0;
			var r = m + ":" + s;
			if (h0 > 0)
				r = h + ":" + r;
			return r
		};
		var onVideoPlay = function () {
			$videoPlay.hide();
			$videoBtnPlay.hide();
			$videoBtnPause.show()
		};
		var onVideoPause = function () {
			$videoControls.show();
			clearTimeout(hideControlsTimerId);
			$videoPlay.show();
			$videoBtnPlay.show();
			$videoBtnPause.hide()
		};
		var onVideoUpdate = function () {
			var curTime = $videoObj.get(0).currentTime;
			if (curTime) {
				$videoTimeCurrent.text(calcTimeFormat(curTime));
				var duration = $videoObj.get(0).duration;
				if (duration) {
					$videoTimeTotal.text(calcTimeFormat(duration));
					if (!sliderDragging) {
						var sliderW = $videoSeeker.width();
						var pos = Math.round(sliderW * curTime / duration);
						$videoSeekerPlay.css({
							width : pos
						});
						$videoSeekerHandler.css({
							left : pos
						})
					}
				}
			}
		};
		var onVideoProgress =
		function () {
			if ($videoObj.get(0).buffered && $videoObj.get(0).buffered.length > 0 && !isNaN($videoObj.get(0).buffered.end(0)) && !isNaN($videoObj.get(0).duration)) {
				var sliderW = $videoSeeker.width();
				$videoSeekerBuffer.css({
					width : Math.round(sliderW * $videoObj.get(0).buffered.end(0) / $videoObj.get(0).duration)
				})
			}
		};
		try {
			$videoObj.bind("play", onVideoPlay);
			$videoObj.bind("pause", onVideoPause);
			$videoObj.bind("ended", onVideoPause);
			$videoObj.bind("timeupdate", onVideoUpdate);
			$videoObj.bind("progress", onVideoProgress)
		} catch (e) {}

	}
})(jQuery);
function ASTimer(timeout, callback, updatecallback) {
	var updateinterval = 50;
	var updateTimerId = null;
	var runningTime = 0;
	var paused = false;
	var started = false;
	this.pause = function () {
		if (started) {
			paused = true;
			clearInterval(updateTimerId)
		}
	};
	this.resume = function () {
		if (started && paused) {
			paused = false;
			updateTimerId = setInterval(function () {
					runningTime += updateinterval;
					if (runningTime > timeout) {
						clearInterval(updateTimerId);
						if (callback)
							callback()
					}
					if (updatecallback)
						updatecallback(runningTime / timeout)
				}, updateinterval)
		}
	};
	this.stop =
	function () {
		clearInterval(updateTimerId);
		if (updatecallback)
			updatecallback(-1);
		runningTime = 0;
		paused = false;
		started = false
	};
	this.start = function () {
		runningTime = 0;
		paused = false;
		started = true;
		updateTimerId = setInterval(function () {
				runningTime += updateinterval;
				if (runningTime > timeout) {
					clearInterval(updateTimerId);
					if (callback)
						callback()
				}
				if (updatecallback)
					updatecallback(runningTime / timeout)
			}, updateinterval)
	}
}
var ACPlatforms = {
	flashInstalled : function () {
		var flashInstalled = false;
		try {
			if (new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))
				flashInstalled = true
		} catch (e) {
			if (navigator.mimeTypes["application/x-shockwave-flash"])
				flashInstalled = true
		}
		return flashInstalled
	},
	html5VideoSupported : function () {
		return !!document.createElement("video").canPlayType
	},
	isChrome : function () {
		return navigator.userAgent.match(/Chrome/i) != null
	},
	isFirefox : function () {
		return navigator.userAgent.match(/Firefox/i) != null
	},
	isOpera : function () {
		return navigator.userAgent.match(/Opera/i) !=
		null || navigator.userAgent.match(/OPR\//i) != null
	},
	isSafari : function () {
		return navigator.userAgent.match(/Safari/i) != null
	},
	isAndroid : function () {
		return navigator.userAgent.match(/Android/i) != null
	},
	isIPad : function () {
		return navigator.userAgent.match(/iPad/i) != null
	},
	isIPhone : function () {
		return navigator.userAgent.match(/iPod/i) != null || navigator.userAgent.match(/iPhone/i) != null
	},
	isIOS : function () {
		return this.isIPad() || this.isIPhone()
	},
	isIE9 : function () {
		return navigator.userAgent.match(/MSIE/i) != null && this.html5VideoSupported() &&
		!this.isOpera()
	},
	isIE8 : function () {
		return navigator.userAgent.match(/MSIE 8/i) != null && !this.isOpera()
	},
	isIE7 : function () {
		return navigator.userAgent.match(/MSIE 7/i) != null && !this.isOpera()
	},
	isIE6 : function () {
		return navigator.userAgent.match(/MSIE 6/i) != null && !this.isOpera()
	},
	isIE678 : function () {
		return this.isIE6() || this.isIE7() || this.isIE8()
	},
	isIE6789 : function () {
		return this.isIE6() || this.isIE7() || this.isIE8() || this.isIE9()
	},
	css33dTransformSupported : function () {
		return !this.isIE6() && !this.isIE7() && !this.isIE8() &&
		!this.isIE9() && !this.isOpera()
	},
	applyBrowserStyles : function (object, applyToValue) {
		var ret = {};
		for (var key in object) {
			ret[key] = object[key];
			ret["-webkit-" + key] = applyToValue ? "-webkit-" + object[key] : object[key];
			ret["-moz-" + key] = applyToValue ? "-moz-" + object[key] : object[key];
			ret["-ms-" + key] = applyToValue ? "-ms-" + object[key] : object[key];
			ret["-o-" + key] = applyToValue ? "-o-" + object[key] : object[key]
		}
		return ret
	}
};
(function ($) {
	$.fn.amazingcarousel = function (options) {
		var ELEM_ID = 0,
		ELEM_SRC = 1,
		ELEM_TITLE = 2,
		ELEM_DESCRIPTION = 3,
		ELEM_LINK = 4,
		ELEM_TARGET = 5,
		ELEM_VIDEO = 6,
		ELEM_THUMBNAIL = 7,
		ELEM_LIGHTBOX = 8,
		ELEM_LIGHTBOXWIDTH = 9,
		ELEM_LIGHTBOXHEIGHT = 10;
		var TYPE_IMAGE = 1,
		TYPE_SWF = 2,
		TYPE_MP3 = 3,
		TYPE_PDF = 4,
		TYPE_VIDEO_FLASH = 5,
		TYPE_VIDEO_MP4 = 6,
		TYPE_VIDEO_OGG = 7,
		TYPE_VIDEO_WEBM = 8,
		TYPE_VIDEO_YOUTUBE = 9,
		TYPE_VIDEO_VIMEO = 10;
		var AmazingCarousel = function (container, options, id) {
			this.container = container;
			this.options = options;
			this.id = id;
			this.transitionTimeout =
				null;
			this.arrowTimeout = null;
			$(".amazingcarousel-engine").css({
				display : "none"
			});
			this.lightboxArray = [];
			this.visibleItems = this.options.visibleitems;
			this.itemSize = this.options.width;
			this.currentItem = 0;
			this.elemLength = 0;
			this.elemTotalCount = 0;
			this.initData(this.init)
		};
		AmazingCarousel.prototype = {
			initData : function (onSuccess) {
				this.readTags();
				onSuccess(this)
			},
			readTags : function () {
				var items = $("li.amazingcarousel-item", this.container);
				this.elemLength = items.length;
				this.elemTotalCount = this.elemLength;
				var i;
				if (this.options.random) {
					for (i =
							this.elemLength - 1; i > 0; i--) {
						var index = Math.floor(Math.random() * i);
						items.eq(index).insertBefore(items.eq(i));
						items.eq(i).insertBefore(items.eq(index))
					}
					items = $("li.amazingcarousel-item", this.container)
				}
				if (this.elemLength > 1 && this.options.circular) {
					var cloneCount = Math.min(this.options.visibleitems * 2, this.elemLength);
					for (i = 0; i < cloneCount; i++)
						$("ul.amazingcarousel-list", this.container).append(items.eq(i).clone(true));
					this.elemTotalCount += cloneCount
				}
				$("ul.amazingcarousel-list", this.container).append("<div style='clear:both;'></div>")
			},
			init : function (instance) {
				if (instance.elemLength <= 0)
					return;
				instance.container.css({
					display : "block",
					direction : "ltr"
				});
				instance.isAnimating = false;
				instance.isPaused = !instance.options.autoplay;
				instance.tempPaused = false;
				instance.loopCount = 0;
				instance.createPlayVideo();
				instance.createHoverOverlay();
				instance.createStyle();
				instance.createNav();
				instance.createArrows();
				instance.createBackgroundImage();
				instance.createItemBackgroundImage();
				instance.createBottomShadow();
				instance.createItemBottomShadow();
				instance.createWatermark();
				instance.createSliderTimeout();
				instance.createGoogleFonts();
				instance.enableSwipe();
				var $img = $(".amazingcarousel-image", this.container).find("img");
				if ($img.length)
					$img.eq(0).one("load", function () {
						instance.resizeCarousel()
					}).each(function () {
						if (this.complete)
							$(this).load()
					});
				else
					instance.resizeCarousel();
				if (instance.options.responsive)
					$(window).resize(function () {
						instance.resizeCarousel();
						instance.resizeNav()
					});
				$(window).load(function () {
					instance.resizeCarousel();
					instance.resizeNav()
				});
				instance.resizeNav();
				var params = instance.getParams();
				var firstId = 0;
				if ("firstcarouselid" in params && params["firstcarouselid"] >= 0 && params["firstcarouselid"] < instance.elemLength)
					firstId = params["firstcarouselid"];
				instance.container.trigger("amazingcarousel.switch", [-1, firstId]);
				if (firstId > 0)
					instance.slideRun(firstId);
				instance.container.trigger("amazingcarousel.initsuccess");
				if (!instance.isPaused && !instance.tempPaused)
					instance.sliderTimeout.start()
			},
			getParams : function () {
				var result = {};
				var params = window.location.search.substring(1).split("&");
				for (var i = 0; i < params.length; i++) {
					var value = params[i].split("=");
					if (value && value.length == 2)
						result[value[0].toLowerCase()] = unescape(value[1])
				}
				return result
			},
			enableSwipe : function () {
				if (this.options.enabletouchswipe) {
					var instance = this;
					$(".amazingcarousel-list-container", this.container).touchSwipe({
						preventWebBrowser : false,
						swipeLeft : function () {
							instance.slideRun(-1)
						},
						swipeRight : function () {
							instance.slideRun(-2)
						}
					})
				}
			},
			createPlayVideo : function () {
				if (!this.options.showplayvideo)
					return;
				var instance = this;
				$(".amazingcarousel-image",
					this.container).each(function () {
					var $this = $(this);
					var isVideo = false;
					var isLightboxVideo = false;
					var videoUrl = "";
					var videoWebmUrl = "";
					$("img", $this).each(function () {
						if ($(this).data("video")) {
							videoUrl = $(this).data("video");
							if ($(this).data("videowebm"))
								videoWebmUrl = $(this).data("videowebm");
							isVideo = true;
							return false
						} else if ($(this).parent()[0].nodeName.toLowerCase() == "a")
							if ($(this).parent().hasClass("html5lightbox")) {
								var type = instance.checkVideoType($(this).parent().attr("href"));
								if (type == TYPE_VIDEO_YOUTUBE ||
									type == TYPE_VIDEO_VIMEO || type == TYPE_VIDEO_MP4 || type == TYPE_VIDEO_WEBM)
									isLightboxVideo = true
							}
					});
					if (isVideo || isLightboxVideo) {
						var pos = "center center";
						switch (instance.options.playvideoimagepos) {
						case "topleft":
							pos = "left top";
							break;
						case "topright":
							pos = "right top";
							break;
						case "bottomleft":
							pos = "left bottom";
							break;
						case "bottomright":
							pos = "right bottom";
							break
						}
						var $playVideo = $('<div class="amazingcarousel-play-video" style="position:absolute;left:0;top:0;width:100%;height:100%;cursor:pointer;' + "background-image:url('" +
								instance.options.skinsfolder + instance.options.playvideoimage + "');background-repeat:no-repeat;" + "background-position:" + pos + ';"></div>');
						$playVideo.appendTo($this);
						if (isVideo)
							$playVideo.click(function () {
								$this.find("img").css({
									visibility : "hidden"
								});
								instance.playVideo($(this), videoUrl, videoWebmUrl);
								$(this).unbind("click")
							});
						else {
							var $img = $("img", $this);
							$playVideo.click(function () {
								$img.click()
							})
						}
					}
				})
			},
			playVideo : function ($videoDiv, videoUrl, videoWebmUrl) {
				if (videoUrl.length <= 0)
					return;
				this.sliderTimeout.stop();
				this.tempPaused = true;
				var type = this.checkVideoType(videoUrl);
				if (type == TYPE_VIDEO_YOUTUBE)
					this.playYoutubeVideo(videoUrl, $videoDiv);
				else if (type == TYPE_VIDEO_VIMEO)
					this.playVimeoVideo(videoUrl, $videoDiv);
				else if (type == TYPE_VIDEO_MP4)
					this.playMp4Video(videoUrl, videoWebmUrl, true, $videoDiv)
			},
			playMp4Video : function (href, webmhref, autoplay, $videoWrapper) {
				var isHTML5 = true;
				if (ACPlatforms.isIE6789())
					isHTML5 = false;
				else if ((ACPlatforms.isFirefox() || ACPlatforms.isOpera()) && !webmhref)
					isHTML5 = false;
				if (isHTML5) {
					var videoSrc =
						ACPlatforms.isFirefox() || ACPlatforms.isOpera() ? webmhref : href;
					this.embedHTML5Video($videoWrapper, videoSrc, autoplay)
				} else {
					var videoFile = href;
					if (videoFile.charAt(0) != "/" && videoFile.substring(0, 5) != "http:" && videoFile.substring(0, 6) != "https:")
						videoFile = this.options.htmlfolder + videoFile;
					this.embedFlash($videoWrapper, "100%", "100%", this.options.jsfolder + "html5boxplayer.swf", "transparent", {
						width : "100%",
						height : "100%",
						videofile : videoFile,
						hdfile : "",
						ishd : "0",
						autoplay : autoplay ? "1" : "0",
						errorcss : ".amazingcarousel-error" +
						this.options.errorcss,
						id : this.id
					})
				}
			},
			embedHTML5Video : function ($container, src, autoPlay) {
				$container.html("<div class='amazingcarousel-video-container-" + this.id + "' style='position:relative;display:block;width:100%;height:100%;'><video style='width:100%;height:100%;' controls ></div>");
				$("video", $container).get(0).setAttribute("src", src);
				if (autoPlay)
					$("video", $container).get(0).play()
			},
			embedFlash : function ($container, w, h, src, wmode, flashVars) {
				if (ACPlatforms.flashInstalled()) {
					var htmlOptions = {
						pluginspage : "http://www.adobe.com/go/getflashplayer",
						quality : "high",
						allowFullScreen : "true",
						allowScriptAccess : "always",
						type : "application/x-shockwave-flash"
					};
					htmlOptions.width = w;
					htmlOptions.height = h;
					htmlOptions.src = src;
					htmlOptions.wmode = wmode;
					htmlOptions.flashVars = $.param(flashVars);
					var htmlString = "";
					for (var key in htmlOptions)
						htmlString += key + "=" + htmlOptions[key] + " ";
					$container.html("<embed " + htmlString + "/>")
				} else
					$container.html("<div class='amazingcarousel-video-error' style='display:block;position:absolute;text-align:center;width:100%;height:100%;left:0px;top:0px;'><div>The required Adobe Flash Player plugin is not installed</div><br /><div style='display:block;position:relative;text-align:center;width:112px;height:33px;margin:0px auto;'><a href='http://www.adobe.com/go/getflashplayer'><img src='http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player' width='112' height='33'></img></a></div>")
			},
			playYoutubeVideo : function (href, $videoWrapper) {
				if (this.options.previewmode) {
					$videoWrapper.html("<div class='amazingcarousel-video-error' style='display:block;position:absolute;left:0;top:0;width:100%;height:100%;color:#fff;background-color:#333;'>To view YouTube video, publish the carousel then open it in your web browser</div>");
					return
				} else {
					var src = href + (href.indexOf("?") < 0 ? "?" : "&") + "autoplay=1&wmode=transparent&rel=0&autohide=1";
					$videoWrapper.html("<iframe width='100%' height='100%' src='" + src + "' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>")
				}
			},
			playVimeoVideo : function (href, $videoWrapper) {
				if (this.options.previewmode) {
					$videoWrapper.html("<div class='amazingcarousel-video-error' style='display:block;position:absolute;left:0;top:0;width:100%;height:100%;color:#fff;background-color:#333;'>To view Vimeo video, publish the carousel then open it in your web browser</div>");
					return
				} else {
					var src = href + (href.indexOf("?") < 0 ? "?" : "&") + "autoplay=1&api=1";
					$videoWrapper.html("<iframe width='100%' height='100%' src='" + src + "' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>")
				}
			},
			checkVideoType : function (href) {
				if (!href)
					return -1;
				if (href.match(/\.(flv)(.*)?$/i))
					return TYPE_VIDEO_FLASH;
				if (href.match(/\.(mp4|m4v)(.*)?$/i))
					return TYPE_VIDEO_MP4;
				if (href.match(/\.(ogv|ogg)(.*)?$/i))
					return TYPE_VIDEO_OGG;
				if (href.match(/\.(webm)(.*)?$/i))
					return TYPE_VIDEO_WEBM;
				if (href.match(/\:\/\/.*(youtube\.com)/i) || href.match(/\:\/\/.*(youtu\.be)/i))
					return TYPE_VIDEO_YOUTUBE;
				if (href.match(/\:\/\/.*(vimeo\.com)/i))
					return TYPE_VIDEO_VIMEO;
				return 0
			},
			createHoverOverlay : function () {
				if (!this.options.showhoveroverlay)
					return;
				var instance = this;
				$(".amazingcarousel-image", this.container).each(function () {
					var $this = $(this);
					var isLightbox = false;
					var isLink = false;
					$("img", $this).each(function () {
						if ($(this).parent()[0].nodeName.toLowerCase() == "a") {
							isLink = true;
							if ($(this).parent().hasClass("html5lightbox")) {
								isLightbox = true;
								return false
							}
						}
					});
					if (isLightbox || isLink && instance.options.showhoveroverlayalways) {
						var $hoverImage = $('<div class="amazingcarousel-hover-effect" style="display:none;position:absolute;left:0;top:0;width:100%;height:100%;cursor:pointer;' +
								"background-image:url('" + instance.options.hoveroverlayimage + "');background-repeat:no-repeat;" + 'background-position:center center;"></div>');
						$hoverImage.appendTo($this);
						var $img = $("img", $this);
						$hoverImage.click(function () {
							$img.click()
						});
						$(this).hover(function () {
							if (ACPlatforms.isIE678())
								$hoverImage.show();
							else
								$hoverImage.fadeIn()
						}, function () {
							if (ACPlatforms.isIE678())
								$hoverImage.hide();
							else
								$hoverImage.fadeOut()
						})
					}
				})
			},
			createStyle : function () {
				$("ul.amazingcarousel-list", this.container).wrap('<div class="amazingcarousel-list-wrapper"></div>');
				$("ul.amazingcarousel-list", this.container).css({
					display : "block",
					position : "relative",
					"list-style-type" : "none",
					"list-style-image" : "none",
					"background-image" : "none",
					"background-color" : "transparent",
					padding : 0,
					margin : 0
				});
				$("li.amazingcarousel-item", this.container).css({
					display : "block",
					position : "relative",
					"background-image" : "none",
					"background-color" : "transparent",
					margin : 0,
					padding : 0,
					"float" : this.options.direction == "horizontal" ? "left" : "top"
				});
				var m = 0;
				if (this.options.spacing > 0)
					if (this.options.direction == "horizontal") {
						var s =
							Math.min(this.options.spacing / 2);
						m = "0 " + s + "px"
					} else
						m = "0 0 " + this.options.spacing + "px 0";
				var itemCss = {};
				itemCss["position"] = "relative";
				itemCss["margin"] = m;
				$("div.amazingcarousel-item-container", this.container).css(itemCss);
				var listCss = {};
				listCss["position"] = "relative";
				listCss["margin"] = "0 auto";
				listCss["overflow"] = "visible";
				$("div.amazingcarousel-list-container", this.container).css(listCss);
				var wrapperCss = {};
				wrapperCss["overflow"] = "hidden";
				if (this.options.direction == "vertical")
					wrapperCss["height"] =
						"100%";
				$("div.amazingcarousel-list-wrapper", this.container).css(wrapperCss)
			},
			hideVideo : function (start) {
				var instance = this;
				var index = 0;
				$("li.amazingcarousel-item", this.container).each(function () {
					if (index < start || index >= start + instance.visibleItems)
						$(".amazingcarousel-play-video", $(this)).empty();
					index++
				})
			},
			resizeCarousel : function () {
				this.visibleItems = this.options.visibleitems;
				this.itemSize = this.options.width;
				if (this.options.responsive)
					if (this.options.direction == "horizontal") {
						var conWidth;
						if (this.options.usescreenquery) {
							conWidth =
								$(".amazingcarousel-list-container", this.container).width();
							if (conWidth > 0) {
								var screenWidth = $(window).width();
								for (var i in this.options.screenquery)
									if (screenWidth < this.options.screenquery[i].screenwidth)
										this.visibleItems = this.options.screenquery[i].visibleitems;
								this.itemSize = Math.round(conWidth / this.visibleItems);
								$(".amazingcarousel-list-wrapper", this.container).width(conWidth)
							}
						} else {
							conWidth = this.container.width();
							if (conWidth > 0) {
								this.visibleItems = Math.floor(conWidth / this.options.width);
								if (this.visibleItems <
									1) {
									this.visibleItems = 1;
									this.itemSize = conWidth
								} else
									this.itemSize = this.options.width;
								$(".amazingcarousel-list-container", this.container).width(this.visibleItems * this.itemSize);
								$(".amazingcarousel-list-wrapper", this.container).width(this.visibleItems * this.itemSize)
							}
						}
					} else {
						var itemWidth = $(".amazingcarousel-list-container", this.container).width();
						if (itemWidth > 0) {
							this.itemSize = itemWidth;
							$(".amazingcarousel-list-wrapper", this.container).width(itemWidth)
						}
					}
				$("li.amazingcarousel-item", this.container).css({
					width : this.itemSize +
					"px"
				});
				if (this.options.direction == "vertical")
					this.itemSize = $("li.amazingcarousel-item", this.container).height();
				var sizeProp = this.options.direction == "horizontal" ? "width" : "height";
				$("ul.amazingcarousel-list", this.container).css(sizeProp, this.itemSize * (this.options.circular ? this.elemTotalCount : this.elemLength) + "px");
				var cssProp = this.options.direction == "horizontal" ? "margin-left" : "margin-top";
				var itemSize = this.options.direction == "horizontal" ? this.itemSize : this.itemHeight;
				var pos = -itemSize * this.currentItem;
				$("ul.amazingcarousel-list", this.container).css(cssProp, pos + "px");
				if (this.options.direction == "vertical")
					$("div.amazingcarousel-list-container", this.container).css({
						height : String(this.itemSize * this.visibleItems + this.options.spacing * (this.visibleItems - 1)) + "px"
					});
				this.hideVideo(this.currentItem);
				this.hideArrows()
			},
			createGoogleFonts : function () {
				if (this.options.previewmode)
					return;
				if (this.options.addgooglefonts && this.options.googlefonts && this.options.googlefonts.length > 0) {
					var fontRef = ("https:" == document.location.protocol ?
						"https" : "http") + "://fonts.googleapis.com/css?family=" + this.options.googlefonts;
					var fontLink = document.createElement("link");
					fontLink.setAttribute("rel", "stylesheet");
					fontLink.setAttribute("type", "text/css");
					fontLink.setAttribute("href", fontRef);
					document.getElementsByTagName("head")[0].appendChild(fontLink)
				}
			},
			createWatermark : function () {
				if (!this.options.showwatermark)
					return;
				if (this.options.watermarkstyle == "text" && this.options.watermarktext.length <= 0)
					return;
				if (this.options.watermarkstyle == "image" && this.options.watermarkimage.length <=
					0)
					return;
				var wmCode = "<div style='" + this.options.watermarkpositioncss;
				if (this.options.watermarkstyle == "text")
					wmCode += this.options.watermarktextcss;
				if (this.options.watermarklink)
					wmCode += "cursor:pointer;";
				wmCode += "'>";
				if (this.options.watermarklink) {
					wmCode += "<a href='" + this.options.watermarklink + "' style='" + this.options.watermarklinkcss + "'";
					if (this.options.watermarktarget)
						wmCode += " target='" + this.options.watermarktarget + "'";
					wmCode += ">"
				}
				if (this.options.watermarkstyle == "text")
					wmCode += this.options.watermarktext;
				else if (this.options.watermarkstyle == "image")
					wmCode += "<img src='" + this.options.skinsfolder + this.options.watermarkimage + "' style='border:none;' />";
				if (this.options.watermarklink)
					wmCode += "</a>";
				wmCode += "</div>";
				for (var i = 0; i < $(".amazingcarousel-image", this.container).length; i++) {
					if (this.options.versionmark != "AMC" + "om" && i % 2 != 0)
						continue;
					$(".amazingcarousel-image", this.container).eq(i).append($(wmCode))
				}
			},
			createSliderTimeout : function () {
				var instance = this;
				this.sliderTimeout = new ASTimer(this.options.interval,
						function () {
						instance.slideRun(-1)
					}, null);
				if (instance.options.pauseonmouseover)
					this.container.hover(function () {
						if (!instance.isPaused)
							instance.sliderTimeout.pause()
					}, function () {
						if (!instance.isPaused)
							instance.sliderTimeout.resume()
					})
			},
			createItemBottomShadow : function () {
				if (!this.options.showitembottomshadow)
					return;
				var l = (100 - this.options.itembottomshadowimagewidth) / 2;
				var shadow = "<div class='amazingcarousel-item-bottom-shadow' " + "style='display:block;position:absolute;left:" + l + "%;top:" + this.options.itembottomshadowimagetop +
					"%;" + "width:" + this.options.itembottomshadowimagewidth + "%;height:auto;'>" + "<img src='" + this.options.skinsfolder + this.options.itembottomshadowimage + "' style='display:block;position:relative;width:100%;height:auto;" + "border:0;box-shadow:none;-moz-box-shadow:none;-webkit-box-shadow:none;border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;" + "' />" + "</div>";
				$("li.amazingcarousel-item", this.container).prepend(shadow)
			},
			createBottomShadow : function () {
				if (!this.options.showbottomshadow)
					return;
				var l =
					(100 - this.options.bottomshadowimagewidth) / 2;
				var shadow = "<div class='amazingcarousel-bottom-shadow' " + "style='display:block;position:absolute;left:" + l + "%;top:" + this.options.bottomshadowimagetop + "%;" + "width:" + this.options.bottomshadowimagewidth + "%;height:auto;'>" + "<img src='" + this.options.skinsfolder + this.options.bottomshadowimage + "' style='display:block;position:relative;width:100%;height:auto;" + "border:0;box-shadow:none;-moz-box-shadow:none;-webkit-box-shadow:none;border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;" +
					"' />" + "</div>";
				$(".amazingcarousel-list-container", this.container).prepend(shadow)
			},
			createItemBackgroundImage : function () {
				if (!this.options.showitembackgroundimage || !this.options.itembackgroundimage)
					return;
				var l = (100 - this.options.itembackgroundimagewidth) / 2;
				var background = "<div class='amazingcarousel-background-image' " + "style='display:block;position:absolute;left:" + l + "%;top:" + this.options.itembackgroundimagetop + "%;width:" + this.options.itembackgroundimagewidth + "%;height:auto;'>" + "<img src='" + this.options.skinsfolder +
					this.options.itembackgroundimage + "' style='display:block;position:relative;width:100%;height:auto;" + "border:0;box-shadow:none;-moz-box-shadow:none;-webkit-box-shadow:none;border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;" + "' />" + "</div>";
				$("li.amazingcarousel-item", this.container).prepend(background)
			},
			createBackgroundImage : function () {
				if (!this.options.showbackgroundimage || !this.options.backgroundimage)
					return;
				var l = (100 - this.options.backgroundimagewidth) / 2;
				var background = "<div class='amazingcarousel-background-image' " +
					"style='display:block;position:absolute;left:" + l + "%;top:" + this.options.backgroundimagetop + "%;width:" + this.options.backgroundimagewidth + "%;height:auto;'>" + "<img src='" + this.options.skinsfolder + this.options.backgroundimage + "' style='display:block;position:relative;width:100%;height:auto;" + "border:0;box-shadow:none;-moz-box-shadow:none;-webkit-box-shadow:none;border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;" + "' />" + "</div>";
				this.container.prepend(background)
			},
			createArrows : function () {
				if (this.options.arrowstyle ==
					"none")
					return;
				var instance = this;
				var $prevArrow = $(".amazingcarousel-prev", this.container);
				var $nextArrow = $(".amazingcarousel-next", this.container);
				$prevArrow.css({
					overflow : "hidden",
					position : "absolute",
					cursor : "pointer",
					width : this.options.arrowwidth + "px",
					height : this.options.arrowheight + "px",
					background : "url('" + this.options.arrowimage + "') no-repeat left top"
				});
				if (ACPlatforms.isIE678())
					$prevArrow.css({
						opacity : "inherit",
						filter : "inherit"
					});
				$nextArrow.css({
					overflow : "hidden",
					position : "absolute",
					cursor : "pointer",
					width : this.options.arrowwidth + "px",
					height : this.options.arrowheight + "px",
					background : "url('" + this.options.arrowimage + "') no-repeat right top"
				});
				if (ACPlatforms.isIE678())
					$nextArrow.css({
						opacity : "inherit",
						filter : "inherit"
					});
				$prevArrow.hover(function () {
					$(this).css({
						"background-position" : "left bottom"
					})
				}, function () {
					$(this).css({
						"background-position" : "left top"
					})
				});
				$nextArrow.hover(function () {
					$(this).css({
						"background-position" : "right bottom"
					})
				}, function () {
					$(this).css({
						"background-position" : "right top"
					})
				});
				if (this.options.arrowstyle == "always") {
					$prevArrow.css({
						display : "block"
					});
					$nextArrow.css({
						display : "block"
					})
				} else {
					$prevArrow.css({
						display : "none"
					});
					$nextArrow.css({
						display : "none"
					});
					this.container.hover(function () {
						clearTimeout(instance.arrowTimeout);
						if (instance.options.circular || instance.currentItem > 0)
							if (ACPlatforms.isIE678())
								$prevArrow.show();
							else
								$prevArrow.fadeIn();
						if (instance.options.circular || instance.currentItem < instance.elemLength - instance.visibleItems)
							if (ACPlatforms.isIE678())
								$nextArrow.show();
							else
								$nextArrow.fadeIn()
					}, function () {
						instance.arrowTimeout = setTimeout(function () {
								if (ACPlatforms.isIE678()) {
									$prevArrow.hide();
									$nextArrow.hide()
								} else {
									$prevArrow.fadeOut();
									$nextArrow.fadeOut()
								}
							}, instance.options.arrowhideonmouseleave)
					})
				}
				$prevArrow.click(function () {
					instance.slideRun(-2)
				});
				$nextArrow.click(function () {
					instance.slideRun(-1)
				})
			},
			hideArrows : function () {
				var $prevArrow = $(".amazingcarousel-prev", this.container);
				var $nextArrow = $(".amazingcarousel-next", this.container);
				if (!this.options.circular &&
					this.currentItem <= 0)
					$prevArrow.hide();
				else if (this.options.arrowstyle == "always")
					$prevArrow.show();
				if (!this.options.circular && this.currentItem >= this.elemLength - this.visibleItems)
					$nextArrow.hide();
				else if (this.options.arrowstyle == "always")
					$nextArrow.show()
			},
			createNav : function () {
				if (this.options.navstyle == "none")
					return;
				var $nav = $(".amazingcarousel-nav", this.container);
				var $bulletWrapper = $("<div class='amazingcarousel-bullet-wrapper'></div>");
				$bulletWrapper.appendTo($nav);
				var $bulletList = $("<div class='amazingcarousel-bullet-list'></div>");
				$bulletList.appendTo($bulletWrapper);
				var bulletSize = this.options.navdirection == "vertical" ? this.options.navwidth : this.options.navheight;
				var len = this.elemLength * bulletSize + (this.elemLength - 1) * this.options.navspacing;
				if (this.options.navdirection == "vertical") {
					$bulletWrapper.css({
						height : len + "px",
						width : "auto"
					});
					$bulletList.css({
						height : len + "px",
						width : "auto"
					})
				} else {
					$bulletWrapper.css({
						width : len + "px",
						height : "auto"
					});
					$bulletList.css({
						width : len + "px",
						height : "auto"
					})
				}
				var $bullet;
				for (var i = 0; i < this.elemLength; i++) {
					$bullet =
						this.createNavBullet(i);
					$bulletList.append($bullet)
				}
				var instance = this;
				this.container.bind("amazingcarousel.switch", function (event, prev, cur) {
					for (var i = 0; i < instance.elemLength; i++)
						$(".amazingcarousel-bullet-" + i, instance.container)["bulletNormal" + instance.id]();
					if (cur >= 0) {
						if (instance.options.navmode == "page")
							cur = Math.floor(cur / instance.visibleItems);
						$(".amazingcarousel-bullet-" + cur, instance.container)["bulletSelected" + instance.id]()
					}
				})
			},
			createNavBullet : function (index) {
				var f = this.options.navdirection ==
					"vertical" ? "top" : "left";
				var marginF = this.options.navdirection == "vertical" ? "bottom" : "right";
				var spacing = index == this.elemLength - 1 ? 0 : this.options.navspacing;
				var w = this.options.navwidth;
				var h = this.options.navheight;
				var $bullet = $("<div class='amazingcarousel-bullet-" + index + "' style='position:relative;float:" + f + ";margin-" + marginF + ":" + spacing + "px;width:" + w + "px;height:" + h + "px;cursor:pointer;'></div>");
				$bullet.data("index", index);
				var instance = this;
				$bullet.hover(function () {
					var bulletIndex = $(this).data("index");
					if (bulletIndex != instance.currentItem)
						$(this)["bulletHighlight" + instance.id]();
					if (instance.options.navswitchonmouseover) {
						if (instance.options.navmode == "page")
							bulletIndex = instance.visibleItems * bulletIndex;
						instance.slideRun(bulletIndex)
					}
				}, function () {
					var cur = instance.currentItem;
					if (instance.options.navmode == "page")
						cur = Math.floor(cur / instance.visibleItems);
					if ($(this).data("index") != cur)
						$(this)["bulletNormal" + instance.id]()
				});
				$bullet.click(function () {
					var bulletIndex = $(this).data("index");
					if (instance.options.navmode ==
						"page")
						bulletIndex = instance.visibleItems * bulletIndex;
					instance.slideRun(bulletIndex)
				});
				$bullet.css({
					background : "url('" + this.options.navimage + "') no-repeat left top"
				});
				$.fn["bulletNormal" + this.id] = function () {
					$(this).css({
						"background-position" : "left top"
					})
				};
				$.fn["bulletHighlight" + this.id] = $.fn["bulletSelected" + this.id] = function () {
					$(this).css({
						"background-position" : "left bottom"
					})
				};
				return $bullet
			},
			resizeNav : function () {
				if (this.options.navstyle == "none" || this.options.navmode == "item")
					return;
				var page = Math.ceil(this.elemLength /
						this.visibleItems);
				var i;
				for (i = 0; i < page; i++)
					$(".amazingcarousel-bullet-" + i, this.container).css({
						display : "block"
					});
				for (i = page; i < this.elemLength; i++)
					$(".amazingcarousel-bullet-" + i, this.container).css({
						display : "none"
					});
				var curPage = Math.floor(this.currentItem / this.visibleItems);
				for (i = 0; i < this.elemLength; i++)
					$(".amazingcarousel-bullet-" + i, this.container)["bulletNormal" + this.id];
				$(".amazingcarousel-bullet-" + curPage, this.container)["bulletHighlight" + this.id];
				var bulletSize = this.options.navdirection == "vertical" ?
					this.options.navwidth : this.options.navheight;
				var len = page * bulletSize + (page - 1) * this.options.navspacing;
				if (this.options.navdirection == "vertical")
					$(".amazingcarousel-bullet-wrapper", this.container).css({
						height : len + "px",
						width : "auto"
					});
				else
					$(".amazingcarousel-bullet-wrapper", this.container).css({
						width : len + "px",
						height : "auto"
					})
			},
			slideRun : function (index) {
				if (this.isAnimating)
					return;
				if (index == this.currentItem || index < -2 || index >= this.elemLength)
					return;
				var scrollItems;
				if (index >= 0)
					scrollItems = 1;
				else {
					scrollItems =
						this.visibleItems;
					if (this.options.scrollmode == "item")
						if (scrollItems > this.options.scrollitems)
							scrollItems = this.options.scrollitems
				}
				var nextItem,
				dir;
				if (index == -2) {
					dir = -1;
					nextItem = this.currentItem - scrollItems
				} else if (index == -1) {
					dir = 1;
					nextItem = this.currentItem + scrollItems
				} else {
					dir = index > this.currentItem ? 1 : -1;
					nextItem = index
				}
				if (dir < 0) {
					if (nextItem < 0)
						nextItem = this.options.circular ? this.elemLength + nextItem : 0
				} else if (this.options.circular) {
					if (nextItem >= this.elemLength)
						nextItem = nextItem - this.elemLength
				} else if (nextItem >
					this.elemLength - this.visibleItems)
					nextItem = this.elemLength - this.visibleItems;
				if (nextItem == this.currentItem)
					return;
				this.isAnimating = true;
				this.sliderTimeout.stop();
				this.tempPaused = false;
				var animCss = this.options.direction == "horizontal" ? "margin-left" : "margin-top";
				var animItemSize = this.itemSize;
				if (this.options.direction == "vertical")
					animItemSize += this.options.spacing;
				var animInitPos = animItemSize * this.currentItem;
				var animTargetPos = animItemSize * nextItem;
				var showStart = nextItem;
				if (this.options.circular)
					if (dir <
						0) {
						if (nextItem > this.currentItem)
							animInitPos = animItemSize * (this.elemLength + this.currentItem)
					} else if (nextItem > this.elemLength - scrollItems && this.elemLength < 2 * scrollItems)
						animInitPos = animItemSize * (nextItem - scrollItems);
					else if (nextItem < this.currentItem) {
						animTargetPos = animItemSize * (this.elemLength + nextItem);
						showStart = this.elemLength + nextItem
					}
				animInitPos = -animInitPos;
				animTargetPos = -animTargetPos;
				$("ul.amazingcarousel-list", this.container).css(animCss, animInitPos + "px");
				var animProp = {};
				animProp[animCss] =
					animTargetPos + "px";
				this.container.trigger("amazingcarousel.switch", [this.currentItem, nextItem]);
				var prevItem = this.currentItem;
				this.currentItem = nextItem;
				this.container.trigger("amazingcarousel.switch", [prevItem, nextItem]);
				this.hideVideo(showStart);
				this.hideArrows();
				var instance = this;
				$("ul.amazingcarousel-list", this.container).animate(animProp, this.options.transitionduration, this.options.transitioneasing, function () {
					instance.isAnimating = false;
					if (instance.options.loop > 0)
						if (instance.currentItem + instance.visibleItems >=
							instance.elemLength) {
							instance.loopCount++;
							if (instance.options.loop <= instance.loopCount)
								instance.isPaused = true
						}
					if (!instance.isPaused && !instance.tempPaused)
						instance.sliderTimeout.start()
				})
			}
		};
		options = options || {};
		for (var key in options)
			if (key.toLowerCase() !== key) {
				options[key.toLowerCase()] = options[key];
				delete options[key]
			}
		this.each(function () {
			this.options = $.extend({}, options);
			if ($(this).data("skin") && typeof AMAZINGCAROUSEL_SKIN_OPTIONS !== "undefined")
				if ($(this).data("skin")in AMAZINGCAROUSEL_SKIN_OPTIONS)
					this.options =
						$.extend({}, AMAZINGCAROUSEL_SKIN_OPTIONS[$(this).data("skin")], this.options);
			var instance = this;
			$.each($(this).data(), function (key, value) {
				instance.options[key.toLowerCase()] = value
			});
			var searchoptions = {};
			var searchstring = window.location.search.substring(1).split("&");
			for (var i = 0; i < searchstring.length; i++) {
				var keyvalue = searchstring[i].split("=");
				if (keyvalue && keyvalue.length == 2) {
					var key = keyvalue[0].toLowerCase();
					var value = unescape(keyvalue[1]).toLowerCase();
					if (value == "true")
						searchoptions[key] = true;
					else if (value ==
						"false")
						searchoptions[key] = false;
					else
						searchoptions[key] = value
				}
			}
			this.options = $.extend(this.options, searchoptions);
			var defaultOptions = {
				watermarklinkdefault : "http://amazingcarousel.com",
				watermarktargetdefault : "_blank",
				previewmode : false,
				direction : "horizontal",
				autoplay : false,
				pauseonmouseover : true,
				interval : 3E3,
				loop : 0,
				random : true,
				circular : true,
				scrollmode : "page",
				scrollitems : 1,
				skinsfoldername : "skins",
				showplayvideo : false,
				playvideoimage : "playvideo-64-64-0.png",
				playvideoimagepos : "center",
				showhoveroverlay : true,
				hoveroverlayimage : "hoveroverlay-64-64-0.png",
				showhoveroverlayalways : false,
				enabletouchswipe : true,
				responsive : false,
				usescreenquery : true,
				spacing : 24,
				showbackgroundimage : false,
				backgroundimage : "background.png",
				backgroundimagewidth : 110,
				backgroundimagetop : -40,
				showitembackgroundimage : false,
				itembackgroundimage : "background.png",
				itembackgroundimagewidth : 150,
				itembackgroundimagetop : 0,
				showbottomshadow : false,
				bottomshadowimage : "bottomshadow.png",
				bottomshadowimagewidth : 110,
				bottomshadowimagetop : 95,
				showitembottomshadow : false,
				itembottomshadowimage : "bottomshadow.png",
				itembottomshadowimagewidth : 110,
				itembottomshadowimagetop : 100,
				arrowstyle : "always",
				arrowimage : "arrows.png",
				arrowwidth : 48,
				arrowheight : 48,
				arrowhideonmouseleave : 1E3,
				navdirection : "horizontal",
				navstyle : "bullets",
				navmode : "page",
				navswitchonmouseover : false,
				navwidth : 16,
				navheight : 16,
				navspacing : 8,
				navimage : "bullet.png",
				transitionduration : 1E3,
				transitioneasing : "easeOutQuad",
				versionmark : "AMFree",
				showwdefault : false,
				wstyledefault : "text",
				wtextdefault : "65,109,97,122,105,110,103,32,67,97,114,111,117,115,101,108,32,70,114,101,101,32,86,101,114,115,105,111,110",
				wimagedefault : "",
				wpositioncssdefault : "display:block;position:absolute;bottom:8px;right:8px;",
				wtextcssdefault : "font:12px Arial,Tahoma,Helvetica,sans-serif;color:#666;padding:2px 4px;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;background-color:#fff;opacity:0.9;filter:alpha(opacity=90);",
				wlinkcssdefault : "text-decoration:none;font:12px Arial,Tahoma,Helvetica,sans-serif;color:#333;"
			};
			this.options = $.extend(defaultOptions, this.options);
			var i;
			var l;
			var mark = "";
			var bytes = this.options.wtextdefault.split(",");
			for (i = 0; i < bytes.length; i++)
				mark += String.fromCharCode(bytes[i]);
			this.options.fvm = mark;
			var d0 = "ammaagziicngcarouselh.iclolms";
			for (i = 1; i <= 5; i++)
				d0 = d0.slice(0, i) + d0.slice(i + 1);
			l = d0.length;
			for (i = 0; i < 5; i++)
				d0 = d0.slice(0, l - 9 + i) + d0.slice(l - 8 + i);
			if (this.options.versionmark != "AMC" + "om") {
				this.options.showwatermark = window.location.href.indexOf(d0) >= 0 ? false : this.options.showwdefault;
				this.options.watermarkstyle = this.options.wstyledefault;
				this.options.watermarktext = this.options.fvm;
				this.options.watermarkimage = this.options.wimagedefault;
				this.options.watermarklink = this.options.watermarklinkdefault;
				this.options.watermarktarget = this.options.watermarktargetdefault;
				this.options.watermarkpositioncss = this.options.wpositioncssdefault;
				this.options.watermarktextcss = this.options.wtextcssdefault;
				this.options.watermarklinkcss = this.options.wlinkcssdefault
			}
			if (typeof amazingcarousel_previewmode != "undefined")
				this.options.previewmode = amazingcarousel_previewmode;
			this.options.htmlfolder = window.location.href.substr(0, window.location.href.lastIndexOf("/") +
					1);
			if (this.options.skinsfoldername.length > 0)
				this.options.skinsfolder = this.options.jsfolder + this.options.skinsfoldername + "/";
			else
				this.options.skinsfolder = this.options.jsfolder;
			if (this.options.arrowimage.substring(0, 7).toLowerCase() != "http://" && this.options.arrowimage.substring(0, 8).toLowerCase() != "https://")
				this.options.arrowimage = this.options.skinsfolder + this.options.arrowimage;
			if (this.options.navimage.substring(0, 7).toLowerCase() != "http://" && this.options.navimage.substring(0, 8).toLowerCase() != "https://")
				this.options.navimage =
					this.options.skinsfolder + this.options.navimage;
			if (this.options.hoveroverlayimage.substring(0, 7).toLowerCase() != "http://" && this.options.hoveroverlayimage.substring(0, 8).toLowerCase() != "https://")
				this.options.hoveroverlayimage = this.options.skinsfolder + this.options.hoveroverlayimage;
			var carouselid;
			if ("carouselid" in this.options)
				carouselid = this.options.carouselid;
			else {
				carouselid = amazingcarouselId;
				amazingcarouselId++
			}
			var object = new AmazingCarousel($(this), this.options, carouselid);
			$(this).data("object",
				object);
			$(this).data("id", carouselid);
			amazingcarouselObjects.addObject(object)
		})
	}
})(jQuery);
(function ($) {
	$.fn.touchSwipe = function (options) {
		var defaults = {
			preventWebBrowser : false,
			swipeLeft : null,
			swipeRight : null,
			swipeTop : null,
			swipeBottom : null
		};
		if (options)
			$.extend(defaults, options);
		return this.each(function () {
			var startX = -1,
			startY = -1;
			var curX = -1,
			curY = -1;
			function touchStart(event) {
				var e = event.originalEvent;
				if (e.targetTouches.length >= 1) {
					startX = e.targetTouches[0].pageX;
					startY = e.targetTouches[0].pageY
				} else
					touchCancel(event)
			}
			function touchMove(event) {
				if (defaults.preventWebBrowser)
					event.preventDefault();
				var e = event.originalEvent;
				if (e.targetTouches.length >= 1) {
					curX = e.targetTouches[0].pageX;
					curY = e.targetTouches[0].pageY
				} else
					touchCancel(event)
			}
			function touchEnd(event) {
				if (curX > 0 || curY > 0) {
					triggerHandler();
					touchCancel(event)
				} else
					touchCancel(event)
			}
			function touchCancel(event) {
				startX = -1;
				startY = -1;
				curX = -1;
				curY = -1
			}
			function triggerHandler() {
				if (curX > startX) {
					if (defaults.swipeRight)
						defaults.swipeRight.call()
				} else if (defaults.swipeLeft)
					defaults.swipeLeft.call();
				if (curY > startY) {
					if (defaults.swipeBottom)
						defaults.swipeBottom.call()
				} else if (defaults.swipeTop)
					defaults.swipeTop.call()
			}
			try {
				$(this).bind("touchstart", touchStart);
				$(this).bind("touchmove", touchMove);
				$(this).bind("touchend", touchEnd);
				$(this).bind("touchcancel", touchCancel)
			} catch (e) {}

		})
	}
})(jQuery);
jQuery.easing["jswing"] = jQuery.easing["swing"];
jQuery.extend(jQuery.easing, {
	def : "easeOutQuad",
	swing : function (x, t, b, c, d) {
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d)
	},
	easeInQuad : function (x, t, b, c, d) {
		return c * (t /= d) * t + b
	},
	easeOutQuad : function (x, t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b
	},
	easeInOutQuad : function (x, t, b, c, d) {
		if ((t /= d / 2) < 1)
			return c / 2 * t * t + b;
		return -c / 2 * (--t * (t - 2) - 1) + b
	},
	easeInCubic : function (x, t, b, c, d) {
		return c * (t /= d) * t * t + b
	},
	easeOutCubic : function (x, t, b, c, d) {
		return c * ((t = t / d - 1) * t * t + 1) + b
	},
	easeInOutCubic : function (x, t, b, c, d) {
		if ((t /= d / 2) < 1)
			return c /
			2 * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t + 2) + b
	},
	easeInQuart : function (x, t, b, c, d) {
		return c * (t /= d) * t * t * t + b
	},
	easeOutQuart : function (x, t, b, c, d) {
		return -c * ((t = t / d - 1) * t * t * t - 1) + b
	},
	easeInOutQuart : function (x, t, b, c, d) {
		if ((t /= d / 2) < 1)
			return c / 2 * t * t * t * t + b;
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b
	},
	easeInQuint : function (x, t, b, c, d) {
		return c * (t /= d) * t * t * t * t + b
	},
	easeOutQuint : function (x, t, b, c, d) {
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b
	},
	easeInOutQuint : function (x, t, b, c, d) {
		if ((t /= d / 2) < 1)
			return c / 2 * t * t * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t * t * t + 2) + b
	},
	easeInSine : function (x,
		t, b, c, d) {
		return -c * Math.cos(t / d * (Math.PI / 2)) + c + b
	},
	easeOutSine : function (x, t, b, c, d) {
		return c * Math.sin(t / d * (Math.PI / 2)) + b
	},
	easeInOutSine : function (x, t, b, c, d) {
		return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b
	},
	easeInExpo : function (x, t, b, c, d) {
		return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
	},
	easeOutExpo : function (x, t, b, c, d) {
		return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
	},
	easeInOutExpo : function (x, t, b, c, d) {
		if (t == 0)
			return b;
		if (t == d)
			return b + c;
		if ((t /= d / 2) < 1)
			return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
		return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b
	},
	easeInCirc : function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
	},
	easeOutCirc : function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
	},
	easeInOutCirc : function (x, t, b, c, d) {
		if ((t /= d / 2) < 1)
			return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
		return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
	},
	easeInElastic : function (x, t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if (t == 0)
			return b;
		if ((t /= d) == 1)
			return b + c;
		if (!p)
			p = d * 0.3;
		if (a < Math.abs(c)) {
			a = c;
			var s = p / 4
		} else
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		return  - (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * 2 *
				Math.PI / p)) + b
	},
	easeOutElastic : function (x, t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if (t == 0)
			return b;
		if ((t /= d) == 1)
			return b + c;
		if (!p)
			p = d * 0.3;
		if (a < Math.abs(c)) {
			a = c;
			var s = p / 4
		} else
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * 2 * Math.PI / p) + c + b
	},
	easeInOutElastic : function (x, t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if (t == 0)
			return b;
		if ((t /= d / 2) == 2)
			return b + c;
		if (!p)
			p = d * 0.3 * 1.5;
		if (a < Math.abs(c)) {
			a = c;
			var s = p / 4
		} else
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		if (t < 1)
			return -0.5 * a * Math.pow(2, 10 *
				(t -= 1)) * Math.sin((t * d - s) * 2 * Math.PI / p) + b;
		return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * 2 * Math.PI / p) * 0.5 + c + b
	},
	easeInBack : function (x, t, b, c, d, s) {
		if (s == undefined)
			s = 1.70158;
		return c * (t /= d) * t * ((s + 1) * t - s) + b
	},
	easeOutBack : function (x, t, b, c, d, s) {
		if (s == undefined)
			s = 1.70158;
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
	},
	easeInOutBack : function (x, t, b, c, d, s) {
		if (s == undefined)
			s = 1.70158;
		if ((t /= d / 2) < 1)
			return c / 2 * t * t * (((s *= 1.525) + 1) * t - s) + b;
		return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b
	},
	easeInBounce : function (x, t, b, c, d) {
		return c -
		jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b
	},
	easeOutBounce : function (x, t, b, c, d) {
		if ((t /= d) < 1 / 2.75)
			return c * 7.5625 * t * t + b;
		else if (t < 2 / 2.75)
			return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
		else if (t < 2.5 / 2.75)
			return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
		else
			return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b
	},
	easeInOutBounce : function (x, t, b, c, d) {
		if (t < d / 2)
			return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * 0.5 + b;
		return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
	}
});
if (typeof amazingcarouselObjects === "undefined")
	var amazingcarouselObjects = new function () {
		this.objects = [];
		this.addObject = function (obj) {
			this.objects.push(obj)
		}
	};
if (typeof ASYouTubeIframeAPIReady === "undefined") {
	var ASYouTubeIframeAPIReady = false;
	var ASYouTubeTimeout = 0;
	function onYouTubeIframeAPIReady() {
		ASYouTubeIframeAPIReady = true
	}
}
if (typeof amazingcarouselId === "undefined")
	var amazingcarouselId = 0;
