<?php
namespace App\Http\Controllers\Gateway;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StripeController extends Controller
{
    public function webhook(Request $request){
        return [];
    }
}