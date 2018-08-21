<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Vimeo\Laravel\Facades\Vimeo;

class HomeController extends Controller
{
    public function index()
    {
        return view('home');
    }

    public function oauth2_callback(Request $request){

        $response = Vimeo::accessToken($request->input('code'), env('VIMEO_REDIRECT_URI'));
        session(['vimeo_access_token' => $response['body']['access_token'] ]);

        return redirect('home');
    }
}
