@extends('layouts.app')

@section('content')
    <section class="content-header clearfix">
        <h1 class="pull-left">Videos</h1>
        <h1 class="pull-right">
           <a class="btn btn-primary md-button" href="{!! route('admin.videos.create') !!}">Add New</a>
        </h1>
    </section>
    <div class="content">
        <div class="clearfix"></div>
        @include('flash::message')
        <div class="clearfix"></div>
        <br/>
        <div class="box box-primary">
            {{ $videos->links() }}
            <div class="box-body">
                @include('admin.videos.table')
            </div>
            {{ $videos->links() }}
        </div>
        <div class="text-center">
        
        </div>
    </div>
@endsection

