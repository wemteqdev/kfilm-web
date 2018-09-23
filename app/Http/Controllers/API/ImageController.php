<?php
namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Http\Resources\ImageCollection;
use App\Http\Resources\Image as VideoResource;
use App\Models\Image;

class ImageController extends Controller
{
	public function index(Request $request)
	{
		return new ImageCollection(Image::orderBy('created_at', 'desc')->paginate(9));
	}
}
