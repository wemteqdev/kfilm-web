<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\User as UserResource;
use App\Http\Resources\SubscriptionCollection;
use App\Http\Resources\InoviceCollection;
use App\Http\Resources\VideoCollection;
use Auth;
use Validator;
use App\User;
use Laravel\Passport\Passport;
use App\Models\Video;
class UserController extends Controller
{
	public function index(Request $request)
	{
		return new UserResource($request->user());
	}

    public function login(Request $request)
	{
	 	$params = $request->only('email', 'password');

	 	$username = $params['email'];
	 	$password = $params['password'];

	 	if(Auth::attempt(['email' => $username, 'password' => $password])){
			$user =	Auth::user();

			$user->tokens()->delete();

			$token =  $user->createToken('user', $user->getRoleNames()->toArray())->accessToken; 
			return (new UserResource($user))->additional(['access_token' => $token]);
	 	}

	 	return response()->json(['error' => 'Invalid username or Password'], 401);
	}

	public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
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

		$token =  $user->createToken('user', $user->getRoleNames()->toArray())->accessToken;

		return (new UserResource($user))->additional(['access_token' => $token]);
	}
	
	public function subscriptions(Request $request)
	{
		$subscriptions = $request->user()->subscriptions()->get();

		return new SubscriptionCollection($subscriptions);
	}
	
	public function favorite_videos(Request $request)
	{
		$videos = Video::published()->whereLikedBy($request->user()->id)->with('likesCounter')->get();
		return new VideoCollection($videos);
	}

	public function invoices(Request $request)
	{
		$invoices = $request->user()->invoices()->map(function($invoice) {
			return [
				'date' => $invoice->date()->toFormattedDateString(),
				'total' => $invoice->total,
				'hosted_invoice_url' => $invoice->hosted_invoice_url,
				'invoice_pdf' => $invoice->invoice_pdf,
			];
		});

		return response()->json([ 'data' => $invoices ]);
	}
}
