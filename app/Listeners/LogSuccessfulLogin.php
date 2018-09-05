<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Login;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Http\Request;

class LogSuccessfulLogin
{
    public function __construct(Request $request)
    {
        //
    }

    public function handle(Login $event)
    {
        $user = $event->user;
    }
}
