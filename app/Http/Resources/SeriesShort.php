<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\VideoShort as VideoShortResource;
class SeriesShort extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'featured_image_url' => $this->featured_image_url(),
            'videos' => VideoShortResource::collection($this->videos),
        ];
    }
}