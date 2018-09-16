<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use App\User;

class CreateUserRequest extends FormRequest
{
    function authorize()
    {
        return true;
    }

    public function rules()
    {
        return User::$rules;
    }
}