<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Video;
use App\Http\Resources\CategoryCollection;
use App\Http\Resources\Category as CategoryResource;
use App\Http\Resources\VideoCollection;
use App\Http\Resources\Video as VideoResource;
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

	public function videos($id_or_slug, Request $request)
	{
		$keyword_param = $request->q;
		$tag_param = $request->tag; //slug
		$view_param = $request->view; // hot, popular, trending, recent
		$limit_param = $request->limit;

		$category = Category::find_by_id_or_slug($id_or_slug);

		$videos = $category->videos()->published();

		if( isset($tag_param) )
		{
			$videos = Video::withAnyTag($tag_param);
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
}
