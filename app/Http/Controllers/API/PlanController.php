<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Plan;

class PlanController extends Controller
{
	public function subscribe($id, Request $request)
	{
		$plan = Plan::find($id);

		try {
			Stripe::setApiKey(env('STRIPE_SECRET_KEY'));
	
			$user = User::find(1);
			$user->newSubscription('main', $plan->id)->create($request->stripeToken);
	
			return ['Subscription successful, you get the course!'];
		} catch (\Exception $ex) {
			return response_json(['error' => $ex->getMessage()], 403);
		}

		return response_json(['error' => 'something went wrong'], 403);
	}

	public function index(Request $request)
	{
		$plans = Plan::all();

		return $plans;
	}
}
