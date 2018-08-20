<?php

namespace App\Repositories\Admin;

use App\Models\Admin\Group;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class GroupRepository
 * @package App\Repositories\Admin
 * @version August 20, 2018, 4:42 am UTC
 *
 * @method Group findWithoutFail($id, $columns = ['*'])
 * @method Group find($id, $columns = ['*'])
 * @method Group first($columns = ['*'])
*/
class GroupRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
        'description',
        'slug'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Group::class;
    }
}
