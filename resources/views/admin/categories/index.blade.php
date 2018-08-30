@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1 class="pull-left">Categories</h1>
        <h1 class="pull-right">
            {{ Html::methodLink("PUT", route('admin.categories.update_videos_count'), 'Update Videos Count', [ 'class'=> 'btn btn-warning']) }}
           <a class="btn btn-primary" href="{!! route('admin.categories.create') !!}">Add New</a>
        </h1>
    </section>
    <div class="content">
        <div class="clearfix"></div>

        @include('flash::message')

        <div class="clearfix"></div>
        <div class="box box-primary">
            <div class="box-body">
                    @include('admin.categories.table')
            </div>
        </div>
        <div class="text-center">
        
        </div>
    </div>
@endsection

