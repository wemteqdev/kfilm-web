<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\User as UserResource;
use Auth;
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

	 	if(Auth::attempt(['email' => $username, 'password' => $password])){
			$user =	Auth::user(); 
			$success['token'] =  $user->createToken('user', $user->getRoleNames()->toArray())->accessToken; 
			$success['user'] =  new UserResource($user);
		 
			return $success;
	 	}

	 	return response()->json(['error' => 'Invalid username or Password']);
	}

	public function register(Request $request) 
    { 
        $validator = Validator::make($request->all(), [ 
            'name' => 'required', 
            'email' => 'required|email', 
            'password' => 'required', 
            'confirm_password' => 'required|same:password', 
        ]);
		if ($validator->fails()) { 
			return response()->json(['error'=>$validator->errors()], 401);            
		}
		$input = $request->all();
		$input['password'] = bcrypt($input['password']); 
		
		$user = User::create($input);
		$user->assignRole('free');

		$success['token'] =  $user->createToken('user', $user->getRoleNames()->toArray())->accessToken; 
		$success['user'] =  $user;

		return response()->json(['success'=>$success], 200); 
    }
}
