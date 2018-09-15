<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Video;
use App\Models\Category;
use App\Models\Group;
use App\Models\Series;
use CyrildeWit\EloquentViewable\Support\Period;
use Carbon\Carbon;
use CyrildeWit\EloquentViewable\View;

class UpdateViewsCount extends Command
{
    protected $signature = 'korfilm:update_video_views_count';

    protected $description = 'Updates views count of videos, categories, groups and series';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $week_ago = Carbon::now()->subDays(7);
        $month_ago = Carbon::now()->subDays(30);
        
        Video::chunk(100, function ($items) use ($week_ago, $month_ago) {
            foreach ($items as $item) {
                $item->update([
                    'views_count' => $item->views_count +  $item->getUniqueViews(Period::upto($month_ago)),
                    'views_count_last_7days' => $item->getUniqueViews(Period::since($week_ago)),
                    'views_count_last_30days' => $item->getUniqueViews(Period::since($month_ago))
                ]);
            }
        });
        
        Category::chunk(100, function ($items) use ($week_ago, $month_ago) {
            foreach ($items as $item) {
                $item->update([
                    'views_count' => $item->views_count +  $item->getUniqueViews(Period::upto($month_ago)),
                    'views_count_last_7days' => $item->getUniqueViews(Period::since($week_ago)),
                    'views_count_last_30days' => $item->getUniqueViews(Period::since($month_ago))
                ]);
            }
        });

        Group::chunk(100, function ($items)  use ($week_ago, $month_ago) {
            foreach ($items as $item) {
                $item->update([
                    'views_count' => $item->views_count +  $item->getUniqueViews(Period::upto($month_ago)),
                    'views_count_last_7days' => $item->getUniqueViews(Period::since($week_ago)),
                    'views_count_last_30days' => $item->getUniqueViews(Period::since($month_ago))
                ]);
            }
        });

        Series::chunk(100, function ($items) use ($week_ago, $month_ago) {
            foreach ($items as $item) {
                $item->update([
                    'views_count' => $item->views_count +  $item->getUniqueViews(Period::upto($month_ago)),
                    'views_count_last_7days' => $item->getUniqueViews(Period::since($week_ago)),
                    'views_count_last_30days' => $item->getUniqueViews(Period::since($month_ago))
                ]);
            }
        });

        View::where('viewed_at', '<=', $month_ago)->delete();
        
        print("updated views count successfully \n");
    }
}
