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
    
    protected $appends = ['featured_image_url'];

    public $fillable = [
        'id',
        'active',
        'amount',
        'currrency',
        'interval',
        'interval_count',
        'livemode',
        'nickname',
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

    public function featured_image()
    {
        return $this->belongsTo('App\Models\Image', 'featured_image_id');
    }

    public function featured_image_url()
    {
        if ($this->featured_image)
        {
            return $this->featured_image->uri;
        }

        return null;
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
            $plan->trial_period_days = $stripe_plan->trial_period_days;
            $plan->save();
        }
    }

    public function getFeaturedImageUrlAttribute()
    {
        return $this->featured_image_url();
    }
}
