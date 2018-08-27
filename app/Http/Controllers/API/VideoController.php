<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Video;
use App\Http\Resources\VideoCollection;
use App\Http\Resources\Video as VideoResource;

class VideoController extends Controller
{
	public function index(Request $request)
	{
		return new VideoCollection(Video::orderBy('created_at', 'desc')->paginate(9));
	}

	public function add_category($id, Request $request)
	{
		$category_id = $request->category_id;

		$video = Video::find($id);
		$category = Category::find($category_id);

		if ($video->categories()->find($category_id) == null)
		{
			$video->categories()->attach($category_id);
		}
		
		return new VideoResource($video);
	}

	public function remove_category($id, Request $request)
	{
		$category_id = $request->category_id;
		$video = Video::find($id);
		$category = Category::find($category_id);

		if ($video->categories()->find($category_id) != null)
		{
			$video->categories()->detach($category_id);
		}
		
		return new VideoResource($video);
	}
}