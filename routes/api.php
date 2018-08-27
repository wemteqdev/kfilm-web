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
	
});

Route::post('auth', 'UserController@auth');
Route::get('videos', 'VideoController@index');
Route::get('categories', 'CategoryController@index');
Route::get('images', 'ImageController@index');

Route::group(['middleware' => ['auth:api', 'role:admin']], function(){
	Route::post('categories/{category_id}/add_video', ['as'=> 'admin.categories.add_video', 'uses' => 'CategoryController@add_video']);
	Route::delete('categories/{category_id}/remove_video', ['as'=> 'admin.categories.remove_video', 'uses' => 'CategoryController@remove_video']);

	Route::post('videos/{video_id}/add_category', ['as'=> 'admin.categories.add_video', 'uses' => 'VideoController@add_category']);
	Route::delete('videos/{video_id}/remove_category', ['as'=> 'admin.categories.remove_video', 'uses' => 'VideoController@remove_category']);

	Route::post('videos/{video_id}/add_group', ['as'=> 'admin.categories.add_group', 'uses' => 'VideoController@add_group']);
	Route::delete('videos/{video_id}/remove_group', ['as'=> 'admin.categories.remove_group', 'uses' => 'VideoController@remove_group']);
});