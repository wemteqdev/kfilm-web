<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddViewsCountToVideosTable extends Migration
{
    public function up()
    {
        Schema::table('videos', function (Blueprint $table) {
            $table->integer('views_count')->nullable()->default(0);
            $table->integer('views_count_last_7days')->nullable()->default(0);
            $table->integer('views_count_last_30days')->nullable()->default(0);
        });
    }

    public function down()
    {
    }
}
