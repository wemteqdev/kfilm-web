<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Resources\CategoryCollection;
use App\Http\Resources\Category as CategoryResource;

class CategoryController extends Controller
{
	public function index(Request $request)
	{
		return new CategoryCollection(Category::all());
	}

	public function show($id)
	{
		return new CategoryResource(Category::find($id));
	}
}
