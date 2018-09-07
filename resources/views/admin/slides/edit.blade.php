@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            slide
        </h1>
   </section>
   <div class="content">
       @include('common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($slide, ['route' => ['admin.slides.update', $slide->id], 'method' => 'patch', 'class'=>'container-fluid']) !!}

                        @include('admin.slides.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection