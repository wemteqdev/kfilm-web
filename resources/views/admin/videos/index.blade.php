@extends('layouts.app')

@section('content')
    <section class="content-header clearfix">
        <h1 class="pull-left">Videos</h1>
        <h1 class="pull-right">
           <!-- <a class="btn btn-primary md-button" href="{!! route('admin.videos.create') !!}">Add New</a> -->
        </h1>
    </section>

    <div class="filter">
        <a class="btn btn-primary md-button" href="{!! request()->fullUrlWithQuery(['type'=>'normal']) !!}">Normal</a>
        <a class="btn btn-warning md-button" href="{!! request()->fullUrlWithQuery(['type'=>'featured']) !!}">featured</a>
        
        <form class="form-inline float-right" action="{!! request()->fullUrlWithQuery([]) !!}">
            <div class="form-group">
                <input type="text" name="search" class="form-control" value="{{ app('request')->input('search') }}"/>
                <input type="hidden" name="searchFields" value="name:like"/>
                <input type="submit" value="Submit" class="btn btn-primary"/>
            </div>
        </form>
    </div>
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

