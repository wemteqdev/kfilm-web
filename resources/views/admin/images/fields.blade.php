<!-- File Field -->
<div class="form-group ">
    {!! Form::label('file', 'File:') !!}
    {!! Form::file('file', null, ['class' => 'form-control']) !!}
</div>

<div class="clearfix"></div>
<!-- Height Field -->
<div class="form-group ">
    {!! Form::label('alt', 'Alt:') !!}
    {!! Form::text('alt', null, ['class' => 'form-control']) !!}
</div>

<!-- Width Field -->
<div class="form-group ">
    {!! Form::label('width', 'Width:') !!}
    {!! Form::number('width', null, ['class' => 'form-control', 'disabled'=>true]) !!}
</div>

<!-- Height Field -->
<div class="form-group ">
    {!! Form::label('height', 'Height:') !!}
    {!! Form::number('height', null, ['class' => 'form-control', 'disabled'=>true]) !!}
</div>

<!-- Uri Field -->
<div class="form-group ">
    {!! Form::label('uri', 'Uri:') !!}
    {!! Form::text('uri', null, ['class' => 'form-control', 'disabled'=>true]) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary btn-lg']) !!}
    <a href="{!! route('admin.images.index') !!}" class="btn  btn-lg btn-default">Cancel</a>
</div>
