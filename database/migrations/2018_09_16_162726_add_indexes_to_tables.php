<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddIndexesToTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            //$table->index('verified');
        });

        Schema::table('groups', function (Blueprint $table) {
            $table->unique('slug');
            $table->index('name');
        });

        Schema::table('group_video', function (Blueprint $table) {
            $table->index('video_id');
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->unique('slug');
            $table->index('name');
        });

        Schema::table('category_video', function (Blueprint $table) {
            $table->index('category_id');
            $table->index('video_id');
        });

        Schema::table('series', function (Blueprint $table) {
            $table->unique('slug');
            $table->index('name');
        });

        Schema::table('histories', function (Blueprint $table) {
            $table->index('video_id');
            $table->index('user_id');
        });

        Schema::table('images', function (Blueprint $table) {
        });

        Schema::table('videos', function (Blueprint $table) {
            $table->index('slug');
            $table->index('name');
            $table->index('series_id');
            $table->index('status');
            $table->index('type');
            $table->index('scope');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
