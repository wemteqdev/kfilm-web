<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Image extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'src' => $this->uri
        ];
    }
}
