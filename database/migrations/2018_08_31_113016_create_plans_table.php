<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->string('id');
            $table->boolean('active');
            $table->integer('amount');
            $table->string('currency');
            $table->string('interval');
            $table->integer('interval_count');
            $table->boolean('livemode');
            $table->string('nickname');
            $table->integer('trial_period_days')->nullable();
            $table->integer('featured_image_id');
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
        Schema::dropIfExists('plans');
    }
}
