<?php

namespace App\Repositories\Admin;

use App\Models\Group;
use App\Repositories\BaseRepository;

class GroupRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'name',
        'description',
        'slug'
    ];

    public function model()
    {
        return Group::class;
    }
}
