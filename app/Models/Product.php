<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    public $table = 'products';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    protected $dates = ['deleted_at'];
    
    protected $appends = ['featured_image_url'];

    public $fillable = [
        'id',
        'active',
        'name',
        'description',
        'status',
        'featured_image_id'
    ];

    protected $casts = [
        'id' => 'string',
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

    public function plans()
    {
        return $this->hasMany('App\Models\Plan');
    }

    public static function create_products_from_stripe()
    {
        \Stripe\Stripe::setApiKey(config('services.stripe.secret'));
        $stripe_products = \Stripe\Product::all();

        foreach($stripe_products['data'] as $item)
        {
            $product = Product::where('id', $item->id)->first();
            
            if($product == null)
            {
                $product = new product();
            }

            $product->id = $item->id;
            $product->active = $item->active;
            $product->name = $item->name;
            $product->description = $item->description;
            $product->save();
        }
    }

    public function getFeaturedImageUrlAttribute()
    {
        return $this->featured_image_url();
    }
}
