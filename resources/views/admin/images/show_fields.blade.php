<!-- Id Field -->
<div class="form-group">
    {!! Form::label('id', 'Id:') !!}
    <p>{!! $image->id !!}</p>
</div>

<!-- Width Field -->
<div class="form-group">
    {!! Form::label('width', 'Width:') !!}
    <p>{!! $image->width !!}</p>
</div>

<!-- Height Field -->
<div class="form-group">
    {!! Form::label('height', 'Height:') !!}
    <p>{!! $image->height !!}</p>
</div>

<!-- Uri Field -->
<div class="form-group">
    {!! Form::label('uri', 'Uri:') !!}
    <p>{!! $image->uri !!}</p>
</div>

<!-- Created At Field -->
<div class="form-group">
    {!! Form::label('created_at', 'Created At:') !!}
    <p>{!! $image->created_at !!}</p>
</div>

<!-- Updated At Field -->
<div class="form-group">
    {!! Form::label('updated_at', 'Updated At:') !!}
    <p>{!! $image->updated_at !!}</p>
</div>

