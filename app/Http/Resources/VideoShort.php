<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Video as VideoResource;
use App\Http\Resources\Category as CategoryResource;
use App\Http\Resources\SeriesShort as SeriesShortResource;
use App\Models\Series;
use Illuminate\Support\Facades\Auth;
class VideoShort extends JsonResource
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
			"formatted_duration" => gmdate("H:i:s", $this->duration),
			"year" => $this->year,
			"published_at" => $this->published_at->diffForHumans(),
			"featured_image_url"=> $this->featured_image_url(),
			"thumbnail_url"=> $this->thumbnail_url,
			"is_favorited"=>$this->liked,
			"likes"=>$this->likesCount,
			"is_pro" => $this->isPro(),
			"series_number" => $this->series_number,
			"views" => $this->views_count,
        ];
    }
}