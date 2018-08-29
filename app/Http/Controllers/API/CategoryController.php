<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Video;
use App\Http\Resources\CategoryCollection;
use App\Http\Resources\Category as CategoryResource;

class CategoryController extends Controller
{
	public function index(Request $request)
	{
		return new CategoryCollection(Category::all());
	}

	public function show($id_or_slug)
	{
		$category = Category::find($id_or_slug);

		if($category==null){
			$category = Category::where('slug', $id_or_slug)->firstorfail();
		}
		
		$category->addView();
		
		return new CategoryResource($category);
	}

	public function add_video($id, Request $request)
	{
		$video_id = $request->video_id;
		$category = Category::find($id);
		$video = Video::find($video_id);

		if ($category->videos()->find($video_id) == null)
		{
			$category->videos()->attach($video_id);
		}
		
		return 	new CategoryResource($category);
	}

	public function remove_video($id, Request $request)
	{
		$video_id = $request->video_id;
		$category = Category::find($id);
		$video = Video::find($video_id);

		if ($category->videos()->find($video_id) != null)
		{
			$category->videos()->detach($video_id);
		}
		
		return 	new CategoryResource($category);
	}
}
