<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Video;

class UpdateVideoRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return  [
                    'featured_video_id'=>'not_in:'. $this->videos
                ];
    }
}
