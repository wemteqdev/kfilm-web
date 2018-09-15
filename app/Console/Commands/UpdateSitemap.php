<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Carbon\Carbon;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class UpdateSitemap extends Command
{
    protected $signature = 'korfilm:sitemap';

    protected $description = 'Generate sitemap from videos';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {

        $sitemap = Sitemap::create();

        $categories = \App\Models\Category::all();
        foreach ($categories as $category) {
            $sitemap->add(Url::create('https://korfilm.co/categories/' . $category->slug)
                ->setLastModificationDate(Carbon::yesterday())
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_YEARLY)
                ->setPriority(0.1));
        }

        $videos = \App\Models\Video::all();
        foreach ($videos as $video) {
            $sitemap->add(Url::create('https://korfilm.co/videos/' . $video->slug)
                ->setLastModificationDate(Carbon::yesterday())
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_YEARLY)
                ->setPriority(0.1));
        }

        $sitemap->writeToFile(public_path('sitemap.xml'));

    }
}
