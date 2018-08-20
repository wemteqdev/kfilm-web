<?php

namespace App\Repositories\Admin;

use App\Models\Admin\Video;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class VideoRepository
 * @package App\Repositories\Admin
 * @version August 20, 2018, 5:25 am UTC
 *
 * @method Video findWithoutFail($id, $columns = ['*'])
 * @method Video find($id, $columns = ['*'])
 * @method Video first($columns = ['*'])
*/
class VideoRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
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
     * Configure the Model
     **/
    public function model()
    {
        return Video::class;
    }
}
