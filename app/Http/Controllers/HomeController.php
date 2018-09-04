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
}
