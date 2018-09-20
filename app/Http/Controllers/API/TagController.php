<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\TagCollection;
use App\Http\Resources\Tag as TagResource;

class TagController extends Controller
{
	public function index(Request $request)
	{
		$tags = Tag::all();
		return new TagCollection($tags);
	}

	public function popular(Request $request)
	{
		$tags = Tag::suggested()->get();
		return new TagCollection($tags);
	}
}
