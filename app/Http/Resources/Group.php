<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Video as VideoResource;

class Group extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'featured_image_url' => $this->featured_image_url(),
            'videos_count' => $this->videos_count,
            "views" => $this->getUniqueViews(),
        ];
    }
}
