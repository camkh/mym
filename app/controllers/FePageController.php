<?php
class FePageController extends BaseController {
	public $mVideo;
	function __construct() {
		$this->mod_category = new MCategory ();
		$this->mVideo = new MVideo ();
	}
	public function index() {
		$videoList = array();
		return View::make ( 'frontend.partials.home' )->with ( 'video', $videoList );
	}
	
	public function clean_feed($input)
	{
		$original = array("<", ">", "&", '"', "'", "<br/>", "<br>");
		$replaced = array("&lt;", "&gt;", "&amp;", "&quot;","&apos;", "", "");
		$newinput = str_replace($original, $replaced, $input);
	
		return $newinput;
	}
	public function searchByLabel() {
		$segment = Request::segment ( 3 );
		if($segment) {
			$byWhereCate = array(
				'slug' => $segment
			);
			$data = $this->mVideo->getCategory(null, null,$byWhereCate);
		} else {
			$object = new stdClass ();
			$object->name = 'Search all vieoes';
			$data = $object;
		}
		return View::make ( 'frontend.modules.label.label' )
		->with('data',$data);
	}
	public function searchByLabelAajex() {
		header('Access-Control-Allow-Origin: *');
		$cateID = Input::get('c');
		if($cateID) {
 			$byWhereCate = array(
 				'slug' => $cateID
 			);
 			$labelID = $this->mVideo->getCategory(null, null,$byWhereCate);
 			$videoList = $this->mVideo->getVideoListsByTag ($labelID->id);
 			/*update category view*/
 			$this->mVideo->updateCategoryView($labelID->id);
 			/*End update category view*/
		} else {
			$videoList = $this->mVideo->getVideoLists ();
		}
		//$videoList = $this->mVideo->getVideoLists ();
		$dataList = '';
		if (! empty ( $videoList ['result'] )) {
				$dataList .= $this->mVideo->getVideoDataList($videoList ['result']);
				
			$page = preg_replace ( '/\n+/', '<br />', $videoList ['page'] );
			if($cateID) {
				$page = str_replace ( 'searchallajax', 'search/label/'.$cateID, $page );
			} else {
				$page = str_replace ( 'searchallajax', 'search/label', $page );
			}
			$display = array (
					'result' => $dataList,
					'page' => $page 
			);
			echo json_encode ( $display );
		}
		die ();
	}

	public function search($keyword=null) {
		if(empty($keyword)) {
			return redirect(Config::get('app.url'))
			->with('noKeyword','No keyword');
		}
		$key = Input::get('q');
		if($keyword && $key) {
			$data1 = $this->mVideo->getVideoByKeyword($key);
			$data = $this->mVideo->getVideoDataList($data1['list']);
			
		} else {
			$object = new stdClass ();
			$object->name = 'Search all vieoes';
			$data = $object;
			return redirect(Config::get('app.url'));
		}
		$page = str_replace ( 'search/q?page', 'search/q?q=' . $key . '&page', $data1['paginate'] );
		//http://localhost/movie/search/q?page=2
		return View::make ( 'frontend.modules.label.search' )
		->with('data',$data)
		->with('paginate',$page);
	}
	
	/**
	 * get data for detail page or item or single page
	 * with playlist
	 */
	public function getSinglePage() {
		$segment = Request::segment ( 1 );
		$segment = substr ( $segment, 0, - 5 );
		$segment = substr ( $segment, - 9 );
		$num = Input::get ( 'num' ) ? Input::get ( 'num' ) : 1;
		
		/*update view*/
		$this->mVideo->updateVideoView(array('uniq_id'=>$segment));
		/*end update view*/
		
		$whereArr = array (
				'uniq_id' => $segment 
		);
		$getVideo = $this->mVideo->getVideoBy ( $whereArr );
		if (! empty ( $getVideo )) {
			// echo json_encode($getVideo);
			if ($num) {
				$object = new stdClass ();
				$object->title = $getVideo->video_title;
				$object->description = $getVideo->description;
				$object->length = $getVideo->length;
				$object->thumb = $this->mVideo->resizeImage ( $getVideo->thumb, 'w250-h200-p' );
				$object->image = $this->mVideo->resizeImage ( $getVideo->thumb, 's0' );
				
				
				$categoryArrs = explode(',', $getVideo->category);
				$CategoryQuery = $this->mVideo->getCategory($categoryArrs);
				$object->tag = @$CategoryQuery;
				$object->category = $getVideo->category;
				$object->views = $this->mVideo->vdo_number_format ( $getVideo->site_views );
				$object->featured = $getVideo->featured;
				$object->copyright = $getVideo->copyright;
				$object->allow_comments = $getVideo->allow_comments;
				$object->to_site_b = $getVideo->to_site_b;
				$object->playlist = $getVideo->playlist;
				$videoList = $object;
			}
		} else {
			$videoList = array (
					'error' => 1 
			);
		}
		
		return View::make ( 'frontend.partials.detail-page' )->with ( 'video', $videoList );
	}
	
	/**
	 * get data for detail page or item or single page
	 * with playlist
	 */
	public function getSinglePageJson() {
		header('Access-Control-Allow-Origin: *');
		//$json = urldecode ( Input::get ( 'json' ) );
		//$currentUrl = urldecode ( Input::get ( 'url' ) );
		//$image = urldecode ( Input::get ( 'image' ) );
		//$image = $this->mVideo->resizeImage ( $image, 'w100-h60-p' );
		$Category = urldecode ( Input::get ( 'c' ) );
		//$getPL = json_decode ( $json );
		//$num = Input::get ( 'num' ) ? Input::get ( 'num' ) : 1;
		
		/*get category*/
		$categoryArrs = array();
		$catLinks = '';
		if($Category) {
			$categoryArrs = explode(',', $Category);
			$CategoryQuery = $this->mVideo->getCategory($categoryArrs);
			$catLinks = '';
			if(!empty($CategoryQuery)) {
				foreach ($CategoryQuery as $cate) {
					$catLinks .= "<a href=\"" . Config::get('app.url') . "search/label/" . $cate->slug . "\">" . $cate->name . "</a>";
				}
			}
			$same_category_id = array_pop($categoryArrs);
			$videoRelated = $this->mVideo->getRelatedVideoList($same_category_id);
		} else {
			$listCur = $this->mVideo->getVideo();
			$videoRelated = $this->mVideo->queryVideoList($listCur);
		}
		/*End get category*/
		
		/*get relate post video*/
		
		/*Endget relate post video*/
		
			//$getList = $this->mVideo->getPlaylist($getPL,$num, $currentUrl, $image);
			$dataCategory = array('category'=>$catLinks);
			$dataRelate = array('related'=>$videoRelated);
			//$dataTopVideo = array('topVideo'=>$topVideo);
			$dataAll = array_merge($dataCategory, $dataRelate);
			echo json_encode ( $dataAll );
	}
	
	public function generateFeed($homeURL, $title, $version = '2.0', $items = array(), $category_data = '', $feed = '')
	{
		$mime_type = 'video/mp4';
		$rss_title = 'test';
		$output  = '<?xml version="1.0" encoding="UTF-8"?>';
		$output .= "\r\n";
		$output .= '<rss version="'. $version .'"';
		$output .= ' xmlns:media="http://search.yahoo.com/mrss/" xmlns:dcterms="http://purl.org/dc/terms/">';
		$output .= "\r\n";
		$output .= ' <channel>';
		$output .= "\r\n";


		$caturl = Config::get('app.url');

		$output .= '  <title>'. $this->clean_feed($rss_title) .' - RSS Feed</title>';
		$output .= "\r\n";
		$output .= '  <link>'. $caturl .'</link>';

			
			
		$output .= "\r\n";
	
		if ('' != $this->mVideo->getConfig ( 'homepage_description' )->value)
		{
			$output .= '  <description>'. $this->clean_feed($this->mVideo->getConfig ( 'homepage_description' )->value) .'</description>';
		}
		else
		{
			$output .= '  <description>'. $this->clean_feed($rss_title) .'</description>';
		}
	
		$output .= "\r\n";
	
		if (count($items) > 0)
		{
			foreach ($items as $item)
			{
				$desc_thumb = '';
				$date 	= date('Y-m-d', $item->added);
				$pubDate= date('r', $item->added);
				$title	= $this->clean_feed($item->video_title);
				$desc 	= $this->mVideo->getConfig ( 'homepage_description' )->value;
				$link = $this->mVideo->makeVideoLink ( $item->uniq_id, $item->video_title, null, $item->to_site_b );
					
				$desc_thumb = $this->mVideo->resizeImage ( $item->thumb, 's0' );
				$desc	= '<![CDATA['. $desc_thumb . $desc .']]>';
					
				$output .= ($feed == 'articles') ? '  <item>' : '  <item xmlns:media="http://search.yahoo.com/mrss/" xmlns:dcterms="http://purl.org/dc/terms/">';
				$output .= "\r\n";
					
				$output .= '   <title>'. $title .'</title>';
				$output .= "\r\n";
				$output .= '   <link>'. $link .'</link>';
				$output .= "\r\n";
				$output .= '   <description>'. $desc .'</description>';
				$output .= "\r\n";
				$output .= '   <pubDate>'. $pubDate .'</pubDate>';
				$output .= "\r\n";
					
				if ($feed != 'articles')
				{
					$output .= '   <media:content medium="video"';
					$output .= ($link != '') ? ' url="'. $link .'" ' : '';
					$output .= '';
					$output .= ($mime_type != '' ) ? ' type="'. $mime_type .'" ' : '';
					$output .= '';
					$output .= ' height="350" width="600" ';
					$output .= '>';
					$output .= "\r\n";
					$output .= '   <media:player url="'. $link .'" />';
					$output .= "\r\n";
					$output .= '   <media:title>'. $title .'</media:title>';
					$output .= "\r\n";
					$output .= '   <media:description>'. $desc .'</media:description>';
					$output .= "\r\n";
					$output .= '   <media:thumbnail url="'. $this->mVideo->resizeImage ( $item->thumb, 's0' ) .'" ';
					$output .= '/>';
					$output .= "\r\n";
					$output .= '   </media:content>';
					$output .= "\r\n";
				}
				$output .= '   <guid>'. $link .'</guid>';
				$output .= "\r\n";
				$output .= '  </item>';
				$output .= "\r\n";
			}
		
			$output .= ' </channel>';
			$output .= "\r\n";
			$output .= '</rss>';
		}
		return $output;
	}	
	/**
	 * create Rss reader*/
	public function getRss() {
		$rssVersion = '2.0';
		$category 	= (int) Input::get('c');
		$category 	= abs($category);
		$items 		= array();
		$rss_for	= Input::get('feed');
		
		@header("Content-Type: text/xml; charset=utf-8");
		$url = Config::get('app.url');
		$cat_data = array();
		$items = $this->mVideo->getVideo();
		echo $this->generateFeed($url , 'Khmer movie', $rssVersion, $items, $cat_data, $rss_for);
	}
	/**
	 * get all ajax type
	 * */
	public function getAjax () {
		header('Access-Control-Allow-Origin: *');
		$page = Input::get('p');
		switch ($page) {
			case 'home':
				$sectoin = Input::get('s');
				
				$showHome2 = array();
				$showHome3 = array();
				$showHome4 = array();
				$showHome5 = array();
				$showHome6 = array();
				if($sectoin == 1) {
					$dataList = $this->mVideo->getVideo ();
					$dataH = $this->mVideo->queryVideoSlideList ($dataList);
					$link1 = new stdClass ();
					$link1->name = 'New video';
					$link1->slug = '';
					$dataHome = array(
							'video' => 1,
							'home'=>$dataH,
							'name' => $link1
					);
					
				} else if ($sectoin == 2) {
				
				/*get video home page 2*/
					if($this->mVideo->getConfig ( 'home_post_1' )->value!=0) {
						$cateHome2 = $this->mVideo->getConfig ( 'home_post_1' )->value;
						$getHome2 = $this->mVideo->getVideoListsByTag ($cateHome2);
						if(!empty($getHome2['result_1'])) {
							$home2 = $this->mVideo->queryVideoSlideList ($getHome2['result_1']);
							$dataHome = array('home'=>$home2,'name' => $this->mVideo->getCategory(null,null,array('id'=>$cateHome2)));
						}
					}
				} else if ($sectoin == 3) {
					/*get video home page 3*/
					if($this->mVideo->getConfig ( 'home_post_2' )->value!=0) {
						$cateHome3 = $this->mVideo->getConfig ( 'home_post_2' )->value;
						$getHome3 = $this->mVideo->getVideoListsByTag ($cateHome3);
						if(!empty($getHome3['result_1'])) {
							$home3 = $this->mVideo->queryVideoSlideList ($getHome3['result_1']);
							$dataHome = array('home'=>$home3,'name' => $this->mVideo->getCategory(null,null,array('id'=>$cateHome3)));
						}
					}
				} else if ($sectoin == 4) {
					/*get video home page 4*/
					if($this->mVideo->getConfig ( 'home_post_3' )->value!=0) {
						$cateHome4 = $this->mVideo->getConfig ( 'home_post_3' )->value;
						$getHome4 = $this->mVideo->getVideoListsByTag ($cateHome4);
						if(!empty($getHome4['result_1'])) {
							$home4 = $this->mVideo->queryVideoSlideList ($getHome4['result_1']);
							$dataHome = array('home'=>$home4,'name' => $this->mVideo->getCategory(null,null,array('id'=>$cateHome4)));
						}
					}
				} else if ($sectoin == 5) {
				/*get video home page 5*/
					if($this->mVideo->getConfig ( 'home_post_4' )->value!=0) {
						$cateHome5 = $this->mVideo->getConfig ( 'home_post_4' )->value;
						$getHome5 = $this->mVideo->getVideoListsByTag ($cateHome5);
						if(!empty($getHome5['result_1'])) {
							$home5 = $this->mVideo->queryVideoSlideList ($getHome5['result_1']);
							$dataHome = array('home'=>$home5,'name' => $this->mVideo->getCategory(null,null,array('id'=>$cateHome5)));
						}
					}
				} else if ($sectoin == 6) {
				/*get video home page 6*/
					if($this->mVideo->getConfig ( 'home_post_5' )->value!=0) {
						$cateHome6 = $this->mVideo->getConfig ( 'home_post_5' )->value;
						$getHome6 = $this->mVideo->getVideoListsByTag ($cateHome6);
						if(!empty($getHome6['result_1'])) {
							$home6 = $this->mVideo->queryVideoSlideList ($getHome6['result_1']);
							$dataHome = array('home'=>$home6,'name' => $this->mVideo->getCategory(null,null,array('id'=>$cateHome6)));
						}
					}
				}
				
				$dataAll = $dataHome;
				//$dataAll = array_merge($dataDefualt, $showHome2,$showHome3,$showHome4,$showHome5,$showHome6);
				break;
			case 'topvideo':
				/*get top video list*/
				$dataAll = $this->mVideo->getTopVideoList();
				/*end get top video list*/
				break;
			case 'getmusic':
				$url = Input::get('id');
				if(!$url)
					die('please put url or id of your blog');
				$label = Input::get('label') ? '-/'. Input::get('label') :'';
				$limit = Input::get('l') ? Input::get('l') :10;
				$file = 'http://www.blogger.com/feeds/' . $url . '/posts/default/' . $label . '?max-results=' . $limit;
				// Load specified XML file or report failure
				$xml = simplexml_load_file($file) or die("Unable to load XML file!");
				// Load blog entries
				$xml = $xml->entry;
				$lists = '';
				if(!empty($xml)) {
					$a=array(
						"solid-red shadow-red",
						"solid-orange-2 shadow-orange",
						"solid-green shadow-green",
						"solid-blue-2 shadow-blue",
						"solid-red-2 shadow-red",
						"solid-darkgreen shadow-green",
						"img-darkwood shadow-black",
						"solid-darkblue shadow-blue",
						"solid-violetred shadow-red",
						"solid-red shadow-red",
						"solid-orange-2 shadow-orange",
					);
					
					
					foreach ($xml as $list) {
						$random_keys=array_rand($a,3);
						$class_rand =  $a[$random_keys[0]];
						$title = $list->title;
						//$link = $list->link;
						$link = $list->link;
						foreach ($link as $nLlink) {
							$relLink = (string) $nLlink['rel'];
							if($relLink =='alternate') {
								$getLink = (string) $nLlink['href'];
							}
						}
						$image = $list->children('http://search.yahoo.com/mrss/')->thumbnail->attributes();
        				@$thumbnail = $image['url'];
						$lists .= '<div class="tile-bt '.$class_rand.' mt-tab mt-loadcontent columns" id="metrotab">';
						$lists .= '<a href="'.$getLink.'" title="'.$list->title.'" target="_blank">';
						$lists .= '<img src="'.str_replace("s72-c", "s160-h160-c", $thumbnail).'" width="125" />';
						$lists .= '<span class="post-title light-text" style="">'.$this->rm($list->title, 45).'</span>';
						$lists .= '</a>';
						$lists .= '</div>';
					}
				}
				echo $lists;
				die;
				break;
			case 'search':
					/*get top video list*/
					$dataAll = $this->mVideo->getTopVideoList();
					/*end get top video list*/
					break;
		}
		echo json_encode($dataAll);
		die;
	}
	
	public function rm($article, $char) {
		$article = preg_replace ( "/<img[^>]+\>/i", "(image)", $article );
		$article = strip_tags($article);
		$article = preg_replace ( "/(\r?\n){2,}/", "\n\n", $article );
		if (strlen ( $article ) > $char) {
			return substr ( $article, 0, $char ) . '...';
		} else
			return $article;
	}
	
	/*page*/
	public function page() {
		$segment = Request::segment ( 2 );
		$segment = preg_replace('/.html/', '', $segment);
		$wherePage = array(
			'status'=>1,
			'page_name'=>$segment,
		);
		$dataPage = $this->mVideo->getPage(null,$wherePage);
		return View::make ( 'frontend.modules.page.index' )->with ( 'data', $dataPage );
	}
	public function pageAdd() {
		return View::make ( 'frontend.modules.page.add' )->with ( 'data', $dataPage );
	}
	public function getSignOut() {
		Session::flush ();
		return Redirect::route ( '/' );
	}
}
