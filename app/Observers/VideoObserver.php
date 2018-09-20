<?php

namespace App\Observers;

use App\Models\Video;
use App\Models\Category;
use App\Models\Group;
use App\Models\Series;



class VideoObserver
{
    public function created(Video $video)
    {
        Category::update_counter_cache();
        Series::update_counter_cache();
        Group::update_counter_cache();
    }

    public function updated(Video $video)
    {
        Category::update_counter_cache();
        Series::update_counter_cache();
        Group::update_counter_cache();

        if ($video->category_id != $video->getOriginal('category_id')) {
            $video->syncTags([]);
        }
    }

    public function deleted(Video $video)
    {
        Category::update_counter_cache();
        Series::update_counter_cache();
        Group::update_counter_cache();
    }

    public function restored(Video $video)
    {
    }

    public function forceDeleted(Video $video)
    {
    }
}
