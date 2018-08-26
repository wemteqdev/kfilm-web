<div class="form-group col-sm-6" id="image_field_group">
    <div id="image-list-popup">
        {!! Form::label('featured_image_id', 'Featured Image:') !!}
        <input name="featured_image_id" type="text" id="featured_image_id" class="form-control hidden" v-bind:value="selectedImage.id" />
        <br/>
        <div v-if="selectedImage.src">
            <a href="javascript:void(0);" data-toggle="modal" data-target="#image-list-modal"><img v-bind:src="selectedImage.src" width=200/></a>
        </div>
        <!-- Button trigger modal -->
        <!-- Modal -->
        <div v-if="!selectedImage.src">
            <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#image-list-modal" >
              Select Image
            </button>
        </div>
        <div class="modal fade" id="image-list-modal" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modal-title">Image List</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">

                <image-list-popup />

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-info" data-dismiss="modal">OK</button>
              </div>
            </div>
          </div>
        </div>
        
    </div>

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
        {!! Form::select('type', App\Models\Video::TYPE_OPTIONS, null) !!}
    </label>
</div>

<!-- Status Field -->
<div class="form-group col-sm-6">
    {!! Form::label('status', 'Status:') !!}
    <label class="checkbox-inline">
        {!! Form::select('status', App\Models\Video::STATUS_OPTIONS, null) !!}
    </label>
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


@section('scripts')
<script type="text/javascript">

    var selectedImage = {!! (isset($video) && $video->featured_image)?$video->featured_image->toJson(): '{}'; !!};
    selectedImage.src = selectedImage.uri;

    const ImageListPopup = new Vue({ 
        el: '#image-list-popup',
        data: {
            selectedImage: selectedImage 
        },
        methods:{
            onSelectImage(image){
                ImageListPopup.selectedImage = image;
            }
        }
    });
</script>>
@endsection
