<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;
use Laravel\Cashier\Billable;
class User extends Authenticatable
{
    use HasApiTokens, Notifiable;
    use HasRoles;
    use Billable;

    protected $guard_name = 'api';

    protected $fillable = [
        'name', 'email', 'password',
    ];

    protected $hidden = [
        'password', 'remember_token', 'roles'
    ];

    protected $appends = ['role_names'];

    public function getRoleNamesAttribute()
    {
        return $this->getRoleNames();
    }

}
