<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class NewVideosArrived extends Notification
{
    use Queueable;

    protected $video_ids;
    public function __construct($video_ids)
    {
        $this->video_ids = $video_ids;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {

        $videos = \App\Models\Video::whereIn('id', $this->video_ids)->get();

        $message = (new MailMessage)
                    ->subject('New Videos Arrived')
                    ->greeting('Hello!')
                    ->line('Korfilm published a new videos you might be interested.');
        
        foreach($videos as $video)
        {
            $message->line('<h2><a href="' . url('/videos' . $video->slug) . '">' . $video->name . '</a>, ' . gmdate("H:i:s", $video->duration) . '</h2>');
        }

        return $message->action('Watch Recent Films Now', url('/recent'))
                        ->line('Thank you for using korfilm.co!');
    }

    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
