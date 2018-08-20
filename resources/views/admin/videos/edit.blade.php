@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Video
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($video, ['route' => ['admin.videos.update', $video->id], 'method' => 'patch']) !!}

                        @include('admin.videos.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection