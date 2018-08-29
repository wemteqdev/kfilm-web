<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Vimeo\Laravel\Facades\Vimeo;
use Cviebrock\EloquentSluggable\Sluggable;
use \Conner\Tagging\Taggable;
use CyrildeWit\EloquentViewable\Viewable;
class Video extends Model
{
    use SoftDeletes;
    use Sluggable;
    use Taggable;
    use Viewable;

    public $table = 'videos';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    const TYPE_OPTIONS = array(0 => 'Normal', 1 => 'Featured');
    const STATUS_OPTIONS = array(0 => 'Draft', 1 => 'Active');

    protected $dates = ['deleted_at'];

    protected $appends = ['featured_image_url', 'featured_video', 'categories', 'groups', 'series', 'tags'];

    public $fillable = [
        'name',
        'description',
        'slug',
        'duration',
        'width',
        'height',
        'type',
        'status',
        'featured_image_id',
        'featured_video_id',
        'vimeo_video_id',
        'uri',
        'embed',
        'series_id',
        'views_count',
        'views_count_last_7days',
        'views_count_last_30days',
    ];

    protected $casts = [
        'id' => 'integer',
        'name' => 'string',
        'description' => 'string',
        'slug' => 'string',
        'duration' => 'integer',
        'width' => 'integer',
        'height' => 'integer',
        'type' => 'integer',
        'status' => 'integer',
        'featured_image_id' => 'integer',
        'featured_video_id' => 'integer',
        'vimeo_video_id' => 'string',
        'uri' => 'string',
        'embed' => 'string'
    ];

    public static $rules = [

    ];

    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

    public function scopeActive($query)
    {
        return $query->where('status', 1);
    }

    public function categories()
    {
        return $this->belongsToMany('App\Models\Category');
    }

    public function groups()
    {
        return $this->belongsToMany('App\Models\Group');
    }

    public function series()
    {
        return $this->belongsTo('App\Models\Series');
    }

    public function featured_video()
    {
        return $this->belongsTo('App\Models\Video', 'featured_video_id');
    }

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

        return $this->thumbnail_url;
    }

    public function getFeaturedImageUrlAttribute()
    {
        return $this->featured_image_url();
    }

    public function getFeaturedVideoAttribute()
    {
        return $this->featured_video()->first();
    }

    public function getCategoriesAttribute()
    {
        return $this->categories()->pluck('slug');
    }

    public function getGroupsAttribute()
    {
        return $this->groups()->pluck('slug');
    }

    public function getSeriesAttribute()
    {
        return $this->series()->first();
    }

    public function getTagsAttribute()
    {
        return $this->tagged->pluck('tag_slug');
    }

    public static function create_from_vimeo($vimeo_id)
    {
        $vimeo_video = Vimeo::request('/me/videos/'. $vimeo_id, [], 'GET')['body'];

        $video = new Video();
        $video->name = $vimeo_video['name'];
        $video->duration = $vimeo_video['duration'];
        $video->width = $vimeo_video['width'];
        $video->height = $vimeo_video['height'];
        $video->vimeo_video_id = $vimeo_id;
        $video->uri = $vimeo_video['uri'];
        $video->thumbnail_url = $vimeo_video['pictures']['sizes'][0]['link'];
        $video->embed = $vimeo_video['embed']['html'];

        return $video->save();
    }

    public static function create_videos_from_vimeo()
    {
        $payload = Vimeo::request('/me/videos', [], 'GET')['body'];
        $vimeo_videos = $payload['data'];

        foreach($vimeo_videos as $vimeo_video)
        {
            $vimeo_id = basename($vimeo_video['uri']);

            $video = Video::where('vimeo_video_id', $vimeo_id)->first();
            
            if($video == null)
            {
                $video = new Video();
            }

            $video->name = $vimeo_video['name'];
            $video->duration = $vimeo_video['duration'];
            $video->width = $vimeo_video['width'];
            $video->height = $vimeo_video['height'];
            $video->vimeo_video_id = $vimeo_id;
            $video->uri = $vimeo_video['uri'];
            $video->thumbnail_url = end($vimeo_video['pictures']['sizes'])['link'];
            $video->embed = $vimeo_video['embed']['html'];

            $video->save();
        }
    }
    
}
