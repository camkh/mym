<?php 
$getconFig = new MVideo();
$getTitle = $getconFig->getConfig('homepage_title')->value;
$desc = $getconFig->getConfig('homepage_description')->value;
?>
@extends('frontend.layout') 
@section('title')
	@if($getTitle)
	@if(Config::get('app.url') == 'http://www.allkun.com/')
       	ALLKUN.COM
       	@elseif(Config::get('app.url') == 'http://www.roeung.com/')
       	ROEUNG.COM
       	@elseif(Config::get('app.url') == 'http://www.sruol9.com/')
       	SRUOL9.COM
       	@elseif(Config::get('app.url') == 'http://www.khmermovies.co/')
       	KHMERMOIVES.COM
       	@elseif(Config::get('app.url') == 'http://www.mkhmer.co/')
      	MKHMER.CO
       	@elseif(Config::get('app.url') == 'http://www.m-khmer.com/')
       	M-KHMER.COM
       	@elseif(Config::get('app.url') == 'http://www.moviekhmer.co/')
       	MOVIEKHMER.CO
       	@else
       	SRUOL9.COM
       	@endif
       	- {{$getTitle}}
	@else
		@if(Config::get('app.url') == 'http://www.allkun.com/')
       	ALLKUN.COM
       	@elseif(Config::get('app.url') == 'http://www.roeung.com/')
       	ROEUNG.COM
       	@elseif(Config::get('app.url') == 'http://www.sruol9.com/')
       	SRUOL9.COM
       	@elseif(Config::get('app.url') == 'http://www.khmermovies.co/')
       	KHMERMOIVES.COM
       	@elseif(Config::get('app.url') == 'http://www.mkhmer.co/')
      	MKHMER.CO
       	@elseif(Config::get('app.url') == 'http://www.m-khmer.com/')
       	M-KHMER.COM
       	@else
       	SRUOL9.COM
       	@endif
       	- Movies free online, Khmer Movies, Movie Khmer
	@endif
@endsection
@section('description'){{($desc ? $desc : $video->title)}}@endsection
@section('content')
{{HTML::script('frontend/plugin/feature/js/jquery.easing-1.3.js')}}
{{HTML::script('frontend/plugin/feature/js/jquery_005.js')}}
{{HTML::script('frontend/plugin/feature/js/jquery_004.js')}}
{{HTML::script('frontend/plugin/feature/js/efects.js')}}
{{HTML::style('frontend/plugin/feature/css/slideshow.css')}}
	@include('frontend.partials.tvlink')
	<div id="ad_1" class="contentAd"></div>
	<div id="getMusic">
		<div class="loadPlaylist"></div>
	</div>
	<div id="getVideoResult1"></div>
	<div id="getVideoResult6"></div>
	<div id="getVideoResult2"></div>
	<div id="getVideoResult3"></div>
	<div id="getVideoResult4"></div>
	<div id="getVideoResult5"></div>
	
	<input type="hidden" id="readyLoad" value="0"/>
	<center><a class="btn btn-danger btn-lg" href="{{Config::get('app.url')}}search/label" role="button" style="margin-top: 10px"><span class="icos-plus"></span> View all</a></center>

<script>
//var url = '{{Config::get('app.url')}}ajax?p=home';
	var dataLoad = 0;
	jQuery(document).ready(function(){
	    
		jQuery( window ).load(function() {
			sectionHome(1);
			loadTopVideo();

		/*get music*/
			var url_music = '{{Config::get('app.url')}}ajax?p=getmusic&id=7955635576802302090&label=&l=10';
			$.ajax({
				url: url_music,
				type: "GET",
				dataType: "html",
				beforeSend: function(){
					//$("#blockui").show();
				},
				complete: function(){
					//$("#blockui").hide();
				},
				success: function(data){
					if(data) {
						var id7 = 'home7';
						$("#getMusic").html(getBodySlide(data,id7));
						updateSlider(id7);
					}
					//$("#getajax").html(data.result);
					//$("#byPage").html(data.page);
				},
				error: function(){} 	        
		   });
			   /*end music*/
		});

		
		jQuery("#menu_toogle").css('cursor','pointer');
		jQuery("#menu_toogle").click(function(){
			jQuery(".categories_menu").toggle("slow");
		});
		
	});
	function getSection(data,id,name) {
		var link = '';
		if(name.name != 'New video') {
			link = '/' + name.slug;
		}
		var dataNum = getRandomizer(0,4);
		var dataAlert = [{
			type : "info"
		},{
			type : "primary"
		},{
			type : "success"
		},{
			type : "warning"
		},{
			type : "danger"
		}
		];
		var header = '<div id="bycategoies">'+
			'<h2>'+
			'<span class="viewall hide-for-small" style="float: right">'+
			'<a class="btn btn-'+dataAlert[dataNum].type+' btn-xs" href="{{Config::get('app.url')}}search/label'+link+'">View all</a>'+
			'<i class="icon-chevron-right"></i>'+
			'</span>'+
			'<div class="title-orange"><a href="{{Config::get('app.url')}}search/label'+link+'">'+name.name+'</a></div>'+
		'</h2>'+
		'<div class="homeslides">'+
			'<div class="carousel"  id="'+id+'">'+
				'<div class="slider">'+ data +'</div>'+
			'</div>'+
			'<div class="prev watch-arrow'+id+' disabled" style="cursor: pointer;">&nbsp;</div>'+
			'<div class="next watch-arrow'+id+'" style="cursor: pointer;">&nbsp;</div>'+
		'</div>'+
		'</div>';
		return header;
	}

	function getBodySlide(data,id) {
		var header = '<div id="bycategoies">'+
		'<div class="homeslides">'+
			'<div class="carousel"  id="'+id+'">'+
				'<div class="slider">'+ data +'</div>'+
			'</div>'+
			'<div class="prev watch-arrow'+id+' disabled" style="cursor: pointer;">&nbsp;</div>'+
			'<div class="next watch-arrow'+id+'" style="cursor: pointer;">&nbsp;</div>'+
		'</div>'+
		'</div>';
		return header;
	}
	
	function updateSlider(id) {
		jQuery('.prev.watch-arrow'+id).addClass('disabled');
	    jQuery('#' + id).iosSlider({
	        desktopClickDrag: true,
	        snapToChildren: true,
	        infiniteSlider: false,
	        navNextSelector: '.next.watch-arrow'+id,
	        navPrevSelector: '.prev.watch-arrow'+id,
	        lastSlideOffset: 3,
	        onFirstSlideComplete: function() {
	            jQuery('.prev.watch-arrow'+id).addClass('disabled');
	        },
	        onLastSlideComplete: function() {
	            jQuery('.next.watch-arrow'+id).addClass('disabled');
	        },
	        onSlideChange: function() {
	            jQuery('.prev.watch-arrow'+id).removeClass('disabled');
	            jQuery('.next.watch-arrow'+id).removeClass('disabled');
	        }
	    });
	}
	function getRandomizer(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function sectionHome (num) {
		$.ajax({
			url: '{{Config::get('app.url')}}ajax?p=home&s=' + num,
			type: "GET",
			dataType: "json",
			beforeSend: function(){
				$("#blockui").show();
			},
			complete: function(){
				$("#blockui").hide();
			},
			success: function(data){
				if(data.home) {
					if(data) {
						var slideId = 'home' + num;
						$("#getVideoResult" + num).append(getSection(data.home,slideId,data.name));
						updateSlider(slideId);
						if(num == 1) {
							sectionHome(2);
						} else if(num == 2) {
							sectionHome(3);
						} else if(num == 3) {
							sectionHome(4);
						} else if(num == 4) {
							sectionHome(5);
						} else if(num == 5) {
							sectionHome(6);
						} else if(num == 6) {
							sectionHome(7);
						}
					}				
					
				}
				console.log(dataLoad);
			},
			error: function(){} 	        
	   });
	}	
</script>
@endsection