<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['auth:api']], function(){
	Route::get('user', 'UserController@index');
	Route::get('user/subscriptions', 'UserController@subscriptions');
	Route::get('user/invoices', 'UserController@invoices');
});

Route::post('user/login', 'UserController@login');
Route::post('user/register', 'UserController@register');

Route::get('videos', 'VideoController@index');
Route::get('categories', 'CategoryController@index');
Route::get('images', 'ImageController@index');
Route::get('series', 'SeriesController@index');
Route::get('series/{id_or_slug}', 'SeriesController@show');
Route::get('videos/{id_or_slug}', 'VideoController@show');
Route::get('categories/{id_or_slug}', 'CategoryController@show');
Route::get('categories/{id_or_slug}/videos', 'CategoryController@videos');
Route::get('tags', 'TagController@index');
Route::get('products', 'ProductController@index');

Route::group(['middleware' => ['auth:api']], function(){
	Route::get('pro/videos', 'VideoController@index');
	Route::get('pro/categories', 'CategoryController@index');
	Route::get('pro/images', 'ImageController@index');
	Route::get('pro/series', 'SeriesController@index');
	Route::get('pro/series/{id_or_slug}', 'SeriesController@show');
	Route::get('pro/videos/{id_or_slug}', 'VideoController@show');
	Route::get('pro/categories/{id_or_slug}', 'CategoryController@show');
	Route::get('pro/categories/{id_or_slug}/videos', 'CategoryController@videos');
	Route::get('pro/tags', 'TagController@index');
	Route::get('pro/products', 'ProductController@index');
});

Route::group(['middleware' => ['auth:api']], function(){
	Route::post('plans/{plan_id}/subscribe', ['as'=>'plans.subscribe', 'uses' => 'PlanController@subscribe']);
	Route::delete('plans/{plan_id}/cancel', ['as'=>'plans.cancel', 'uses' => 'PlanController@cancel']);
});

Route::group(['middleware' => ['auth:api', 'role:admin']], function(){
	Route::post('categories/{category_id}/add_video', ['as'=> 'admin.categories.add_video', 'uses' => 'CategoryController@add_video']);
	Route::delete('categories/{category_id}/remove_video', ['as'=> 'admin.categories.remove_video', 'uses' => 'CategoryController@remove_video']);

	Route::post('videos/{video_id}/add_category', ['as'=> 'admin.videos.add_category', 'uses' => 'VideoController@add_category']);
	Route::delete('videos/{video_id}/remove_category', ['as'=> 'admin.videos.remove_category', 'uses' => 'VideoController@remove_category']);

	Route::post('videos/{video_id}/add_group', ['as'=> 'admin.videos.add_group', 'uses' => 'VideoController@add_group']);
	Route::delete('videos/{video_id}/remove_group', ['as'=> 'admin.videos.remove_group', 'uses' => 'VideoController@remove_group']);

	Route::post('videos/{video_id}/add_tag', ['as'=> 'admin.videos.add_tag', 'uses' => 'VideoController@add_tag']);
	Route::delete('videos/{video_id}/remove_tag', ['as'=> 'admin.videos.remove_tag', 'uses' => 'VideoController@remove_tag']);
});