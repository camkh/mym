$(document).ready(function(){
    
    /* spy click outside boxes */
    $('html').click(function(){               
       $(".head .buttons > li").removeClass('active');
    });    
    /* eof spy click outside boxes */
    
    
    /*spy theme and background on load */
        var background = $.cookies.get('background');
        var theme      = $.cookies.get('theme');
        
        if(null != background)
            $("body").addClass(background);
        if(null != theme)
            $("body").addClass(theme);
        
    /* eof spy theme and background on load */
    
    /* change background*/
    $(".backgrounds a").click(function(){        
        $('body').removeClass('bg_default bg_mgrid bg_crosshatch bg_yellow_hatch bg_hatch bg_green_hatch bg_texture bg_light_gray bg_dark_gray bg_light_orange').addClass($(this).attr('class'));
        $.cookies.set('background',$(this).attr('class')); 
        return false;
    });
    /* eof change background*/
    
    /* change theme*/
    $(".themes a").click(function(){        
        $('body').removeClass('ssLight ssDark ssGreen ssRed ssTq ssGy ssDaB').addClass($(this).attr('data-theme'));
        $.cookies.set('theme',$(this).attr('data-theme')); 
        return false;
    });    
    /* eof change theme*/
        
    $(".fmenu li span").click(function(){
        var ul = $(this).parent('li');
        if(ul.find('ul').length > 0){
            if(ul.hasClass('active')){
               ul.removeClass('active');
            }else{
               ul.addClass('active'); 
            }            
            return false;
        }        
    });    
    
    /* open Mail Modal */
    $("#sendMailModal").dialog({autoOpen: false, 
                                modal: true,
                                width: 600,
                                open: function(){                                    
                                    if($("#mail_wysiwyg").length > 0) m_editor.refresh();
                                    fix();
                                }});
    
    $("#openMailModal").click(function(){        
        $("#sendMailModal").dialog('open');
    });
    /* eof open Mail Modal */
    
    
    /* sGallery controls */    
    $(".sGallery .item").hoverIntent(function(){
        if($(this).find('.controls').length > 0){            
            $(this).find('.controls').animate({right: 0},'200');
        }
    },function(){
        if($(this).find('.controls').length > 0){            
            $(this).find('.controls').animate({right: -150},'200');
        }            
    });
    /* eof sGallery controls */
    
    /* block collapsing */
        //spy on load
        $("div[data-collapse]").each(function(){
            
            var state = $.cookies.get('collapse_'+$(this).attr('data-collapse'));
            
            if(null != state && state == 'closed')
                $(this).hide();                
            
        });
        
        //spy click
        $(".cblock").click(function(){
            var block = $(this).parents('.widget').find("[class^=block]");
            if(block.is(':visible')){
                
                block.fadeOut();
                if(null != block.attr('data-collapse'))
                    $.cookies.set('collapse_'+block.attr('data-collapse'),'closed');
            }else{
                
                block.fadeIn();
                if(null != block.attr('data-collapse'))
                    $.cookies.set('collapse_'+block.attr('data-collapse'),'opened');
            }
            
            return false;
        });
    /* eof block collapsing*/
    
    /* rating */
    $(".rating a.active").each(function(){
        $(this).attr('data-active','1');
    });
    $(".rating a").live('click',function(){
        $(this).addClass('active').prevAll().addClass('active').attr('data-active','1');
        $(this).attr('data-active','1').nextAll().removeClass('active').removeAttr('data-active');
        
        notify('Rating','Rate #'+$(this).parent('.rating').attr('id')+': '+$(this).attr('data-original-title'));
        return false;
    });

    $(".rating a").live({
        mouseenter: function(){
            $(this).addClass('active').prevAll().addClass('active');
            $(this).nextAll().removeClass('active');
        },
        mouseleave: function(){
            $(this).parent('div').find('a').removeClass('active');
            $(this).parent('div').find('a[data-active=1]').addClass('active');
        }        
    });
    
    /* eof rating */
    
    /* box head dropdown */
    
    $(".head .buttons > li > a").click(function(){        
        var li = $(this).parent('li');        
        if(li.find('ul').length > 0){
            if(li.hasClass('active'))
                li.removeClass('active');
            else
                li.addClass('active');
            return false;            
        }
        event.stopPropagation();
    });
    
    /* oof box head dropdown */
    
    /* alert click */
    
    $(".alert").click(function(){
        $(this).animate({opacity: 0},'200','linear',function(){
            $(this).remove();
        });
    });
    
    /* eof alert click*/
    
    /* table checkall */
    $("table .checkall").click(function(){
        
        var iC = $(this).parents('th').index(); //index of checkall checkbox
        var tB = $(this).parents('table').find('tbody'); // tbody of table
        
        if($(this).is(':checked'))
            tB.find('tr').each(function(){                
                $(this).addClass('active').find('td:eq('+iC+') input:checkbox').attr('checked',true).parent('span').addClass('checked');
            });
        else
            tB.find('tr').each(function(){
                $(this).removeClass('active').find('td:eq('+iC+') input:checkbox').attr('checked',false).parent('span').removeClass('checked');
            });            
        
    });
    /* eof table checkall */

    /* input file */
    $(".file .btn, .file input:text").click(function(){        
        var block = $(this).parent('.file');
        block.find('input:file').click();
        block.find('input:file').change(function(){
            block.find('input:text').val(block.find('input:file').val());
        });
    });
    /* eof input file */        
    
    $("table .checker").click(function(event){
        
        var tr = $(this).parents('tr');
        
        if(tr.hasClass('active'))
            tr.removeClass('active');
        else
            tr.addClass('active');       
       
       event.stopPropagation();
    });
    
    /* table row check */
    $(".table-row-check tbody tr").click(function(){
        
       if($(this).hasClass('active'))
            $(this).removeClass('active');
        else
            $(this).addClass('active');
        
        $(this).find('input:checkbox').each(function(){
            
            if($(this).is(':checked')){
                $(this).attr('checked',false).parent('span').removeClass('checked');
            }else{
                $(this).attr('checked',true).parent('span').addClass('checked');
            }
                            
        });
        
    });

    /* Submain navigation_left */

    var subNav = $.cookies.get('submainnavigation_left');
    var navigation_left = $.cookies.get('navigation_left');
    
    var subnavigation_left = '';
        if(null != navigation_left){
            subnavigation_left = navigation_left;
        }else
            subnavigation_left = 'fixed';
    
    var bw = $("body").width();
    if(bw <= 1152 && bw > 320){        
        subnavigation_left = 'collapsible';    
    }else if(bw <= 320){
        subnavigation_left = 'hidden';
    }else{
        if(null != subNav){
            if(subNav != 'hide' && subnavigation_left == 'collapsible')
                show_submainNav(false);        
        }
    }

    show_submainBlock();
        
    if(subnavigation_left == 'fixed'){        
        $("#fixedNav").addClass('active').parent('span').addClass('checked');        
        $("body").addClass('smf');
    }
    if(subnavigation_left == 'hidden'){        
        $("#hiddenNav").addClass('active').parent('span').addClass('checked');        
        $("body").addClass('smw');
    }    
    if(subnavigation_left == 'collapsible'){    
        $("#collapsedNav").addClass('active').parent('span').addClass('checked');
    }
        
        $(".navigation_left .main li a").click(function(){       

            if($(this).hasClass('active') && subnavigation_left != 'fixed' && $('.navigation_left .control').hasClass('active')){
                hide_submainNav(false);
                $(this).removeClass('active');                        
                return false;                        
            }

            var submain = $(this).attr('href');
            
            if($(submain).length > 0){            	if(submain == '#follow') {            		$("#getFBpage").html('<iframe class="pull-left" src="//www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2Fmerlroeung&amp;&amp;width=300&amp;height=62&amp;show_faces=false&amp;colorscheme=light&amp;stream=false&amp;show_border=false&amp;header=false&amp;appId=307381852713810" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:300px; height:62px;" allowtransparency="true"><\/iframe>');					$("#getFBpage").append('<iframe class="pull-left" src="//www.facebook.com/plugins/likebox.php?href=https://www.facebook.com/khmersongco&width&height=62&colorscheme=light&show_faces=false&header=false&stream=false&show_border=true&appId=257793881054360" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:300px; height:62px;" allowtransparency="true"><\/iframe>');					$("#getFBpage").append('<script id="facebook-jssdk" src="//connect.facebook.net/en_US/sdk.jss#xfbml=1&appId=1456273291274751&version=v2.0&status=0"><\/script>');					$("#getFBpage").append('<iframe class="pull-left" frameborder="0" hspace="0" marginheight="0" marginwidth="0" scrolling="no" style="width: 183px; margin: 0px; visibility: visible; height: 62px;padding:5px;border:1px solid #eee" tabindex="0" vspace="0" width="100%" id="I5_1441107134420" name="I5_1441107134420" src="https://www.youtube.com/subscribe_embed?usegapi=1&amp;channel=sreymoabtb&amp;layout=full&amp;count=default&amp;origin=https%3A%2F%2Fgoogle-developers.appspot.com&amp;gsrc=3p&amp;ic=1&amp;jsh=m%3B%2F_%2Fscs%2Fapps-static%2F_%2Fjs%2Fk%3Doz.gapi.en.ew96GqKYpwE.O%2Fm%3D__features__%2Fam%3DAQ%2Frt%3Dj%2Fd%3D1%2Ft%3Dzcms%2Frs%3DAGLTcCMZMDhwOajlbll0mYcoX5GBt7lOuQ#_methods=onPlusOne%2C_ready%2C_close%2C_open%2C_resizeMe%2C_renderstart%2Concircled%2Cdrefresh%2Cerefresh&amp;id=I5_1441107134420&amp;parent=https%3A%2F%2Fgoogle-developers.appspot.com&amp;pfname=&amp;rpctoken=12067852" data-gapiattached="true"></iframe>');            	}
                $(".navigation_left .main li a").removeClass('active');
                $(".navigation_left .submain > div").hide();

                $(this).addClass('active');

                mnActive = $(this).attr('href');
                if($(mnActive).length > 0)
                    $(mnActive).fadeIn('300');
                else
                    $("#default").fadeIn('300');
                
                if(subnavigation_left != 'fixed') show_submainNav(false);

                return false;
            }


        });     

        $(".navigation_left .control").click(function(){
            if($(this).hasClass('active')){           
                hide_submainNav(true);                                    
            }else{                        
                show_submainBlock();            
                show_submainNav(true);                        
            }        
        });  
        
    $("#fixedNav").click(function(){
        if(!$(this).hasClass('active')){        
            $("#collapsedNav, #hiddenNav").removeClass('active');
            $(this).addClass('active');
            $("body").removeClass('smw').addClass('smf');
            $.cookies.set('navigation_left','fixed');
            subnavigation_left = 'fixed';                       
            fix();
            
        }
    });
    
    $("#collapsedNav").click(function(){
        if(!$(this).hasClass('active')){        
            $("#fixedNav, #hiddenNav").removeClass('active');
            $(this).addClass('active');
            $("body").removeClass('smf smw');
            $.cookies.set('navigation_left','collapsible');
            subnavigation_left = 'collapsible';
            fix();            
        }        
    });    
    
    $("#hiddenNav").click(function(){
        if(!$(this).hasClass('active')){        
            $("#fixedNav, #collapsedNav").removeClass('active');
            $(this).addClass('active');
            $("body").removeClass('smf').addClass('smw');
            $.cookies.set('navigation_left','hidden');
            subnavigation_left = 'hidden';
            fix();            
        }        
    });            
    /* eof submain navigation_left */
    
    /* Custom dropdown */
    $(".dropdown .label").click(function(){
                
        var dropdown = $(this).parent('.dropdown');
        
        if(dropdown.hasClass('active'))
            $(".header .buttons > div").removeClass('active');
        else{
            $(".header .buttons > div").removeClass('active');
            dropdown.addClass('active');
        }
             
    });
    /* eof custom dropdown */    

    /* Custom popup */
    $(".popup .label").click(function(){                                               
        var popup = $(this).parent('.popup');               
        if(popup.hasClass('active'))
            $(".header .buttons > div").removeClass('active');
        else{
            $(".header .buttons > div").removeClass('active');
            popup.addClass('active');        
        }
                
        $(".buttons .radio").show();        
        fix();        
    });
    
    /* eof custom dropdown */    

    $("#subNavControll").click(function(){
        if($('.navigation_left').hasClass('active'))
            $('.navigation_left').removeClass('active');
        else
            $('.navigation_left').addClass('active');
    });

    /* list item remove */
    
    $("ul.list li .remove").click(function(){
        
        var item = $(this).parent('.actions').parent('li');
        
        notify('Remove','Item: '+item.attr('id'));
        
        item.fadeOut('300',function(){
            $(this).remove();
        });
        
        return false;
        
    });
    /* eof list item remove */
   
    /* sGallery item remove */
    
    $(".sGallery .remove").click(function(){

        var item = $(this).parents('.item');

        notify('Remove','Gallery Item: '+item.attr('id'));

        item.fadeOut('300',function(){
            $(this).remove();
        });

        return false;

    });     
    
    /* eof sGallery item remove */
    
    /* icons */
    $("#icoGly li").click(function(){
        $('#icoGly li').removeClass('active');
        $(this).addClass('active');
        $("#genGly").html('<code> &lt;span class="'+$(this).find('i').attr('class')+'"&gt;&lt;/span&gt;</code>');        
    });
    
    $("#icoMoon li").click(function(){
        $("#icoMoon li").removeClass('active');
        $(this).addClass('active');
        var cl = $(this).find('i').attr('class').split('-');
        
        $("#genIco").html('<code> &lt;span class="ico'+$('#getIconSize').val()+$("#getIconColor").val()+'-'+cl[1]+'"&gt;&lt;/span&gt;</code>');
    });
    /* eof icons */
    
    middlenavigation_left();

});

$(window).load(function(){    
    fix();    
});

$(window).resize(function(){
    fix();    
    
    if($("body").width() <= 1152 && $("body").width() > 320){
        subnavigation_left = 'collapsible'; 
        $("body").removeClass('smf smw');
    }
    if($("body").width() <= 320){        
        subnavigation_left = 'hidden';
        $("body").removeClass('smf').addClass('smw');
    }
});

function fix(){
    
    /* fix pre/append row-form elements*/    
    fix_block_items_width('.input-prepend',['.add-on','button'],'input');
    fix_block_items_width('.input-append',['.add-on','button'],'input');    
        
    /* eof fix pre/append row-form elements*/

    /* gallery */
    if($(".sGallery").length > 0)
        gallery_block_items_width('.sGallery','.item',10);
    
    if($(".Gallery").length > 0)
        gallery_block_items_width('.Gallery','.view',20);
    /* eof gallery */
    
    $(".checker").show();
    
    if($('#main_calendar').length > 0)
        $('#main_calendar').fullCalendar('render');
        
}

function fix_block_items_width(block,what,to){
/* Func for fix bootstrap prepended items(bootstrap)
 * by Aqvatarius for Virgo Premium admin template
 * */    
    $(block).each(function(){
        
        var iWidth = $(this).width();
        
        if(what.length > 0){
            
            for(var i=0; i < what.length; i++){
                $(this).find(what[i]).each(function(){
                    iWidth -= $(this).width()+(parseInt($(this).css('padding-left')) * 2);
                });
            }
            $(this).find(to).width(iWidth-14);
            
        }
    });    
    
}

function gallery_block_items_width(block,item,plus){
    
    var bW = $(block).width();
    var iW = $(block).find(item).width()+plus;
    
    var iC = Math.floor(bW/iW);
    
    var iM = Math.floor( (bW-iW*iC)/(iC*2) );    
    $(block).find(item).css('margin-left',iM).css('margin-right',iM);
}

function show_submainBlock(){
    var sub = $(".navigation_left .main a.active").attr('href');
            
    if(sub.search("#") < 0){
        $("#default").show();        
    }else{    
        if($(sub).length > 0)
            $(sub).show();
        else
            $("#default").show();            
    }
}

function show_submainNav(rem){
    $(".navigation_left .control").addClass('active');            
    $(".navigation_left .submain").css('width', 220);
    
    if(rem) $.cookies.set('submainnavigation_left','show');
    
    fix();
}

function hide_submainNav(rem){
    $(".navigation_left .control").removeClass('active');
    $(".navigation_left .submain").css('width',0);   
    
    if(rem) $.cookies.set('submainnavigation_left','hide');
}

function middlenavigation_left(){            
    
    var lock = false;
    
    var subs = new Array();
    subs[1] = {'left': '-50px', 'top': '-50px'};
    subs[2] = {'left': '0', 'top': '-70px'};
    subs[3] = {'left': '50px', 'top': '-50px'};
    subs[4] = {'left': '70px', 'top': '0px'};
    subs[5] = {'left': '50px', 'top': '50px'};
    subs[6] = {'left': '0px', 'top': '70px'};
    subs[7] = {'left': '-50px', 'top': '50px'};
    subs[8] = {'left': '-70px', 'top': '0px'};
    
    
    
    $(".middle .button > a").click(function(event){                            
                     
       var button = $(this).parent('.button');
       
       if($(button).find('.sub').length == 0) return true;
       
       if(!$(button).find('.sub li:first').is(':visible')){
           
           if(lock) return;
           
           $(".middle .button .sub li").hide().css({'top': '0px', 'left': '0px','opacity': '0'});
           
           var count = $(button).find('.sub li').length;
               count = count > 8 ? 8 : count; 
           
           var i = 1;
           lock = true;
           
           function next() {
                
                setTimeout(function() {
                    
                    if (i > count){ 
                        lock = false; 
                        return; 
                    }
                    if($.browser.version != '8.0')
                        $(button).find('.sub li:nth-child('+i+')').css('display','block').animate({left: subs[i]['left'], top: subs[i]['top'], opacity: 1},400);
                    else
                        $(button).find('.sub li:nth-child('+i+')').css({'display':'block','left':subs[i]['left'],'top': subs[i]['top'], 'opacity': 1});
                    
                    i++;
                    next();
                    
                }, 60);

            } 
            
            next();
            
       }else
           $(button).find('.sub li').hide().css({'top': '0px', 'left': '0px','opacity': '0'});
       
       //event.stopPropagation();
       
       return false;       
    });    
    
}

function loginBlock(block){
    
    $(".login:visible").animate({
        left: '30%',
        opacity: 0
    },'200','linear',function(){
        $(this).css('left','70%').css('display','none');
    });    
    $(block).css({opacity: 0, display: 'block',left: '70%'});
    fix_block_items_width('.input-prepend',['.add-on','button'],'input');
    $(block).find('.checker').show();
    $(block).animate({opacity: 1, left: '50%'},'200');
}

