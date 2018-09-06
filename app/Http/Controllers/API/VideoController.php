<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Video;
use App\Models\Category;
use App\Models\History;
use App\Models\Group;
use App\Http\Resources\VideoCollection;
use App\Http\Resources\Video as VideoResource;
use Illuminate\Support\Facades\DB;
use App\Enums\VideoType;
class VideoController extends Controller
{
	public function index(Request $request)
	{
		$keyword_param = $request->q;
		$tag_param = $request->tag; // slug
		$view_param = $request->view; // hot, popular, trending, recent
		$limit_param = $request->limit;
		$type_param = $request->type; // normal, featured, promotion, recommended

		$videos = Video::published();
		if ( isset($type_param) )
		{
			$videos = $videos->where('type', VideoType::getValue($type_param));
		}

		if( isset($tag_param) )
		{
			$videos = $videos->withAnyTag($tag_param);
		}

		if( isset($keyword_param) )
		{
			if( strlen($keyword_param) >= 2 )
			{
				$videos = $videos->where('name', 'like', '%'.$keyword_param.'%')
							 ->orWhere('description', 'like', '%'.$keyword_param.'%');
			} else{
				return response()->json(['error'=>'Query length must be greater than 2'], 403);
			}
		}

		if ($view_param == "recent"){
			$videos = $videos->orderBy('created_at', 'desc');
		}elseif($view_param == "hot"){
			$videos = $videos->orderBy('views_count_last_30days', 'desc');
		}elseif($view_param == "popular"){
			$videos = $videos->orderBy(DB::raw("views_count + views_count_last_30days"), 'desc');
		}elseif($view_param == "trending"){
			$videos = $videos->orderBy('views_count_last_7days', 'desc');
		}

		if( isset($limit_param) )
		{
			$videos = $videos->take($limit_param)->get();
		}else{
			$videos = $videos->paginate(9);
		}

		return new VideoCollection($videos);
	}

	public function show($id_or_slug)
	{
		$video = Video::find($id_or_slug);

		if($video==null){
			$video = Video::where('slug', $id_or_slug)->firstorfail();
		}
		
		$video->addView();
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
		if( $group == null )
		{
			$group = Group::create(['name'=>$group_slug]);
		}

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

	public function like($id_or_slug, Request $request)
	{
	
		// $user = auth('api')->user();
		$user = $request->user();
		$video = Video::find($id_or_slug);

		if($video==null){
			$video = Video::where('slug', $id_or_slug)->firstorfail();

		}

		$user->like($video);

		return new VideoResource($video);
	}

	public function unlike($id_or_slug, Request $request)
	{
		$user = $request->user();
		$video = Video::find($id_or_slug);

		if($video==null){
			$video = Video::where('slug', $id_or_slug)->firstorfail();

		}

		$user->unlike($video);

		return new VideoResource($video);
	}

	public function add_history($id_or_slug, Request $request)
	{
		$user = $request->user();
		$video = Video::find($id_or_slug);

		if($video==null){
			$video = Video::where('slug', $id_or_slug)->firstorfail();

		}

		$user->create_video_watch_history($video->id);

		return new VideoResource($video);
	}
}