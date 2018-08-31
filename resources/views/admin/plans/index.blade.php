@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1 class="pull-left">Plans</h1>
        <h1 class="pull-right">
           {{ Html::methodLink("PUT", route('admin.plans.sync_stripe_plans'), 'Sync From Stripe', [ 'class'=> 'btn btn-warning']) }}
        </h1>
    </section>
    <div class="content">
        <div class="clearfix"></div>

        @include('flash::message')

        <div class="clearfix"></div>
        <div class="box box-primary">
            <div class="box-body">
                @include('admin.plans.table')
            </div>
        </div>
        <div class="text-center">
        
        </div>
    </div>
@endsection

