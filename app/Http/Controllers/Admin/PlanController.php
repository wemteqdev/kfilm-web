<?php

namespace App\Http\Controllers\Admin;

use Request;

use App\Http\Controllers\AdminBaseController;
use App\Models\Plan;
use App\Models\Product;

class PlanController extends AdminBaseController
{
	public function sync_stripe_plans(Request $request)
	{
		Plan::truncate();
		Plan::create_plans_from_stripe();

		Product::truncate();
		Product::create_products_from_stripe();

		return redirect(route('admin.plans.index'));
	}

	public function index(Request $request)
	{
		$plans = Plan::all();

		return view('admin.plans.index', [ 'plans'=> $plans ]);
	}
}
