<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Video as VideoResource;

class Series extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'featured_image_url' => $this->featured_image_url(),
            "views" => $this->getUniqueViews(),
            'videos_count' => $this->videos_count,
            'videos' => VideoResource::collection($this->videos),
        ];
    }
}
