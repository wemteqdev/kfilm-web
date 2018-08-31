<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Auth;
use App\Http\Resources\Product as ProductResource;
use App\Http\Resources\ProductCollection;

class ProductController extends Controller
{
	public function index(Request $request)
	{
		$products = Product::all();

		return new ProductCollection($products);
	}
}
