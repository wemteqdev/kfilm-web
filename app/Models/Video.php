<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Vimeo\Laravel\Facades\Vimeo;
use Cviebrock\EloquentSluggable\Sluggable;
use CyrildeWit\EloquentViewable\Viewable;
use App\Enums\VideoScope;
use App\Enums\VideoType;
use App\Enums\VideoStatus;
use Cog\Contracts\Love\Likeable\Models\Likeable as LikeableContract;
use Cog\Laravel\Love\Likeable\Models\Traits\Likeable;
use Spatie\Tags\HasTags;
class Video extends Model implements LikeableContract
{
    use SoftDeletes;
    use Sluggable;
    use Viewable;
    use Likeable;
    use HasTags;

    public $table = 'videos';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    protected $dates = ['deleted_at'];
    protected $appends = ['featured_image_url', 'featured_video', 'groups', 'series', 'tags', 'status_name', 'type_name', 'scope_name'];

    public $fillable = [
        'category_id',
        'name',
        'description',
        'meta_tags',
        'slug',
        'duration',
        'width',
        'height',
        'type',
        'status',
        'featured_image_id',
        'thumbnail_url',
        'thumbnail_high_url',
        'featured_video_id',
        'vimeo_video_id',
        'uri',
        'embed',
        'series_id',
        'views_count',
        'views_count_last_7days',
        'views_count_last_30days',
        'year',
        'published_at',
        'scope',
        'series_number',
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
        'embed' => 'string',
        'year' => 'integer',
        'published_at' => 'datetime',
        'series_number' => 'integer'
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

    public function isFree()
    {
        return $this->scope == VideoScope::free;
    }

    public function isPro()
    {
        return $this->scope == VideoScope::pro;
    }

    public function getStatusNameAttribute() {
        return VideoStatus::getKey($this->status);
    }

    public function getTypeNameAttribute() {
        return VideoType::getKey($this->type);
    }

    public function getScopeNameAttribute() {
        return VideoScope::getKey($this->scope);
    }

    public function scopeNormal($query)
    {
        return $query->where('type', VideoType::normal);
    }

    public function scopeFeatured($query)
    {
        return $query->where('type', VideoType::featured);
    }

    public function scopePublished($query)
    {
        return $query->where('status', VideoStatus::published);
    }

    public function scopeActive($query)
    {
        return $query->where('status', VideoStatus::active);
    }

    public function category()
    {
        return $this->belongsTo('App\Models\Category');
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
        return $this->tags()->pluck('slug');
    }

    public function publish()
    {
        $this->status = VideoStatus::published;
        $this->published_at = \Carbon\Carbon::now()->toDateTimeString();
        return $this->save();
    }
    
    public function suggested_by_categories()
    {
        $category_ids = $this->categories()->pluck('category_id');

        $related_videos = Video::published()->whereHas('categories', function($query) use ($category_ids) {
            $query->whereIn('category_video.category_id', $category_ids);
        })->where('id', '<>', $this->id)->take(3)->get();

        return $related_videos;
    }

    public function suggested_by_groups()
    {
        $group_ids = $this->groups()->where('slug', 'like', 'video-%')->pluck('group_id');

        $related_videos = Video::published()->whereHas('groups', function($query) use ($group_ids) {
            $query->whereIn('group_video.group_id', $group_ids);
        })->where('id', '<>', $this->id)->get();

        return $related_videos;
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

    public static function create_videos_from_vimeo($url = '/me/videos')
    {
        $payload = Vimeo::request($url, [], 'GET')['body'];
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

            $video->thumbnail_high_url = end($vimeo_video['pictures']['sizes'])['link'];

            $image_count = count($vimeo_video['pictures']['sizes']);
            $video->thumbnail_url = $vimeo_video['pictures']['sizes'][$image_count/2]['link'];
            $video->embed = $vimeo_video['embed']['html'];

            $video->save();
        }

        if(isset($payload['paging']) && isset($payload['paging']['next']))
        {
            Video::create_videos_from_vimeo($payload['paging']['next']);
        }
    }
}
