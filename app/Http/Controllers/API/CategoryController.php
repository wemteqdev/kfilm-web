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
use Validator;
use Illuminate\Validation\Rule;
use App\Http\Resources\VideoShort as VideoShortResource;

class CategoryController extends Controller
{
	public function index(Request $request)
	{
		return new CategoryCollection(Category::active()->orderBy('position', 'asc')->get());
	}

	public function show($id_or_slug)
	{
		$category = Category::find($id_or_slug);

		if($category==null){
			$category = Category::active()->where('slug', $id_or_slug)->firstorfail();
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

	protected function video_filter_rules()
    {
        return [
			'type' => Rule::in(['normal', 'featured', 'promotion', 'recommended']),
			'scope' => Rule::in(['free', 'pro']),
			'view' => Rule::in(['recent', 'hot', 'popular', 'trending']),
			'order_by' => Rule::in(['published_at', 'name', 'duration']),
			'order_direction' => Rule::in(['asc', 'dsc']),
        ];
	}

	public function videos($id_or_slug, Request $request)
	{
		$validator = Validator::make($request->all(), $this->video_filter_rules(), []);

		if ($validator->fails()) {
			return response()->json($validator->messages(), 400);
		}

		$keyword_param = $request->q;
		$genres_param = $request->genres;
		$view_param = $request->view ?: 'popular';
		$limit_param = $request->limit;
		$type_param = $request->type;
		$scope_param = $request->scope;
		$per_page = $request->per_page ?: 12;
		$order_by = $request->order_by;
		$order_direction = $request->order_direction ?: 'asc';

		$user = auth('api')->user();

		$category = Category::find_by_id_or_slug($id_or_slug);
		$videos = $category->videos()->published();
		$videos = $videos->normal();

		if ( isset($scope_param) )
		{
			$videos = $videos->where('scope', VideoScope::getValue($scope_param));
		}

		if ( isset($type_param) )
		{
			$videos = $videos->where('type', VideoType::getValue($type_param));
		}

		if( isset($genres_param) )
		{
			$videos = $videos->withAllTags(explode(',', $genres_param), $category->slug);
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
			$videos = $videos->orderBy('published_at', 'desc');
		}elseif($view_param == "hot"){
			$videos = $videos->orderBy('views_count_last_30days', 'desc');
		}elseif($view_param == "popular"){
			$videos = $videos->orderBy(\DB::raw("views_count + views_count_last_30days"), 'desc');
		}elseif($view_param == "trending"){
			$videos = $videos->orderBy('views_count_last_7days', 'desc');
		}else{
			$videos = $videos->orderBy('published_at', 'desc');	
		}

		if (isset($order_by))
		{
			$videos->orderBy($order_by, $order_direction);
		}

		if( isset($limit_param) )
		{
			$videos = $videos->take($limit_param)->get();
		}else{
			$videos = $videos->paginate(min($per_page, 30));
		}

		return VideoShortResource::collection($videos);
	}
}
