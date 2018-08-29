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
		$tagService = app(\Cviebrock\EloquentTaggable\Services\TagService::class);
		$tags = $tagService->getAllTags(Video::class);
		return new TagCollection($tags);
	}

	public function popular(Request $request)
	{
		$tagService = app(\Cviebrock\EloquentTaggable\Services\TagService::class);
		$tags = $tagService->getPopularTags(10, Video::class);
		return new TagCollection($tags);
	}
}
