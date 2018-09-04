@extends('layouts.app')

@section('content')
    <section class="content-header clearfix">
        <h1 class="pull-left">Images</h1>
        <h1 class="pull-right">
           <a class="btn btn-primary pull-right md-button" style="margin-top: -10px;margin-bottom: 5px" href="{!! route('admin.images.create') !!}">Add New</a>
        </h1>
    </section>
    <div class="content">
        <div class="clearfix"></div>
        @include('flash::message')
        <div class="clearfix"></div>
        <br/>
        <div class="box box-primary">
            {{ $images->links() }}
            <div class="box-body">
                    @include('admin.images.table')
            </div>
            {{ $images->links() }}
        </div>
        <div class="text-center">
        
        </div>
    </div>
@endsection

