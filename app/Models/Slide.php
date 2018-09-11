<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use \Conner\Tagging\Taggable;
use App\Enums\VideoStatus;
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
        'style',
        'status'
    ];

    protected $casts = [
    ];

   public static $rules = [
        
    ];

    public function scopePublished($query)
    {
        return $query->where('status', VideoStatus::published);
    }

    public function getTagsAttribute()
    {
        return $this->tagged->pluck('tag_slug');
    }
}
