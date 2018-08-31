<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Plan extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'active' => $this->active,
            'amount' => $this->amount,
            'currency' => $this->name,
            'nickname' => $this->nickname,
            'interval' => $this->interval,
            'interval_count' => $this->interval,
            'trial_period_days' => $this->trial_period_days,
            'status' => $this->status,
        ];
    }
}
