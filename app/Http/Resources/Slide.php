<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Slide extends JsonResource
{
    public function toArray($request)
    {
        return [
            'image_url' => $this->image_url,
            'title' => $this->title,
            'description' => $this->title,
            'link_url' => $this->title,
            'link_text' => $this->title,
            'style' => $this->title,
            "tags" => $this->tags,
        ];
    }
}
