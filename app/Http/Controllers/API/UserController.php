<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
	public function index(Request $request)
	{
	 return $request->user();
	}

  public function auth(Request $request)
	{
	 	$params = $request->only('email', 'password');

	 	$username = $params['email'];
	 	$password = $params['password'];

	 	if(\Auth::attempt(['email' => $username, 'password' => $password])){
		 	return \Auth::user()->createToken('User Token', ['admin']);
	 	}

	 	return response()->json(['error' => 'Invalid username or Password']);
	}
}
