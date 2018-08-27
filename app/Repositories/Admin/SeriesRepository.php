<?php

namespace App\Repositories\Admin;

use App\Models\Series;
use InfyOm\Generator\Common\BaseRepository;

class SeriesRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'name',
        'description',
        'slug'
    ];

    public function model()
    {
        return Series::class;
    }
}
