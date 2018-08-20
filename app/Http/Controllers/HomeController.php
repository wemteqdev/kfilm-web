<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Vimeo\Laravel\Facades\Vimeo;

class HomeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $albums = Vimeo::request('/me/groups', ['per_page' => 100], 'GET')['body']['data'];
        //var_dump($albums);
        return view('home', ['albums' => $albums]);
    }
}
