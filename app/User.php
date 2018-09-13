<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;
use Laravel\Cashier\Billable;
use Cog\Contracts\Love\Liker\Models\Liker as LikerContract;
use Cog\Laravel\Love\Liker\Models\Traits\Liker;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Auth\CanResetPassword;
class User extends Authenticatable implements LikerContract, MustVerifyEmail
{
    use HasApiTokens, Notifiable;
    use HasRoles;
    use Billable;
    use Liker;
    use CanResetPassword;

    protected $guard_name = 'api';

    protected $fillable = [
        'name', 'email', 'password',
    ];

    protected $hidden = [
        'password', 'remember_token', 'roles'
    ];

    protected $appends = ['role_names'];

    public function histories()
    {
        return $this->hasMany('App\Models\History');
    }

    public function getRoleNamesAttribute()
    {
        return $this->getRoleNames();
    }

    public function cancelSubscriptions()
    {
        foreach( $this->subscriptions()->get() as $subscription )
        {
            $subscription->cancelNow();
        }
    }

    public function isPro()
    {
        return $this->hasAnyRole(['pro', 'admin']);
    }

    public function create_video_watch_history($video)
    {
        return $this->histories()->create(['video_id' => $video->id]);
    }
}
