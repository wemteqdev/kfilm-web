<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Vimeo\Laravel\Facades\Vimeo;
use View;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
        
        $vimeo_authorization_url = Vimeo::buildAuthorizationEndpoint('http://korfilm.loc/oauth2/redirect');

        View::share('vimeo_authorization_url', $vimeo_authorization_url);
        session('vimeo_authorization_url', $vimeo_authorization_url);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
