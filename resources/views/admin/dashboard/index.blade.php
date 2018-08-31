@extends('layouts.app')

@section('content')
    {{ Html::methodLink("PUT", route('admin.videos.sync_vimeo_videos'), 'Sync Videos From Vimeo', [ 'class'=> 'btn btn-warning']) }}
    {{ Html::methodLink("PUT", route('admin.plans.sync_stripe_plans'), 'Sync Plans From Stripe', [ 'class'=> 'btn btn-warning']) }}
@endsection