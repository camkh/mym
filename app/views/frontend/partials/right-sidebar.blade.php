
<!-- ##### RIGHT SIDEBARE ##### -->

<div id="sidebar" class="sidebar sright section">
	<div class="widget">
		<div id="ad_3" class="ads-right"></div>
	</div>
	<div class="widget">
		<h4>Top Videos:</h4>
		<ul class="pm-ul-top-videos" id="pm-ul-top-videos">
		<div class="loadPlaylist"></div>
		</ul>
		<div class="clearfix"></div>
	</div>
</div>
<!-- ##### END RIGHT SIDEBARE ##### -->
<script>

	function loadTopVideo(){
		var topvdo = '{{Config::get('app.url')}}ajax?p=topvideo';
		$.ajax({
			url: topvdo,
			type: "GET",
			dataType: "json",
			beforeSend: function(){
				//$("#blockui").show();
			},
			complete: function(){
				//$("#blockui").hide();
			},
			success: function(data){
				if(data) {
					$("#pm-ul-top-videos").html(data);
				}
				//$("#getajax").html(data.result);
				//$("#byPage").html(data.page);
			},
			error: function(){} 	        
	   });
	}

</script>