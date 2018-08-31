<?php
namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Plan;
use Auth;
class PlanController extends Controller
{
	public function subscribe($id, Request $request)
	{
		$plan = Plan::find($id);

		try {
			\Stripe\Stripe::setApiKey(env('STRIPE_SECRET_KEY'));
	
			$user = Auth::user();
			if ($user->subscribed('main')) {
				if (!$user->subscribedToPlan($plan->id, 'main')) {
					$user->subscription('main')->swap($plan->id);
				}
			}else{
				$user->newSubscription('main', $plan->id)->create($request->stripeToken);
			}
	
			return response()->json(['success' => 'Subscription successful']);
		} catch (\Exception $ex) {
			return response()->json(['error' => $ex->getMessage()], 403);
		}

		return response()->json(['error' => 'something went wrong'], 403);
	}
}