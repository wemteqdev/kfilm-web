<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Series;
use App\Http\Resources\SeriesCollection;
use App\Http\Resources\Series as SeriesResource;

class SeriesController extends Controller
{
	public function index(Request $request)
	{
		return new SeriesCollection(Series::orderBy('created_at', 'desc')->paginate(9));
	}

	public function show($id)
	{
		return new SeriesResource(Series::find($id));
	}
}
