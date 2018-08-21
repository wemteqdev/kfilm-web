<div class="form-group col-sm-6">
    {!! Form::label('featured_image_id', 'Featured Image:') !!}
    {!! Form::text('featured_image_id', null, ['class' => 'form-control']) !!}

    <br/>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal">
      Select Image
    </button>

</div>

<!-- Name Field -->
<div class="form-group col-sm-6">
    {!! Form::label('name', 'Name:') !!}
    {!! Form::text('name', null, ['class' => 'form-control']) !!}
</div>

<!-- Description Field -->
<div class="form-group col-sm-6">
    {!! Form::label('description', 'Description:') !!}
    {!! Form::text('description', null, ['class' => 'form-control']) !!}
</div>

<!-- Slug Field -->
<div class="form-group col-sm-6">
    {!! Form::label('slug', 'Slug:') !!}
    {!! Form::text('slug', null, ['class' => 'form-control', 'disabled'=>true]) !!}
</div>

<!-- Videos Count Field -->
<div class="form-group col-sm-6">
    {!! Form::label('videos_count', 'Videos Count:') !!}
    {!! Form::number('videos_count', null, ['class' => 'form-control', 'disabled'=>true]) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('admin.categories.index') !!}" class="btn btn-default">Cancel</a>
</div>

{!! view('admin.images._modal') !!}