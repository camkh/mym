<div class="page">
<div class="row">
<div id='coin-slider'>


<script type="text/javascript">
    if(slide_on){
        jQuery(document).ready(function($) {
            $('.iosSlider').iosSlider({
                desktopClickDrag: true,
                touchMoveThreshold:4,
                snapToChildren: true,
                infiniteSlider: true,
                autoSlide:true,
                autoSlideTimer:5000,
        		navSlideSelector: '.sliderNavi .naviItem',                
                navNextSelector: '.iosSlider .next',
                navPrevSelector: '.iosSlider .prev',
        		onSlideChange: slideContentChange,
        		onSlideComplete: slideContentComplete,
        		onSliderLoaded: slideContentLoaded
            }); 
                       	
        }); 
    }
</script>
                                     
<div style="left: 0px;" class="etheme_cp_btn_show"></div><div class="std">
    <div class="iosSlider"><!-- slider -->
<div style="position: relative; cursor: move;overflow: hidden; " class="slider">
         <?php 
		      $slet="SELECT *FROM tbl_banner WHERE ban_status=1";
			  $query=mysql_query($slet);
			  $num_rows=mysql_num_rows($query);
			  if($num_rows>0){
				   while($rows=mysql_fetch_array($query,MYSQL_ASSOC)){
					   
					    $bannertitle= $rows['ban_title'];
						$banner_link=$rows['ban_addlink'];
						$banner_image=$rows['ban_img_upload'];
						$banner_description=$rows['ban_description'];
					  
		     
		   ?>  
<div class="slide"><img class="royalImage" src="<?php echo W_ROOT;?>/admin/banner/upload_image/banner/<?php echo $banner_image; ?>" alt="<?php echo $bannertitle; ?>" title="<?php echo $bannertitle; ?>" /></div>

<!-- slides -->
<?php }} ?>
</div>
<div class="sliderNavi"><span style="cursor: pointer;" class="naviItem selected">1</span> 
    <span style="cursor: pointer;" class="naviItem">2</span> 
    <span style="cursor: pointer;" class="naviItem">3</span> 
    <span style="cursor: pointer;" class="naviItem">4</span></div>
<div style="cursor: pointer;" class="prev">&nbsp;</div>
<div style="cursor: pointer;" class="next">&nbsp;</div>
</div>
</div>
</div>
</div>
</div>