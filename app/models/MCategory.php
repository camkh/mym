<?php

class MCategory extends Eloquent{

	public function menuList($parent=0,$level=0,$userHome='', $atcitve='') {
        $response = new stdClass();
		try {
            $where = array(
                'parent_id' => $parent
            );
			$result = DB::table('videos_categories')
            ->select('*')
			->where($where)
			->get();
            $userMenus = "";
			//$userMenus .= "<ul class='sf-menu' id='menunav'>";
            $homeUrl = $userHome;
            if(!empty($result)) {
    			foreach($result as $userMenu){
    				$setActive = '';
    				if($atcitve == $userMenu->slug) {
    					$setActive = 'active';
    				}
                    if($level ==0) {
                        $id = 'item-'.$userMenu->id.$userMenu->id;
                    } else {
                        $id = 'item-'.$userMenu->id;
                    }
    				$userMenus .= "<li class='$setActive'>\n";
                        $menuName = $userMenu->name;                        
    					$userMenus .= "<a href='{$homeUrl}search/label/{$userMenu->slug}'>{$menuName}</a>\n";
    
    					// Run this function again (it would stop running when the mysql_num_result is 0
    					$userMenus .= $this->menuSubList($userMenu->id,$level+1,$userHome,$atcitve);
    				$userMenus .= "</li>\n";
    			} 
            }
            //$userMenus .= "</ul>\n";
            return $userMenus;
		}catch (\Exception $e){
			$response->errorMsg = $e->getMessage();
		}
        return $response;
    }
 
    /**
     * Get User sub category
     * @method menuUserList
     * @return string
     * @author Socheat Ngann
     */
    public function menuSubList($parent=0,$level=0,$homeUrl='',$atcitve='') {
        $response = new stdClass();
		try {
            $where = array(
                'parent_id' => $parent
            );
			$result = DB::table('videos_categories')
            ->select('*')
			->where($where)
			->get();
			$userMenus = "";
			if(!empty($result)) {
				$count = count($result);
				$userMenus .= '<span class="caption blue">+</span>';
			}
			$userMenus .= "<ul>\n";
            if(!empty($result)) {
    			foreach($result as $userMenu){
    				$setActive = '';
    				
    				if($atcitve == $userMenu->slug) {
    					$setActive = 'active';
    				}
                    if($level ==0) {
                        $id = 'item-'.$userMenu->id.$userMenu->id;
                    } else {
                        $id = 'item-'.$userMenu->id;
                    }
                    $id_level = $level+1;
    				$userMenus .= "<li class='$setActive'>\n";
                        $menuName = $userMenu->name; 
    					$userMenus .= "<a href='{$homeUrl}search/label/{$userMenu->slug}'>{$menuName}</a>\n";
    
    					// Run this function again (it would stop running when the mysql_num_result is 0
    					$userMenus .= $this->menuSubList($userMenu->id,$level+1,$homeUrl);
    				$userMenus .= "</li>\n";
    			} 
            }
            $userMenus .= "</ul>\n";
            return $userMenus;
		}catch (\Exception $e){
			$response->result = 0;
			$response->errorMsg = $e->getMessage();
		}
        return $response;
    }
    
    /**
     * Get User Page
     * @method menuUserList
     * @return string
     * @author Socheat Ngann
     */
     public function menuUserPage($userID, $position=1,$getUserUrl='') {
        $response = new stdClass();
		try {
            $where = array(
                'status' => 1,
                'user_id' => $userID,
                'type' => 'static',
                'position' => $position
            );
			$result = DB::table(Config::get('constants.TABLE_NAME.S_PAGE'))
            ->select('*')
			->where($where)
			->get();
            $userMenus = "";
            if(!empty($result)) {
    			foreach($result as $userMenu){
    				$userMenus .= "<li class='pp-item pp3-item item-{$userMenu->id}' data-id='{$userMenu->id}'>\n";
                        $menuName = $userMenu->title; 
    					$userMenus .= "<a href='{$getUserUrl}/p/{$userMenu->id}'>{$menuName}</a>\n";
    				$userMenus .= "</li>\n";
    			} 
            }
            return $userMenus;
		}catch (\Exception $e){
			$response->result = 0;
			$response->errorMsg = $e->getMessage();
		}
        return $response;
    } 


    public function getClientType(){
    	try {
			$result = DB::table(Config::get('constants.TABLE_NAME.CLIENT_TYPE'))
			->select('*')
			->orderBy('id','DESC')
			->get();
		}catch (\Exception $e){
		  $result = array();
			Log::error('Message: '.$e->getMessage().' File:'.$e->getFile().' Line'.$e->getLine());
		}
		return $result;
    }


    public function getProductTransfterType(){
    	try {
			$results = DB::table(Config::get('constants.TABLE_NAME.PRODUCT_TRANSFER_TYPE'))
			->select('*')
			->get();
		}catch (\Exception $e){
		  $result = array();
			Log::error('Message: '.$e->getMessage().' File:'.$e->getFile().' Line'.$e->getLine());
		}
		return $results;
    }



    public function getMainCategoriesSupermarket($parent_id){
    	$response = new stdClass();
		try {
			$result = DB::table(Config::get('constants.TABLE_NAME.MARKET'))
			->select('*')
			->where('market_type','=', $parent_id)->get();
			$response->result = $result;
		}catch (\Exception $e){
			$response->result = 0;
			$response->errorMsg = $e->getMessage();
		}
		return $response;
    }
}
