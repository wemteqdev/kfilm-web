<?php

namespace App\Repositories\Admin;

use App\User;
use App\Repositories\BaseRepository;

class UserRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'name',
        'email',
    ];

    public function model()
    {
        return User::class;
    }
}
