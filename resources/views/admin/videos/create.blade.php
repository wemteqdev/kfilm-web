@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Video
        </h1>
    </section>
    <div class="content">
        @include('common.errors')
        <div class="box box-primary">

            <div class="box-body">
                <div class="row">
                    {!! Form::open(['route' => 'admin.videos.store', 'class'=>'container-fluid']) !!}

                        @include('admin.videos.fields')

                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>
@endsection
