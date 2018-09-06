<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\VideoShort as VideoShortResource;

class History extends JsonResource
{
    public function toArray($request)
    {
        return [
            'video' => new VideoShortResource($this->video),
            'created_at' => $this->created_at->diffForHumans()
        ];
    }
}