<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Image",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="width",
 *          description="width",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="height",
 *          description="height",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="uri",
 *          description="uri",
 *          type="string"
 *      )
 * )
 */
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
