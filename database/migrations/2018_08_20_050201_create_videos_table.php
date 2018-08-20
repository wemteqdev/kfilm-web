<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVideosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('videos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('slug');
            $table->integer('duration');
            $table->integer('width');
            $table->integer('height');
            $table->tinyInteger('type')->default(0);    // [normal, featured]
            $table->tinyInteger('status')->default(0);  // [draft, active]

            $table->integer('featured_image_id')->nullable();
            $table->integer('featured_video_id')->nullable();

            $table->string('vimeo_video_id')->nullable();
            $table->string('thumbnail_url')->nullable();
            $table->string('uri')->nullable();
            $table->text('embed')->nullable();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('videos');
    }
}
