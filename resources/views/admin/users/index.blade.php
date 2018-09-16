@extends('layouts.app')

@section('content')
    <section class="content-header clearfix mb-3">
        <h2 class="pull-left">USERS ({{ \App\User::count() }})</h2>
    </section>
    <div class="content">
        <div class="clearfix">
            <form class="form-inline" action="{!! request()->fullUrlWithQuery([]) !!}">
                <div class="form-group">
                    <input type="text" name="search" class="form-control" value="{{ app('request')->input('search') }}"/>
                    <input type="hidden" name="searchFields" value="name:like;email:like"/>
                    <input type="submit" value="Submit" tabindex="-1" class="btn btn-primary"/>
                </div>
            </form>
        </div>
        <br/>
        <div class="clearfix"></div>

        @include('flash::message')

        <div class="clearfix"></div>
        <div class="box box-primary">
            <div class="box-body">
                {{ $users->links() }}
                
                @include('admin.users.table')
                
                {{ $users->links() }}
            </div>
        </div>
        <div class="text-center">
        
        </div>
    </div>
@endsection

