<?php
namespace App\Http\Controllers\Admin;

use Vimeo\Laravel\Facades\Vimeo;
use App\Http\Controllers\AdminBaseController;

class DashboardController extends AdminBaseController
{

    public function index()
    {
        return view('admin.dashboard.index');
    }
}
