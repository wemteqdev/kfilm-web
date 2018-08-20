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
    {!! Form::text('slug', null, ['class' => 'form-control']) !!}
</div>

<!-- Duration Field -->
<div class="form-group col-sm-6">
    {!! Form::label('duration', 'Duration:') !!}
    {!! Form::number('duration', null, ['class' => 'form-control']) !!}
</div>

<!-- Width Field -->
<div class="form-group col-sm-6">
    {!! Form::label('width', 'Width:') !!}
    {!! Form::number('width', null, ['class' => 'form-control']) !!}
</div>

<!-- Height Field -->
<div class="form-group col-sm-6">
    {!! Form::label('height', 'Height:') !!}
    {!! Form::number('height', null, ['class' => 'form-control']) !!}
</div>

<!-- Type Field -->
<div class="form-group col-sm-6">
    {!! Form::label('type', 'Type:') !!}
    <label class="checkbox-inline">
        {!! Form::select('type', App\Models\Admin\Video::TYPE_OPTIONS, null) !!}
    </label>
</div>

<!-- Status Field -->
<div class="form-group col-sm-6">
    {!! Form::label('status', 'Status:') !!}
    <label class="checkbox-inline">
        {!! Form::select('status', App\Models\Admin\Video::STATUS_OPTIONS, null) !!}
    </label>
</div>

<!-- Featured Image Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('featured_image_id', 'Featured Image Id:') !!}
    {!! Form::number('featured_image_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Featured Video Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('featured_video_id', 'Featured Video Id:') !!}
    {!! Form::number('featured_video_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Vimeo Video Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('vimeo_video_id', 'Vimeo Video Id:') !!}
    {!! Form::text('vimeo_video_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Uri Field -->
<div class="form-group col-sm-6">
    {!! Form::label('uri', 'Uri:') !!}
    {!! Form::text('uri', null, ['class' => 'form-control']) !!}
</div>

<!-- Embed Field -->
<div class="form-group col-sm-6">
    {!! Form::label('embed', 'Embed:') !!}
    {!! Form::text('embed', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('admin.videos.index') !!}" class="btn btn-default">Cancel</a>
</div>
