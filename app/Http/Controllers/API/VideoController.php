<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Video;

class VideoController extends Controller
{
	public function index(Request $request)
	{
		return response()->json(Video::get());
	}
}
