<?php
namespace App\Http\Controllers\Gateway;
use Illuminate\Http\Request;
use Vimeo\Laravel\Facades\Vimeo;

class StripeController extends Controller
{
    public function webhook(Request $request){
        return [];
    }
}