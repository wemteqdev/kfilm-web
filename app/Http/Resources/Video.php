<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Video as VideoResource;
use App\Http\Resources\Category as CategoryResource;
use App\Http\Resources\SeriesShort as SeriesShortResource;
use App\Http\Resources\VideoShort as VideoShortResource;
use App\Http\Resources\VideoFeatured as VideoFeaturedResource;
use App\Models\Series;
use Illuminate\Support\Facades\Auth;
class Video extends JsonResource
{
	public function hasProAccess($request)
	{
		$user = auth('api')->user();
		if($user==null)
			return false;

		if(!$user->isPro())
			return false;

		return true;	
	}

	public function embedPro($request)
	{
		$user = auth('api')->user();
		if($this->hasProAccess($request))
			return $this->embed;
		
		if(!$this->isPro() && $user!=null)
			return $this->embed;
		
		return null;
	}

    public function toArray($request)
    {
        return [
            "id"=> $this->id,
				"name" => $this->name,
				"description" => $this->description,
				"slug" => $this->slug,
				"duration" => $this->duration,
				"formatted_duration" => gmdate("H:i:s", $this->duration),
				"width" => $this->width,
				"height" => $this->height,
				"year" => $this->year,
				"published_at" => $this->published_at->diffForHumans(),
				"featured_image_url" => $this->featured_image_url(),
				"embed" => $this->embedPro($request),
				"tags" => $this->tagged->pluck('tag_slug'),
				"views" => $this->getUniqueViews(),
				"categories" => $this->categories,
				"groups" => $this->groups,
				"featured_video" => new VideoFeaturedResource(Video::find($this->featured_video_id)),
				"is_favorited" => $this->liked,
				"likes" => $this->likesCount,
				"scope" => $this->scope,
				"is_pro" => $this->isPro(),
				"related" => VideoShortResource::collection($this->suggested_by_groups()),
				"series" => new SeriesShortResource(Series::find($this->series_id)),
				"series_number" => $this->series_number,
        ];
    }
}