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
use App\Enums\VideoScope;
use Validator;
use Illuminate\Validation\Rule;
class VideoController extends Controller
{
	protected function rules()
    {
        return [
			'type' => Rule::in(['normal', 'featured', 'promotion', 'recommended']),
			'scope' => Rule::in(['free', 'pro']),
			'view_param' => Rule::in(['recent', 'hot', 'popular', 'trending']),
			'order_by' => Rule::in(['published_at', 'name', 'duration']),
			'order_direction' => Rule::in(['asc', 'dsc']),
        ];
	}
	
	public function index(Request $request)
	{
		$validator = Validator::make($request->all(), $this->rules(), []);

		if ($validator->fails()) {
			return response()->json($validator->messages(), 400);
		}

		$category = $request->category;
		$keyword_param = $request->q;
		$tag_param = $request->tag;
		$view_param = $request->view;
		$limit_param = $request->limit;
		$type_param = $request->type;
		$scope_param = $request->scope;
		$per_page = $request->per_page ?: 12;
		$order_by = $request->order_by;
		$order_direction = $request->order_direction ?: 'asc';

		$user = auth('api')->user();

		$videos = Video::published();

		if(isset($category))
		{
			$category = Category::find_by_id_or_slug($category);
			if($category!==null)
			{
				$videos = $category->videos()->published();
			}			
		}
		
		$videos = $videos->normal();

		if ( isset($scope_param) )
		{
			$videos = $videos->where('scope', VideoScope::getValue($scope_param));
		}

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
			$videos = $videos->orderBy('published_at', 'desc');
		}elseif($view_param == "hot"){
			$videos = $videos->orderBy('views_count_last_30days', 'desc');
		}elseif($view_param == "popular"){
			$videos = $videos->orderBy(DB::raw("views_count + views_count_last_30days"), 'desc');
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

		return new VideoCollection($videos);
	}

	public function featured()
	{
		$videos = Video::featured()->orderBy('created_at', 'desc')->paginate(9);
		return new VideoCollection($videos);
	}

	public function show($id_or_slug)
	{
		$video = Video::find($id_or_slug);

		if($video==null){
			$video = Video::published()->where('slug', $id_or_slug)->firstorfail();
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

		$user->create_video_watch_history($video);

		return new VideoResource($video);
	}
}