@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            User
        </h1>
   </section>
   <div class="content">
       @include('flash::message')
       @include('common.errors')

       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($user, ['route' => ['admin.users.update', $user->id], 'method' => 'patch', 'class'=>'container-fluid']) !!}

                        @include('admin.users.fields')

                   {!! Form::close() !!}


                   {!! Form::model($user, ['route' => ['admin.users.update_password', $user->id], 'method' => 'patch', 'class'=>'container-fluid']) !!}

                        @include('admin.users.password_fields')

                    {!! Form::close() !!}

               </div>
           </div>
       </div>
   </div>
@endsection