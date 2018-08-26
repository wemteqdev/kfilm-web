<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Vimeo\Laravel\Facades\Vimeo;
use Cviebrock\EloquentSluggable\Sluggable;

/**
 * @SWG\Definition(
 *      definition="Video",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="name",
 *          description="name",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="description",
 *          description="description",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="slug",
 *          description="slug",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="duration",
 *          description="duration",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="width",
 *          description="width",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="height",
 *          description="height",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="type",
 *          description="type",
 *          type="boolean"
 *      ),
 *      @SWG\Property(
 *          property="status",
 *          description="status",
 *          type="boolean"
 *      ),
 *      @SWG\Property(
 *          property="featured_image_id",
 *          description="featured_image_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="featured_video_id",
 *          description="featured_video_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="vimeo_video_id",
 *          description="vimeo_video_id",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="uri",
 *          description="uri",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="embed",
 *          description="embed",
 *          type="string"
 *      )
 * )
 */
class Video extends Model
{
    use SoftDeletes;
    use Sluggable;

    public $table = 'videos';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    const TYPE_OPTIONS = array(0 => 'Normal', 1 => 'Featured');
    const STATUS_OPTIONS = array(0 => 'Draft', 1 => 'Active');


    protected $dates = ['deleted_at'];


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
        'embed'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
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

    /**
     * Validation rules
     *
     * @var array
     */
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

    public function categories()
    {
        return $this->belongsToMany('App\Models\Category');
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
            $video->thumbnail_url = $vimeo_video['pictures']['sizes'][0]['link'];
            $video->embed = $vimeo_video['embed']['html'];

            $video->save();
        }
    }
    
}
