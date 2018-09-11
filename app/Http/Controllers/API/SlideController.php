<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\Admin\CreateSlideRequest;
use App\Http\Requests\Admin\UpdateslideRequest;
use App\Repositories\Admin\SlideRepository;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Flash;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;
use App\Http\Resources\Slide as SlideResource;
use App\Models\Slide;
use App\Http\Resources\SlideCollection;

class SlideController extends Controller
{
    public function index(Request $request)
	{
		$tag_param = $request->tag; // slug

        $slides = null;

		if( isset($tag_param) )
		{
			$slides = Slide::withAnyTag($tag_param)->published()->get();
        }else{
            $slides = Slide::published()->get();
        }

		return new SlideCollection($slides);
    }
    
    public function add_tag($id, Request $request)
    {
        $slide = Slide::findOrFail($id);
		
        if(isset($request->tag))
        {
            $slide->tag($request->tag);
        }
        
        return new SlideResource($slide);
	}
	
	public function remove_tag($id, Request $request)
    {
        $slide = Slide::findOrFail($id);
        $slide->untag($request->tag);

        return new SlideResource($slide);
	}
}
