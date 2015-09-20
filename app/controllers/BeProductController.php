<?php
class BeProductController extends BaseController {
	const PRODUCT_FREE_PAGE = 'backend.modules.product.list_products_free';
	const PARTHS = 'backend.modules.product';
	const PRODUCT_LIST = 'backend.modules.product.list_products';
	const PRODUCT_PREMIUM_PAGE = 'backend.modules.product.list_products_premium';
	const FREE_USER_ACCOUNT = 1;
	const PREMIUM_USER_ACCOUNT = 2;
	const DISABLE_STATUS = 0;
	const ENABLE_STATUS = 1;
	private $mod_product;
	protected $mod_category;
	protected $mod_store;
	protected $mod_page;
	const FREE_ACCOUNT = 1;
	const ENTERPRISE_ACCOUNT = 2;
	const RESERVATION_PRODUCTS = 'reservation';
	const UNPUBLISH_PRODUCTS = 'unpublish';
	const LICENSE_PRODUCTS = 'license';
	const ALL_PRODUCTS = 'all';
	function __construct() {
		$this->mod_product = new Product ();
		$this->mod_category = new MCategory ();
		$this->mod_store = new Store ();
		$this->mod_page = new MPage ();
	}
	
	/**
	 * Add new product
	 *
	 * @access public
	 * @return Response
	 */
	public function addProduct() {
		$userID = Session::get ( 'currentUserId' );
		if (Input::has ( 'btnAddProduct' )) {
			$files = Input::file ( 'file' );
			$filesQuotation = Input::file ( 'quotation' );
			$quotationFile = '';
			if (! empty ( $filesQuotation )) {
				$quotationFile = $this->doUploadQaotation ( $filesQuotation );
			}
			if (! empty ( $files )) {
				$jsonNewFileName = $this->doUploadImages ( $files );
			}
			
			$products = $this->prepareDataBindProducts ( $jsonNewFileName, $quotationFile );
			
			$productId = $this->mod_product->persistToProduct ( $products );
			
			return Redirect::to ( 'products/list' );
		}
		
		$listCategories = $this->mod_category->fetchCategoryTree ();
		
		return View::make ( self::PARTHS . '.new_product' )
		->with ( 'categoryTree', $listCategories );
	}
	
	/**
	 * Update a product by product id
	 *
	 * @param int $product_id        	
	 * @access public
	 * @return void
	 */
	public function editProduct($product_id) {
		if (Input::has ( 'btnAddProduct' )) {
			
			$files = Input::file ( 'file' );
			$hiddenFilesArr = Input::get ( 'hiddenFiles' );
			$delimagArr = Input::get ( 'delimag' );
			$filesQuotation = Input::file ( 'quotation' );
			$quotationFile = '';
			$jsonNewFileName = '';
			if (! empty ( $filesQuotation )) {
				$quotationFile = $this->doUploadQaotation ( $filesQuotation );
			}
			if (! empty ( $files [0] )) {
				$jsonNewFileName = $this->doUploadImages ( $files, $hiddenFilesArr );
			} else {
				/* get old image */
				$newImg = array ();
				if (! empty ( $hiddenFilesArr )) {
					foreach ( $hiddenFilesArr as $oldImg ) {
						$newImg [] ['pic'] = $oldImg;
					}
				}
				/* end get old image */
				$jsonNewFileName = json_encode ( $newImg );
			}
			
			/* remove old image */
			if (! empty ( $delimagArr )) {
				$destinationPath = base_path () . '/public/upload/product/';
				foreach ( $delimagArr as $delImg ) {
					$oldName = $destinationPath . '/' . $delImg;
					$thumb = $destinationPath . '/thumb/' . $delImg;
					if (File::exists ( $oldName )) {
						File::delete ( $oldName, $thumb );
					}
				}
			}
			/* end remove old image */
			
			$products = $this->prepareDataBindProducts ( $jsonNewFileName, $quotationFile, false );
			
			$this->mod_product->updateToProduct ( $products, $product_id );
			
			return Redirect::to ( 'products/list' );
		}
		
		$userID = Session::get ( 'currentUserId' );
		$getUserStore = $this->mod_store->getUserStore ( $userID );
		$product = $this->mod_product->findProductById ( $product_id );
		
		if (self::FREE_ACCOUNT === ( int ) Session::get ( 'currentUserAccountType' )) {
			$listCategories = $this->mod_category->fetchCategoryTree ();
		} else {
			$listCategories = $this->mod_product->getCategoryTree ( $userID, $parent = 0, $level = 0, $product->s_category_id );
		}
		
		$productTransferTypes = $this->mod_product->findAllTransferType ();
		$productCondictions = $this->mod_product->findAllCondition ();
		return View::make ( self::PARTHS . '.edit_product' )->with ( 'proTransferType', $productTransferTypes->data )->with ( 'productCondition', $productCondictions->data )->with ( 'categoryTree', $listCategories )->with ( 'product', $product )->with ( 'dataStore', $getUserStore );
	}
	public function listProduct() {
		$products = $this->searchOperation ( self::FREE_USER_ACCOUNT );
		return View::make ( self::PRODUCT_LIST )->with ( 'products', $products );
	}
	public function listAllProductsFree() {
		$products = $this->searchOperation ( self::FREE_USER_ACCOUNT );
		
		return View::make ( self::PRODUCT_FREE_PAGE )->with ( 'products', $products );
	}
	public function listAllProductsPremium() {
		$products = $this->searchOperation ( self::PREMIUM_USER_ACCOUNT );
		
		return View::make ( self::PRODUCT_PREMIUM_PAGE )->with ( 'products', $products );
	}
	private function searchOperation($accountType) {
		$tblProduct = Config::get ( 'constants.TABLE_NAME.PRODUCT' );
		$tblUser = Config::get ( 'constants.TABLE_NAME.USER' );
		$qb = DB::table ( $tblProduct . ' AS pro' );
		// $qb->join($tblUser .' AS u', 'u.id','=', 'pro.user_id');
		// $qb->select(DB::raw('*'));
		// $qb->where('account_type', $accountType);
		
		if (Input::has ( 'title' )) {
			$qb->where ( 'pro.title', Input::get ( 'title' ) );
		}
		
		if (Input::has ( 'client_name' )) {
			// $qb->where('u.name', Input::get('client_name'));
		}
		
		if (Input::has ( 'date_create' )) {
			// $qb->where('pro.publish_date', Input::get('date_create'));
		}
		
		if (Input::has ( 'status' )) {
			$status = (Input::get ( 'status' ) == 1) ? 1 : 0;
			$qb->where ( 'pro.admin_status', $status );
		}
		
		$qb->orderBy ( 'pro.id', 'desc' );
		$products = $qb->paginate ( 10 );
		
		return $products;
	}
	public function disableAndEnableProduct($page, $productid, $status) {
		if ($status == 2) {
			$this->statusOperation ( $productid, self::DISABLE_STATUS );
		}
		
		if ($status == 1) {
			$this->statusOperation ( $productid, self::ENABLE_STATUS );
		}
		$redirectPage = ($page === 'free') ? 'admin/products/free' : 'admin/products/premium';
		
		return Redirect::to ( $redirectPage )->with ( 'SMG_SUCCESS', 'Data has been saved successfully!' );
	}
	public function deleteProduct($page, $productid) {
		$tblProduct = Config::get ( 'constants.TABLE_NAME.PRODUCT' );
		$product = DB::table ( $tblProduct . ' AS pro' )->where ( 'id', '=', $productid )->select ( DB::raw ( 'pro.id as pro_id, pro.*' ) )->first ();
		$pictures = json_decode ( $product->pictures, true );
		$this->deletePictures ( $pictures );
		$this->deleteOperation ( $productid );
		
		$redirectPage = ($page === 'free') ? 'admin/products/free' : 'admin/products/premium';
		return Redirect::to ( $redirectPage )->with ( 'SMG_SUCCESS', 'Record has been deleted successfully!' );
	}
	private function statusOperation($productid, $status) {
		$tblProduct = Config::get ( 'constants.TABLE_NAME.PRODUCT' );
		$products = DB::table ( $tblProduct )->where ( 'id', '=', $productid )->update ( array (
				'admin_status' => $status 
		) );
	}
	private function deleteOperation($productid) {
		$tblProduct = Config::get ( 'constants.TABLE_NAME.PRODUCT' );
		$products = DB::table ( $tblProduct )->where ( 'id', '=', $productid )->delete ();
	}
	private function deletePictures($pictures) {
		if (! empty ( $pictures )) {
			$destinationPath = base_path () . '/public/upload/product/';
			$destinationThumb = $destinationPath . 'thumb/';
			foreach ( $pictures as $file ) {
				if (! empty ( $file )) {
					File::delete ( $destinationPath . $file ['pic'] );
					File::delete ( $destinationThumb . $file ['pic'] );
				}
			}
		}
	}
}