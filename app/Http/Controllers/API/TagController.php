<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\TagCollection;
use App\Http\Resources\Tag as TagResource;
use App\Models\Video;

class TagController extends Controller
{
	public function index(Request $request)
	{
		return new TagCollection($tags);
	}

	public function popular(Request $request)
	{
		return new TagCollection($tags);
	}
}
