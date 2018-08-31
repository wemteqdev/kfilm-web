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

    protected $casts = [];

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

    public function getFeaturedImageUrlAttribute()
    {
        return $this->featured_image_url();
    }
}
