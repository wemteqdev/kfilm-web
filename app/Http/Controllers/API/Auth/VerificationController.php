<?php

namespace App\Http\Controllers\API\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\VerifiesEmails;
use Illuminate\Auth\Events\Verified;
use App\Http\Resources\User as UserResource;

class VerificationController extends Controller
{
    public function __construct()
    {
        $this->middleware('signed')->only('verify');
        $this->middleware('throttle:6,1')->only('verify', 'resend');
    }

    public function resend(Request $request)
    {
        $user = $request->user();

        if(isset($request->email) && ($request->email!=$user->email))
        {
            $user->email = $request->email;
            $user->email_verified_at = null;
            $user->save();
        }


        if ($user->hasVerifiedEmail()) {
            return new UserResource($request->user());
        }


        $user->sendEmailVerificationNotification();

        return new UserResource($request->user());
    }
}
