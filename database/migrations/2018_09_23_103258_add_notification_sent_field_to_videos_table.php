<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNotificationSentFieldToVideosTable extends Migration
{
    public function up()
    {
        Schema::table('videos', function (Blueprint $table) {
            $table->boolean('notification_sent')->nullable()->default(false);
            $table->index('notification_sent');
        });
    }

    public function down()
    {
        Schema::table('videos', function (Blueprint $table) {

        });
    }
}
