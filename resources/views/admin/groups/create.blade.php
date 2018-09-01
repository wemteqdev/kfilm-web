@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Group
        </h1>
    </section>
    <div class="content">
        @include('common.errors')
        <div class="box box-primary">

            <div class="box-body">
                <div class="row">
                    {!! Form::open(['route' => 'admin.groups.store', 'class'=>'container-fluid']) !!}

                        @include('admin.groups.fields')

                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>
@endsection
