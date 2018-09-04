<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Vimeo\Laravel\Facades\Vimeo;
use View;
use App\Models\Video;
use App\Observers\VideoObserver;

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
        
        Video::observe(VideoObserver::class);
        $vimeo_authorization_url = Vimeo::buildAuthorizationEndpoint(env('VIMEO_REDIRECT_URI'));

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
