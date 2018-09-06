<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Auth;
class LoginController extends Controller
{
    use AuthenticatesUsers;

    protected $redirectTo = '/home';

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function authenticated( \Illuminate\Http\Request $request, \App\User $user ) {
        $user->tokens()->delete();
        $accessToken = $user->createToken('user', Auth::user()->getRoleNames()->toArray())->accessToken;
        session(['user_access_token' => $accessToken]);
        return redirect()->intended($this->redirectPath());
    }
}