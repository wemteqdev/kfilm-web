<?php
namespace App\Http\Controllers\Gateway;
use Illuminate\Http\Request;
use Vimeo\Laravel\Facades\Vimeo;

class VimeoController extends Controller
{
    public function oauth2_callback(Request $request){

        $response = Vimeo::accessToken($request->input('code'), env('VIMEO_REDIRECT_URI'));
        session(['vimeo_access_token' => $response['body']['access_token'] ]);

        return redirect('admin.dashboard');
    }
}
