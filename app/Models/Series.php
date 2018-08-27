<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Cviebrock\EloquentSluggable\Sluggable;

class Series extends Model
{
    use SoftDeletes;
    use Sluggable;

    public $table = 'series';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    protected $dates = ['deleted_at'];

    public $fillable = [
        'name',
        'description',
        'slug',
        'featured_image_id',
    ];

    protected $casts = [
        'id' => 'integer',
        'name' => 'string',
        'description' => 'string',
        'slug' => 'string'
    ];

  
    public static $rules = [
       'name' => 'required' 
    ];

    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

    public function featured_image()
    {
        return $this->belongsTo('App\Models\Image', 'featured_image_id');
    }
    
    public function videos()
    {
        return $this->hasMany('App\Models\Video');
    }
}
