<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Group;
use App\Http\Resources\GroupCollection;
use App\Http\Resources\Group as GroupResource;

class GroupController extends Controller
{
	public function index(Request $request)
	{
		return new GroupCollection(Group::all());
	}

	public function show($id)
	{
		return new GroupResource(Group::find($id));
	}
}
