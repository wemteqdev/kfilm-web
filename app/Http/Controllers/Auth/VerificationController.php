<?php
namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\VerifiesEmails;
use App\Http\Resources\User as UserResource;
use App\User;
use Illuminate\Auth\Events\Verified;

class VerificationController extends Controller
{
    public function __construct()
    {
        $this->middleware('signed')->only('verify');
        $this->middleware('throttle:6,1')->only('verify', 'resend');
    }

    public function verify(Request $request)
    {

        $user = User::find($request->id);
        // if ($request->route('id') == $request->user()->getKey() &&
        //     $request->user()->markEmailAsVerified()) {
        //     event(new Verified($request->user()));
        // }

        if ($user->markEmailAsVerified()) {
             event(new Verified($request->user()));
        }

        return redirect('/user/login');
    }
}
