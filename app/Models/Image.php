<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Image extends Model
{
    use SoftDeletes;

    public $table = 'images';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];

    protected $appends = ['src'];

    public $fillable = [
        'name',
        'alt',
        'width',
        'height',
        'uri'
    ];

    protected $casts = [
        'id' => 'integer',
        'width' => 'integer',
        'height' => 'integer',
        'uri' => 'string'
    ];

   public static $rules = [
        
    ];

    public function getSrcAttribute(){
        return $this->uri;
    }

    
}
