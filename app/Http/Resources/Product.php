<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Plan as PlanResource;

class Product extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'featured_image_url' => $this->featured_image_url(),
            'active' => $this->active,
            'status' => $this->status,
            'plans' => PlanResource::collection($this->plans),
        ];
    }
}
