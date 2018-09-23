<?php
namespace App\Http\Controllers\API;

use Request;
use Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\Product as ProductResource;
use App\Http\Resources\ProductCollection;
use App\Models\Product;

class ProductController extends Controller
{
	public function index(Request $request)
	{
		$products = Product::all();

		return new ProductCollection($products);
	}
}
