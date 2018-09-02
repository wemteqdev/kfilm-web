<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Plan as PlanResource;
use App\Models\Product;

class Subscription extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'formatted_name' => Product::find($this->name)->name,
            'stripe_id' => $this->stripe_id,
            'stripe_plan' => $this->stripe_plan,
            'trial_ends_at' => (($this->trial_ends_at!=null)?$this->trial_ends_at->diffForHumans():null),
            'quantity' => $this->quantity,
            'ends_at' => (($this->ends_at!=null)?$this->ends_at->diffForHumans():null),
        ];
    }
}
