<?php if(!empty($recent_post))
{    
?>
<div style="height:265px; overflow:hidden;">
<div id="featuredContent">
<div class="row">
<?php
	include_once(S_ROOT.'/function/readmore.php');
?>
                	<?php 
					  $slet="SELECT * FROM tbl_banner WHERE ban_status=1 ORDER BY ban_id DESC LIMIT 0,6";
					  $query=mysql_query($slet);
					  $num_rows=mysql_num_rows($query);
					  if($num_rows>0){
						  $i = 0;
						  while($rows = mysql_fetch_assoc($query)){
						   //while($rows=mysql_fetch_array($query,MYSQL_ASSOC)){
							  if($i==1){
								$active = '<div class="row">';
							}
							else if($i==4){
								$active = '<div class="row">';
							} else
							{
								$active ='<div>';
							}
							
								$bannertitle= $rows['ban_title'];
								$banner_link=$rows['ban_addlink'];
								$banner_image=$rows['ban_img_upload'];
								$banner_description=$rows['ban_description'];
							  
					 $i++;
				   ?>
        	<div class="four columns">
            	<div class="ba_fff bo_fff radius1 sad_ddd box_no pad_5">                	
            	<img src="<?php echo W_ROOT;?>/admin/banner/upload_image/banner/<?php echo $banner_image; ?>" alt="<?php echo $bannertitle;?>" />
                <h4><?php echo $bannertitle;?></h4>
                <?php
					  	echo rm($banner_description, $char); 					  
				?>
                </div>
        	</div>

            

                  <?php 
				   }				   
			}
		?>  


</div>

	</div>
</div>
<?php
}
?>
<?
$homepage = "/index.php";
$currentpage = $_SERVER['REQUEST_URI'];
if($homepage==$currentpage) {
echo "links links links links";
}
?>
  <div class="row">
    <div class="twelve columns">
      <div id="slider">
        <img src="http://placehold.it/1000x400&text=[img 1]" />
        <img src="http://placehold.it/1000x400&text=[img 2]" />
        <img src="http://placehold.it/1000x400&text=[img 3]" />
        <img src="http://placehold.it/1000x400&text=[img 4]" />
      </div>
      
      <hr />
    </div>
  </div>





       
                <!--from recentpost-->
                    <?php if(!empty($recent_post))
	{  
	?> 
       <div class="carousel slide" id="myCarousel">
                <div class="carousel-inner">
                <?php
				$sql = "SELECT t1.id, t1.product_name, t3.price, t2.images, t2.thumbnail,images, t3.pid FROM tblproduct as t1 ".
						"INNER JOIN tblimage as t2 on t1.id=t2.product_id ".
						"INNER JOIN tblproduct_in_pharmacy as t3 on t1.id=t3.product_id ".
						"WHERE t1.status = 1 ORDER BY t3.pid DESC LIMIT 0,4";
				$result = mysql_query($sql);
				$i = 1;
				while($row = mysql_fetch_assoc($result)){
					if($i==1){
						$active = 'active';
					}else{
						$active = '';
					}
				?>
                  <div class="item <?php echo $active?>">
                  	<div class="row">
                    <div class="box-1 pad-10">
                    	<div class="span3">
                    		<a href="product/product_detail.php?product_id=<?php echo $row['id']?>" title="<?php echo $row['product_name']?>"><img class="img-polaroid" src="<?php echo W_S_IMAGES_DIR.$row['images']?>" style="height:100px;" width="100px;"/></a>
						</div>
                    <div class="span9">
                      <h4><a href="product/product_detail.php?product_id=<?php echo $row['id']?>" title="<?php echo $row['product_name']?>"><?php echo $row['product_name']?></a></h4>
                      		<div class="row">
                            	<div class="six columns">
                                <h3><?php echo $row['price']?>&nbsp;$</h3>
                                </div>
                                <div class="six columns">
                                	<div class="add-tocart">
                                        <a class="btn btn-success" href="product/product_detail.php?product_id=<?php echo $row['id']?>" title="<?php echo $row['product_name']?>">MORE DETAIL</a>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div class="clear"></div>
                    </div>
                    </div><!--<div class="row">-->
                  </div>
                  <?php $i++; } ?>
                </div>
                <a data-slide="prev" href="#myCarousel" class="left carousel-control">‹</a>
                <a data-slide="next" href="#myCarousel" class="right carousel-control">›</a>
              </div>
              <?php 
			  } // end recentpost

			  ?>