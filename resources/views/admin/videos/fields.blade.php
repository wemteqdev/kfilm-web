<div class="form-group" id="image_field_group">
    <div id="image-list-popup">
        {!! Form::label('featured_image_id', 'Featured Image:') !!}
        <input name="featured_image_id" type="hidden" id="featured_image_id" class="form-control hidden" v-bind:value="selectedImage.id" />

        <div v-if="selectedImage.src">
            <img v-bind:src="selectedImage.src" width=200/>
        </div>

        <b-btn v-b-modal.image-list-modal variant="primary">Select Image</b-btn>

        <div>
          <b-modal id="image-list-modal" size="lg" title="Select Image">
            <image-list-popup />
          </b-modal>
        </div>
    </div>
</div>

<div class="form-group" id="video_field_group">
    <div id="video-list-popup">
        {!! Form::label('featured_image_id', 'Featured Image:') !!}
        <input name="featured_video_id" type="hidden" id="featured_video_id" class="form-control hidden" v-bind:value="selectedVideo.id" />

        <div v-if="selectedVideo.src">
            <img v-bind:src="selectedVideo.src" width=200/>
        </div>

        <b-btn v-b-modal.video-list-modal variant="primary">Select Video</b-btn>

        <div>
          <b-modal id="video-list-modal" size="lg" title="Select Video">
            <video-list-popup />
          </b-modal>
        </div>
    </div>
</div>

<!-- Name Field -->
<div class="form-group ">
    {!! Form::label('name', 'Name:') !!}
    {!! Form::text('name', null, ['class' => 'form-control']) !!}
</div>

<!-- Description Field -->
<div class="form-group ">
    {!! Form::label('description', 'Description:') !!}
    {!! Form::text('description', null, ['class' => 'form-control']) !!}
</div>

<!-- Slug Field -->
<div class="form-group ">
    {!! Form::label('slug', 'Slug:') !!}
    {!! Form::text('slug', null, ['class' => 'form-control']) !!}
</div>

<!-- Duration Field -->
<div class="form-group ">
    {!! Form::label('duration', 'Duration:') !!}
    {!! Form::number('duration', null, ['class' => 'form-control']) !!}
</div>

<!-- Width Field -->
<div class="form-group ">
    {!! Form::label('width', 'Width:') !!}
    {!! Form::number('width', null, ['class' => 'form-control']) !!}
</div>

<!-- Height Field -->
<div class="form-group ">
    {!! Form::label('height', 'Height:') !!}
    {!! Form::number('height', null, ['class' => 'form-control']) !!}
</div>

<!-- Type Field -->
<div class="form-group ">
    {!! Form::label('type', 'Type:') !!}
    <label class="checkbox-inline">
        {!! Form::select('type', App\Models\Video::TYPE_OPTIONS, null) !!}
    </label>
</div>

<!-- Status Field -->
<div class="form-group ">
    {!! Form::label('status', 'Status:') !!}
    <label class="checkbox-inline">
        {!! Form::select('status', App\Models\Video::STATUS_OPTIONS, null) !!}
    </label>
</div>

<!-- Vimeo Video Id Field -->
<div class="form-group ">
    {!! Form::label('vimeo_video_id', 'Vimeo Video Id:') !!}
    {!! Form::text('vimeo_video_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Uri Field -->
<div class="form-group ">
    {!! Form::label('uri', 'Uri:') !!}
    {!! Form::text('uri', null, ['class' => 'form-control']) !!}
</div>

<!-- Embed Field -->
<div class="form-group ">
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

    var selectedVideo = {!! (isset($video) && $video->featured_video)?$video->featured_video->toJson(): '{}'; !!};

    const VideoListPopup = new Vue({ 
        el: '#video-list-popup',
        data: {
            selectedVideo: selectedVideo 
        },
        methods:{
            onSelectVideo(video){
                VideoListPopup.selectedVideo = video;
            }
        }
    });




</script>>
@endsection
