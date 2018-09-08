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
            'description' => $this->description,
            'link_url' => $this->link_url,
            'link_text' => $this->link_text,
            'style' => $this->style,
            "tags" => $this->tags,
        ];
    }
}
