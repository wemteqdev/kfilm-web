<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Video as VideoResource;
use App\Http\Resources\Category as CategoryResource;
use App\Http\Resources\SeriesShort as SeriesShortResource;
use App\Http\Resources\VideoShort as VideoShortResource;
use App\Models\Series;
use Illuminate\Support\Facades\Auth;
class Video extends JsonResource
{
	public function hasProAccess($request)
	{
		if($request->user()==null)
			return false;

		if(!$request->user()->isPro())
			return false;

		return true;	
	}

	public function embedPro($request)
	{
		if(!$this->isPro() || $this->hasProAccess($request))
			return $this->embed;
		
		return null;
	}

    public function toArray($request)
    {
        return [
            "id"=> $this->id,
				"name"=> $this->name,
				"description"=> $this->description,
				"slug"=> $this->slug,
				"duration"=> $this->duration,
				"width"=> $this->width,
				"height"=> $this->height,
				"type"=> $this->type_name,
				"status"=> $this->status_name,
				"year" => $this->year,
				"published_at" => $this->published_at->diffForHumans(),
				"featured_image_url"=> $this->featured_image_url(),
				"thumbnail_url"=> $this->thumbnail_url,
				"embed"=> $this->embedPro($request),
				"tags" => $this->tagged->pluck('tag_slug'),
				"views" => $this->getUniqueViews(),
				"categories" => $this->categories()->pluck('slug'),
				"groups" => $this->groups()->pluck('slug'),
				"featured_video"=> new VideoResource(Video::find($this->featured_video_id)),
				"is_favorited"=>$this->liked,
				"likes"=>$this->likesCount,
				"is_pro" => $this->type_name == 'pro',
				'related'=> VideoShortResource::collection($this->suggested()),
				"series" => new SeriesShortResource(Series::find($this->series_id)),
        ];
    }
}