<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddYearToVideosTable extends Migration
{
    public function up()
    {
        Schema::table('videos', function (Blueprint $table) {
            $table->integer('year')->nullable()->default(0);
            $table->datetime('published_at')->nullable()->default(0);
        });
    }

    public function down()
    {
        Schema::table('videos', function (Blueprint $table) {
        });
    }
}
