<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{

    public function __construct()
    {
        $this->middleware('throttle:24,1')->only('send_reset_link_email');
    }

    public function send_reset_link_email(Request $request)
    {
        $this->validateEmail($request);

        $response = $this->broker()->sendResetLink(
            $request->only('email')
        );

        return $response == Password::RESET_LINK_SENT
                    ? response()->json(['message'=>'password reset email sent'], 200)
                    : response()->json(['error'=>'something went wrong'], 400);
    }

    protected function validateEmail(Request $request)
    {
        $this->validate($request, ['email' => 'required|email']);
    }

    public function broker()
    {
        return Password::broker();
    }
}
