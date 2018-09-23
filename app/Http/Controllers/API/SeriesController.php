<?php
namespace App\Http\Controllers\API;

use Request;

use App\Http\Controllers\Controller;
use App\Http\Resources\SeriesCollection;
use App\Http\Resources\Series as SeriesResource;
use App\Models\Series;

class SeriesController extends Controller
{
	public function index(Request $request)
	{
		return new SeriesCollection(Series::orderBy('created_at', 'desc')->paginate(9));
	}

	public function show($id_or_slug)
	{
		$series = Series::find($id_or_slug);

		if($series==null){
			$series = Series::where('slug', $id_or_slug)->firstorfail();
		}
		
		$series->addView();
		
		return new SeriesResource($series);
	}
}