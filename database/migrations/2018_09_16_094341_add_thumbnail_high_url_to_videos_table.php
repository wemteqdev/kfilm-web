<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddThumbnailHighUrlToVideosTable extends Migration
{
    public function up()
    {
        Schema::table('videos', function (Blueprint $table) {
            $table->string('thumbnail_high_url')->nullable();
        });
    }

    public function down()
    {
        Schema::table('videos', function (Blueprint $table) {
        });
    }
}
