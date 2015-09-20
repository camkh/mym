@include('frontend.partials.header')
<div class="wrapper-blog">
	<div id="content-con">
		<div class="maincontent">
			<div id="primary">
				@yield('content')
			</div>
			<!-- primary -->
		</div>
		<!-- maincontent -->
	</div>
	@include('frontend.partials.left-sidebar')
	@include('frontend.partials.right-sidebar')
	<!-- content-con -->
</div>
<!-- wrapper-blog -->
@include('frontend.partials.footer')
