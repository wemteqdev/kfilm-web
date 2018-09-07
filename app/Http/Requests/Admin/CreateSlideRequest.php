<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Slide;

class CreateSlideRequest extends FormRequest
{
    function authorize()
    {
        return true;
    }

    public function rules()
    {
        return Slide::$rules;
    }
}