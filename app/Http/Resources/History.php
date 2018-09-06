<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Video as VideoResource;

class History extends JsonResource
{
    public function toArray($request)
    {
        return [
            'video' => new VideoResource($this->video),
            'created_at' => $this->created_at->diffForHumans()
        ];
    }
}