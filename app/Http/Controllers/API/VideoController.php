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
		$category_slug = $request->category;
		$tags = $request->tags;
		$group_slug = $request->group;
		$series_slug = $request->series;

		$videos = Video::active();

		if( isset($tags) )
		{
			$videos = Video::withAnyTags($tags);

		}

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

	public function show($id_or_slug)
	{
		$video = Video::find($id_or_slug);

		if($video==null){
			$video = Video::where('slug', $id_or_slug)->firstorfail();
		}
		
		return new VideoResource($video);
	}

	public function add_category($id, Request $request)
	{
		$category_slug = $request->category;

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
		$category_slug = $request->category;
		$video = Video::find($id);
		$category = Category::where('slug', $category_slug)->first();

		$video->categories()->detach($category->id);
		
		return new VideoResource($video);
	}

	public function add_group($id, Request $request)
	{
		$group_slug = $request->group;

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
		$group_slug = $request->group;
		$video = Video::find($id);
		$group = Group::where('slug', $group_slug)->first();

		$video->groups()->detach($group->id);
		
		return new VideoResource($video);
	}

	public function add_tag($id, Request $request)
    {
        $video = Video::findOrFail($id);
		
        if(isset($request->tag))
        {
            $video->tag($request->tag);
        }
        
        return new VideoResource($video);
	}
	
	public function remove_tag($id, Request $request)
    {
        $video = Video::findOrFail($id);
        $video->untag($request->tag);

        return new VideoResource($video);
    }
}