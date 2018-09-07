<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use \Conner\Tagging\Taggable;

class Slide extends Model
{
    use Taggable;
    use SoftDeletes;

    public $table = 'slides';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    protected $dates = ['deleted_at'];

    protected $appends = ['tags'];

    public $fillable = [
        'image_url',
        'title',
        'description',
        'link_url',
        'link_text',
        'style'
    ];

    protected $casts = [
    ];

   public static $rules = [
        
    ];

    public function getTagsAttribute()
    {
        return $this->tagged->pluck('tag_slug');
    }
}
