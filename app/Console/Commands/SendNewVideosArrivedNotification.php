<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Models\Video;
use App\User;
use Notification;
use App\Notifications\NewVideosArrived;

class SendNewVideosArrivedNotification extends Command
{
    protected $signature = 'korfilm:send_new_videos_arrived_notification';

    protected $description = 'send new published videos notification to all users';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $users = User::all();
     
        $videos = Video::published()->where('notification_sent', false);

        if($videos->count() > 0)
        {
            $video_ids = $videos->take(3)->pluck('id');

            Notification::send($users, new NewVideosArrived($video_ids));
            
            $videos = Video::published()->where('notification_sent', false);
            $videos->update(['notification_sent' => true]);
        }
    }
}
