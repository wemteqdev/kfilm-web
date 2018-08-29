<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Video;
use App\Models\Category;
use App\Models\Group;
use App\Http\Resources\VideoCollection;
use App\Http\Resources\Video as VideoResource;

class VideoController extends Controller
{
	public function index(Request $request)
	{
		$keyword = $request->q;
		$videos = Video::active();

		if( isset($keyword) )
		{
			if( strlen($keyword) >= 2 )
			{
				$videos = $videos->where('name', 'like', '%'.$keyword.'%')
							 ->orWhere('description', 'like', '%'.$keyword.'%');
			} else{
				return response()->json(['error'=>'Query length must be greater than 2'], 403);
			}
		}

		$videos = $videos->orderBy('created_at', 'desc');
		return new VideoCollection($videos->paginate(9));
	}

	public function add_category($id, Request $request)
	{
		$category_slug = $request->category_slug;

		$video = Video::find($id);
		$category = Category::where('slug', $category_slug)->first();

		if ($video->categories()->find($category->id) == null)
		{
			$video->categories()->attach($category->id);
		}
		
		return new VideoResource($video);
	}

	public function remove_category($id, Request $request)
	{
		$category_slug = $request->category_slug;
		$video = Video::find($id);
		$category = Category::where('slug', $category_slug)->first();

		$video->categories()->detach($category->id);
		
		return new VideoResource($video);
	}

	public function add_group($id, Request $request)
	{
		$group_slug = $request->group_slug;

		$video = Video::find($id);
		$group = Group::where('slug', $group_slug)->first();

		if ($video->groups()->find($group->id) == null)
		{
			$video->groups()->attach($group->id);
		}
		
		return new VideoResource($video);
	}

	public function remove_group($id, Request $request)
	{
		$group_slug = $request->group_slug;
		$video = Video::find($id);
		$group = Group::where('slug', $group_slug)->first();

		$video->groups()->detach($group->id);
		
		return new VideoResource($video);
	}
}