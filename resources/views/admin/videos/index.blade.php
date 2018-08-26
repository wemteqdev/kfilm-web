@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1 class="pull-left">Videos</h1>
        <h1 class="pull-right">
           <a class="btn btn-primary pull-right" href="{!! route('admin.videos.create') !!}">Add New</a>
           {!! Form::open(['route' => 'admin.videos.sync_vimeo_videos', 'method' => 'put']) !!}
                {!! Form::button('<i class="glyphicon glyphicon-edit"></i> Sync From Vimeo', ['type' => 'Sync from Vimeo', 'class' => 'btn btn-danger btn-xs', 'onclick' => "return confirm('Are you sure?')"]) !!}
           {!! Form::close() !!}
        </h1>
    </section>
    <div class="content">
        <div class="clearfix"></div>

        @include('flash::message')

        <div class="clearfix"></div>
        <div class="box box-primary">
            <div class="box-body">
                @include('admin.videos.table')
            </div>
        </div>
        <div class="text-center">
        
        </div>
    </div>
@endsection

