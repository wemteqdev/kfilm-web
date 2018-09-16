@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            user
        </h1>
    </section>
    <div class="content">
        @include('common.errors')
        <div class="box box-primary">

            <div class="box-body">
                <div class="row">
                    {!! Form::open(['route' => 'admin.users.store', 'class'=>'container-fluid']) !!}

                        @include('admin.users.fields')

                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>
@endsection
