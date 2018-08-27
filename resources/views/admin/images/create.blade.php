@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Image
        </h1>
    </section>
    <div class="content">
        @include('adminlte-templates::common.errors')
        <div class="box box-primary">

            <div class="box-body">
                <div class="row">
                    {!! Form::open(['route' => 'admin.images.store', 'enctype'=>'multipart/form-data', 'class'=>'container-fluid']) !!}

                        @include('admin.images.fields')

                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>
@endsection
