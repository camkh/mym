<?php

class BePageController extends BaseController {

	const PAGE_USER = 1;
	const PAGE_WEBSITE = 2;

	public $m_page;
	protected $modUserGroup;

	function __construct(){
		$this->modUserGroup = new UserGroup();
		$this->m_page = new MPage();
	}

	/**
	 * listPage: listing all pages
	 * @return page object
	 */
	public function listPage(){
		if(!$this->modUserGroup->isAccessPermission('admin/pages')){
			return Redirect::to('admin/deny-permisson-page');
		}
		$pageForUser = $this->m_page
				->where('page_belong_to', self::PAGE_USER)
				->orderBy('id','DESC')
				->paginate(Config::get('constants.BACKEND_PAGINATION_PAGE'));

		$pageForWebsite = $this->m_page
				->where('page_belong_to', self::PAGE_WEBSITE)
				->orderBy('id','DESC')
				->paginate(Config::get('constants.BACKEND_PAGINATION_PAGE'));

		return View::make('backend.modules.page.list')
			->with('pagesForWebsite', $pageForWebsite)
			->with('pagesForUser', $pageForUser);
	}

	/**
	 * createPage: this function using for create a new page
	 * @return true if the page has been created successfully
	 * @access public
	 */
	public function createPage($belong_to = null){
		if(!$this->modUserGroup->isAccessPermission('admin/create-page')){
			return Redirect::to('admin/deny-permisson-page');
		}
		if(Input::has('btnSubmit')){
			if(!$this->modUserGroup->isModifyPermission('admin/create-page')){
				return Redirect::to('admin/pages')
				->with('ERROR_MODIFY_MESSAGE','You do not have permission to modify!');
			}
			$rules = array(
					'title_en' => 'required|unique:m_page',
					'title_km'=>'required|unique:m_page'
			);
			$validator = Validator::make(Input::all(), $rules);
			if ($validator->passes()) {
				$data = $this->prepareDataBind('add');
				if ($belong_to == self::PAGE_WEBSITE) {
					$data['page_belong_to'] = self::PAGE_WEBSITE;
					$data['position'] = Input::get('page_position');
				} else {
					$data['page_belong_to'] = self::PAGE_WEBSITE;
				}

				$this->m_page->insert($data);
				return Redirect::to('admin/pages')
					->with('SECCESS_MESSAGE','Page has been created successfully');
			}else {
				return Redirect::to('admin/create-page')
				->withInput()
				->withErrors($validator);
			}
		}

		$pageBelongTo = ($belong_to == self::PAGE_WEBSITE) ? self::PAGE_WEBSITE : self::PAGE_USER; 
		return View::make('backend.modules.page.add')
			->with('pageBelongTo', $pageBelongTo);
	}

	/**
	 *
	 * eiditPage: this function using for updating an existing page
	 * @param id: the id of page
	 * @return true: if an existing page has been updated successfully
	 * @access public
	 */
	public function editPage($id=null, $belong_to = null){
		if(!$this->modUserGroup->isAccessPermission('admin/edit-page')){
			return Redirect::to('admin/deny-permisson-page');
		}
		$id = (integer)$id;
		if(Input::has('btnSubmit')){
			if(!$this->modUserGroup->isModifyPermission('admin/edit-page')){
				return Redirect::to('admin/pages')
				->with('ERROR_MODIFY_MESSAGE','You do not have permission to modify!');
			}
			$rules = array(
					'title_en' => 'required',
					'title_km'=>'required'
			);
			$validator = Validator::make(Input::all(), $rules);
			$id = Input::get('id');
			if ($validator->passes()) {
				$data = $this->prepareDataBind('edit');
				if (Input::get('pageAsWeb') == self::PAGE_WEBSITE) {
					$data['position'] = Input::get('page_position');
				}
				$this->m_page->where('id','=',$id)->update($data);
				return Redirect::to('admin/pages')
				->with('SECCESS_MESSAGE','Page has been updated successfully');
			}else {
				return Redirect::to('admin/edit-page/'.$id)
				->withInput()
				->withErrors($validator);
			}
		}
		$pages = $this->m_page->where('id','=',$id)->first();
		$pageBelongTo = ($belong_to == self::PAGE_WEBSITE) ? self::PAGE_WEBSITE : self::PAGE_USER; 
		return View::make('backend.modules.page.edit')
			->with('pages',$pages)
			->with('pageBelongTo', $pageBelongTo);
	}

	/**
	 *
	 * deletePage: this function using for deleting an existing page
	 * @param id: the id of page
	 * @return true: if an existing page has been deleted successfully
	 * @access public
	 */
	public function deletePage($id = null){
		if(!$this->modUserGroup->isModifyPermission('admin/delete-page')){
				return Redirect::to('admin/pages')
				->with('ERROR_MODIFY_MESSAGE','You do not have permission to modify!');
		}
		$id = (integer) $id;
		$this->m_page->where('id','=',$id)->delete();
		return Redirect::to('admin/pages')
		->with('SECCESS_MESSAGE','Page has been deleted successfully');
	}

	/**
	 *
	 * isEnablePage: this function using for being disable and enable page
	 * @param status:the status of page (1 or 0)
	 * @param id: the id of page
	 * @return true: if the page has been changed status to 1 or 0
	 * @access public
	 */
	public function isEnablePage($status=null,$id=null){
		if(!$this->modUserGroup->isModifyPermission('admin/status-page')){
				return Redirect::to('admin/pages')
				->with('ERROR_MODIFY_MESSAGE','You do not have permission to modify!');
		}
		$id = (integer) $id;
		$status = (integer) $status;
		$status = (1==$status) ? 0 : 1;
		$this->m_page->where('id','=',$id)->update(array('status'=>$status));
		return Redirect::to('admin/pages')
		->with('SECCESS_MESSAGE','Status has been changed successfully');
	}

	/**
	 *
	 * prepareDataBind: this function using for preparing data before inserting to database
	 * @param param: the parameter of edit and add
	 * @return data array
	 * @access private
	 */
	private function prepareDataBind($param){
		$data = array(
			'title_en'=>Input::get('title_en'),
			'title_km'=>Input::get('title_km'),
			'short_desc_en' => Input::get('desc_en'),
			'short_desc_km' => Input::get('desc_km')
		);
		if($param == 'add'){
			$data['create_at'] = date('Y-m-d');
			$data['sys_user_id'] = Session::get('SESSION_USER_ID');
		}elseif ($param == 'edit'){
			$data['update_at'] = date('Y-m-d');
		}

		return $data;
	}

}
