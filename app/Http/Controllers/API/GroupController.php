<?php
namespace App\Http\Controllers\API;

use Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\GroupCollection;
use App\Http\Resources\Group as GroupResource;
use App\Models\Group;

class GroupController extends Controller
{
	public function index(Request $request)
	{
		return new GroupCollection(Group::all());
	}

	public function show($id)
	{
		$group = Group::find($id);
		
		$group->addView();
		
		return new GroupResource($group);
	}
}
