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
        return view('home');
    }

    public function oauth2_callback(Request $request){

        $response = Vimeo::accessToken($request->input('code'), 'http://korfilm.loc/oauth2/redirect');
        session(['vimeo_access_token' => $response['body']['access_token'] ]);
        return redirect('home');
    }
}
