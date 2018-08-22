<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Image;

class ImageController extends Controller
{
	public function index(Request $request)
	{
		return response()->json(Image::orderBy('created_at', 'desc')->paginate(9));
	}
}
