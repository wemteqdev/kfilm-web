<!-- Id Field -->
<div class="form-slide">
    {!! Form::label('id', 'Id:') !!}
    <p>{!! $slide->id !!}</p>
</div>

<!-- Name Field -->
<div class="form-slide">
    {!! Form::label('name', 'Name:') !!}
    <p>{!! $slide->name !!}</p>
</div>

<!-- Description Field -->
<div class="form-slide">
    {!! Form::label('description', 'Description:') !!}
    <p>{!! $slide->description !!}</p>
</div>

<!-- Slug Field -->
<div class="form-slide">
    {!! Form::label('slug', 'Slug:') !!}
    <p>{!! $slide->slug !!}</p>
</div>

<!-- Created At Field -->
<div class="form-slide">
    {!! Form::label('created_at', 'Created At:') !!}
    <p>{!! $slide->created_at !!}</p>
</div>

<!-- Updated At Field -->
<div class="form-slide">
    {!! Form::label('updated_at', 'Updated At:') !!}
    <p>{!! $slide->updated_at !!}</p>
</div>

