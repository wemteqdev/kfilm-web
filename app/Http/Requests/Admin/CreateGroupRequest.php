<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Group;

class CreateGroupRequest extends FormRequest
{
    function authorize()
    {
        return true;
    }

    public function rules()
    {
        return Group::$rules;
    }
}