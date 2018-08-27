<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSeriesIdToVideosTable extends Migration
{
    
    public function up()
    {
        Schema::table('videos', function (Blueprint $table) {
            $table->integer('series_id')->nullable();
        });
    }

    public function down()
    {
        Schema::table('videos', function (Blueprint $table) {

        });
    }
}
