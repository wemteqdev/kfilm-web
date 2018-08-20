<?php

namespace App\Repositories\Admin;

use App\Models\Admin\Image;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class ImageRepository
 * @package App\Repositories\Admin
 * @version August 20, 2018, 5:25 am UTC
 *
 * @method Image findWithoutFail($id, $columns = ['*'])
 * @method Image find($id, $columns = ['*'])
 * @method Image first($columns = ['*'])
*/
class ImageRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'width',
        'height',
        'uri'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Image::class;
    }
}
