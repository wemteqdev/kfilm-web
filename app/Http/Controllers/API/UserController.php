<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\User as UserResource;
use App\Http\Resources\SubscriptionCollection;
use App\Http\Resources\InoviceCollection;
use App\Http\Resources\VideoCollection;
use App\Http\Resources\HistoryCollection;
use App\Http\Resources\VideoShort as VideoShortResource;
use Auth;
use Validator;
use App\User;
use Laravel\Passport\Passport;
use App\Models\Video;
class UserController extends Controller
{
	public function __construct()
    {
        $this->middleware('throttle:24,1')->only('register');
	}
	
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

	 	return response()->json(['error' => 'Invalid username or password'], 401);
	}

	function update_password(Request $request) {
		$data = $request->all();
		$user = Auth::guard('api')->user();
   
		//Changing the password only if is different of null
		if( isset($data['old_password']) && !empty($data['old_password']) && $data['old_password'] !== "" && $data['old_password'] !=='undefined') {
			//checking the old password first
			$check  = Auth::guard('web')->attempt([
				'email' => $user->email,
				'password' => $data['old_password']
			]);
			if($check && isset($data['new_password']) && !empty($data['new_password']) && $data['new_password'] !== "" && $data['new_password'] !=='undefined') {
				$user->password = bcrypt($data['new_password']);
				$user->token()->revoke();
				$token = $user->createToken('newToken')->accessToken;
   
				//Changing the type
				$user->save();
   
				return json_encode(array('access_token' => $token)); //sending the new token
			}
			else {
				return response()->json(['error' => 'Wrong password information'], 401);
			}
		}

		return response()->json(['error' => 'Wrong password information'], 401);
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
            'name' => 'required|max:50', 
            'email' => 'required|email|unique:users|max:50', 
            'password' => 'required|max:50',
            'confirm_password' => 'required|same:password',
        ]);
		if ($validator->fails()) { 
			return response()->json(['error'=>$validator->errors()], 401);            
		}
		$input = $request->all();
		$input['password'] = bcrypt($input['password']); 
		
		$user = User::create($input);
		$user->sendEmailVerificationNotification();

		$user->assignRole('free');
		$token =  $user->createToken('user', $user->getRoleNames()->toArray())->accessToken;

		return (new UserResource($user))->additional(['access_token' => $token, 'message'=>'Verification email sent']);
	}
	
	public function subscriptions(Request $request)
	{
		$subscriptions = $request->user()->subscriptions()->orderBy('created_at', 'desc')->get();

		return new SubscriptionCollection($subscriptions);
	}
	
	public function favorite_videos(Request $request)
	{
		$videos = Video::published()->whereLikedBy($request->user()->id)->with('likesCounter')->get();
		return VideoShortResource::collection($videos);
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

	public function histories(Request $request)
	{
		$histories = $request->user()->histories()->orderBy('created_at', 'desc')->paginate(9);
		return new HistoryCollection($histories);
	}
}
