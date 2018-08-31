<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Plan extends Model
{
    public $table = 'plans';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    protected $dates = ['deleted_at'];
    
    public $fillable = [
        'id',
        'active',
        'amount',
        'currrency',
        'interval',
        'interval_count',
        'livemode',
        'nickname',
        'product_id',
        'trial_period_days',
        'featured_image_id'
    ];

    protected $casts = [
        'id' => 'string',
        'amount' => 'integer'
    ];

    public static $rules = [
       'id' => 'required' 
    ];

    public function product()
    {
        return $this->belongsTo('App\Models\Product', 'product');
    }

    public static function create_plans_from_stripe()
    {
        \Stripe\Stripe::setApiKey(config('services.stripe.secret'));
        $stripe_plans = \Stripe\Plan::all();

        foreach($stripe_plans['data'] as $stripe_plan)
        {
            $plan = Plan::where('id', $stripe_plan->id)->first();
            
            if($plan == null)
            {
                $plan = new Plan();
            }

            $plan->id = $stripe_plan->id;
            $plan->active = $stripe_plan->active;
            $plan->amount = $stripe_plan->amount;
            $plan->currency = $stripe_plan->currency;
            $plan->interval = $stripe_plan->interval;
            $plan->interval_count = $stripe_plan->interval_count;
            $plan->livemode = $stripe_plan->livemode;
            $plan->nickname = $stripe_plan->nickname;
            $plan->product_id = $stripe_plan->product;
            $plan->trial_period_days = $stripe_plan->trial_period_days;
            $plan->save();
        }
    }

    public function getFeaturedImageUrlAttribute()
    {
        return $this->featured_image_url();
    }
}
