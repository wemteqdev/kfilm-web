<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Video;
use App\Http\Resources\VideoCollection;
use App\Http\Resources\Video as VideoResource;

class VideoController extends Controller
{
	public function index(Request $request)
	{
		return new VideoCollection(Video::all());
	}
}
