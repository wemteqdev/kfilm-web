<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddViewsCountToGroupsTable extends Migration
{
    public function up()
    {
        Schema::table('groups', function (Blueprint $table) {
            $table->integer('views_count')->nullable()->default(0);
            $table->integer('views_count_last_7days')->nullable()->default(0);
            $table->integer('views_count_last_30days')->nullable()->default(0);
        });
    }

    public function down()
    {
        Schema::table('groups', function (Blueprint $table) {
            //
        });
    }
}
