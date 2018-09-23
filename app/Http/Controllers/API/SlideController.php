<?php
namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Response;
use Flash;

use Prettus\Repository\Criteria\RequestCriteria;

use App\Http\Requests\Admin\CreateSlideRequest;
use App\Http\Requests\Admin\UpdateslideRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\Slide as SlideResource;
use App\Http\Resources\SlideCollection;
use App\Repositories\Admin\SlideRepository;
use App\Models\Slide;

class SlideController extends Controller
{
    public function index(Request $request)
	{
		$tag_param = $request->tag; // slug

        $slides = null;

		if( isset($tag_param) )
		{
			$slides = Slide::active()->withAnyTags([$tag_param])->get();
        }else{
            $slides = Slide::active()->get();
        }

		return new SlideCollection($slides);
    }
    
    public function add_tag($id, Request $request)
    {
        $slide = Slide::findOrFail($id);
		
        if(isset($request->tag))
        {
            $tag = \Spatie\Tags\Tag::findOrCreate($request->tag, 'slide');
            $slide->attachTag($tag);
        }
        
        return new SlideResource($slide);
	}
	
	public function remove_tag($id, Request $request)
    {
        $slide = Slide::findOrFail($id);
        
        $tag = \Spatie\Tags\Tag::findOrCreate($request->tag, 'slide');
        $slide->detachTags($tag);

        return new SlideResource($slide);
	}
}
