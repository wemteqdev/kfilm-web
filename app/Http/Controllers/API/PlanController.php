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
		
		$plan_id = $plan->id;
		$product_id = $plan->product_id;
		
		try {
			\Stripe\Stripe::setApiKey(env('STRIPE_SECRET_KEY'));
	
			$user = Auth::user();
			if ($user->subscribed($product_id)) {
				if (!$user->subscribedToPlan($plan_id, $product_id)) {
					$user->subscription($product_id)->swap($plan_id);
				}
			}else{
				$user->cancelSubscriptions();
				$user->newSubscription($product_id, $plan_id)->create($request->stripeToken);
			}
	
			return response()->json(['success' => 'Subscription successful']);
		} catch (\Exception $ex) {
			return response()->json(['error' => $ex->getMessage()], 403);
		}

		return response()->json(['error' => 'something went wrong'], 403);
	}
}