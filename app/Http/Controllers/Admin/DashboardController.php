<?php
namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use Vimeo\Laravel\Facades\Vimeo;
use App\Http\Controllers\AppBaseController;

class DashboardController extends AppBaseController
{

    public function index()
    {
        return view('admin.dashboard.index');
    }
}
