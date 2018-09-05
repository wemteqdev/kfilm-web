<?php

namespace App\Jobs\StripeWebhooks;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Spatie\StripeWebhooks\StripeWebhookCall;
use Laravel\Cashier\Subscription as CashierSubscription;
use App\User;

class HandlePaymentFailedInvoice implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $webhookCall;

    public function __construct(StripeWebhookCall $webhookCall)
    {
        $this->webhookCall = $webhookCall;
    }

    public function handle()
    {
        $payload = $this->webhookCall->payload;
        $stripeSubscriptionId = $payload['data']['object']['subscription'];

        if ($stripeSubscriptionId) {
            $subscription = CashierSubscription::where('stripe_id', $stripeSubscriptionId)->first();

            if($subscription!=null)
            {
                $user = User::find($subscription->user_id);
                $user->syncRoles(['free']);   
            }

            if ($payload['data']['object']['attempt_count'] == 1) {
                
            }
        }
    }
}
