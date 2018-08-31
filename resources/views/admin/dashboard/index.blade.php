@extends('layouts.app')

@section('content')

<h2>Dashboard</h2>
<hr/>
<div class="blockquote alert-warning">
    <p>Sync videos from vimeo</p>
    {!! Form::open(['method' => 'PUT', 'route' => 'admin.videos.sync_vimeo_videos']) !!}
        <a href="{{ $vimeo_authorization_url }}" class="btn btn-warning">
            <i class="fa fa-circle text-success"></i> 
            <span>Authorize Vimeo</span>
        </a>
        <button type="submit" class="btn btn-warning">Sync Videos From Vimeo</button>
    {!! Form::close() !!}
</div>

<br/>

<div class="blockquote alert-warning">
    <p>Sync subscription plans from stripe</p>
    {!! Form::open(['method' => 'PUT', 'route' => 'admin.plans.sync_stripe_plans']) !!}
        <button type="submit" class="btn btn-warning">Sync Plans From Stripe</button>
    {!! Form::close() !!}
</div>
@endsection