<?php
namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class History extends Model
{
    public $table = 'histories';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    protected $dates = ['deleted_at'];
    
    public $fillable = [
        'id',
        'video_id',
        'user_id'
    ];

    public static $rules = [
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function video()
    {
        return $this->belongsTo('App\Models\Video');
    }
}
