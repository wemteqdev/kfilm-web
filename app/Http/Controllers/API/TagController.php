<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\TagCollection;
use App\Http\Resources\Tag as TagResource;
use Conner\Tagging\Model\Tag;

class TagController extends Controller
{
	public function index(Request $request)
	{
		$tags = Tag::all();
		return new TagCollection($tags);
	}

	public function popular(Request $request)
	{
		$tags = Tag::where('count', '>', 2)->orderBy('count', 'desc')->limit(10)->get();
		return new TagCollection($tags);
	}
}
