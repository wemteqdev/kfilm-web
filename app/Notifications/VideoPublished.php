<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class VideoPublished extends Notification
{
    use Queueable;

    protected $video; 
    
    public function __construct($video)
    {
        $this->video = $video;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject('New Video Arrived')
                    ->greeting('Hello!')
                    ->line('Korfilm published a new video you might be interested.')
                    ->line($this->video->category->name . ' Video: ' . $this->video->name)
                    ->line($this->video->description)
                    ->action('Watch Now', url('/videos/' . $this->video->slug))
                    ->line('Thank you for using korfilm.co!');
    }

    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
