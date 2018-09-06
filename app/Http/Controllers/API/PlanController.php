<?php
namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Plan;
use Auth;
class PlanController extends Controller
{
	public function subscribe($id, Request $request)
	{
		$plan = Plan::find($id);
		$product = Product::find($plan->product_id);

		\Stripe\Stripe::setApiKey(env('STRIPE_SECRET_KEY'));
		$user = Auth::user();
		try {
			$user->cancelSubscriptions();
		} catch(\Exception $ex){}
		
		try {
			$user->newSubscription($product->id, $plan->id)->create($request->stripeToken);
			$user->syncRoles([$product->name]); 

			return response()->json(['success' => 'Subscription successfully']);
		} catch (\Exception $ex) {
			return response()->json(['error' => $ex->getMessage()], 403);
		}

		return response()->json(['error' => 'something went wrong'], 403);
	}

	public function cancel($id, Request $request)
	{
		$plan = Plan::find($id);
		$product = Product::find($plan->product_id);

		$plan_id = $plan->id;
		$product_id = $plan->product_id;

		try {
			\Stripe\Stripe::setApiKey(env('STRIPE_SECRET_KEY'));
	
			$user = Auth::user();
			$user->subscription($product_id)->cancelNow();
			$user->removeRole($product->name);
	
			return response()->json(['success' => 'Subscription cancelled successfully']);
		} catch (\Exception $ex) {
			return response()->json(['error' => $ex->getMessage()], 403);
		}

		return response()->json(['error' => 'something went wrong'], 403);
	}
}