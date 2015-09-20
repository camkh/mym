@extends('frontend.layout')
@section('title'){{@$data->name}}@endsection
@section('description'){{@$data->name}}@endsection
@section('content')
<div class="element-videos">
	<div class="post-style" style="display: none">
		<div class="btn-group btn-group-sort opac5">
			<button class="btn btn-small" id="list">
				<i class="icon-th"></i>
			</button>
			<button class="btn btn-small" id="grid">
				<i class="icon-th-list"></i>
			</button>
		</div>
	</div>
	<h2>{{@$data->name}}</h2>
	<ul class="pm-ul-browse-videos thumbnails" id="getajax">	
		{{$data}}	
	</ul>
	<div class="clear"></div>
	@include('frontend.partials.tvlink')
	{{@$paginate}}
</div>
<script>
	jQuery(document).ready(function(){
		loadTopVideo();
	});
</script>
@endsection @section('client_location') dddddddddd @endsection

