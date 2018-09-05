<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Invoice extends JsonResource
{
    public function toArray($request)
    {
        return [
            'date' => $this->date()->toFormattedDateString(),
            'total' => $this->total(),
            'download_url' => '/user/invoice/' . $this->id
        ];
    }
}
