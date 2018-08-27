<div class="row">
    <div class="col-lg-6">
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
            {!! Form::text('slug', null, ['class' => 'form-control', 'readonly'=>true]) !!}
        </div>

        <!-- Duration Field -->
        <div class="form-group ">
            {!! Form::label('duration', 'Duration:') !!}
            {!! Form::number('duration', null, ['class' => 'form-control', 'readonly'=>true]) !!}
        </div>

        <!-- Width Field -->
        <div class="form-group ">
            {!! Form::label('width', 'Width:') !!}
            {!! Form::number('width', null, ['class' => 'form-control', 'readonly'=>true]) !!}
        </div>

        <!-- Height Field -->
        <div class="form-group ">
            {!! Form::label('height', 'Height:') !!}
            {!! Form::number('height', null, ['class' => 'form-control', 'readonly'=>true]) !!}
        </div>

        <!-- Vimeo Video Id Field -->
        <div class="form-group ">
            {!! Form::label('vimeo_video_id', 'Vimeo Video Id:') !!}
            {!! Form::text('vimeo_video_id', null, ['class' => 'form-control', 'readonly'=>true]) !!}
        </div>

        <!-- Uri Field -->
        <div class="form-group ">
            {!! Form::label('uri', 'Uri:') !!}
            {!! Form::text('uri', null, ['class' => 'form-control', 'readonly'=>true]) !!}
        </div>

        <!-- Embed Field -->
        <div class="form-group ">
            {!! Form::label('embed', 'Embed:') !!}
            {!! Form::text('embed', null, ['class' => 'form-control']) !!}
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
    </div>
    <div class="col-lg-6">
        <div class="row">
            <div class="col-xl-6">
                <div class="form-group" id="image_field_group">
                    <div class="blockquote alert-warning">
                    <div id="image-list-popup">
                        {!! Form::label('featured_image_id', 'Featured Image:') !!}
                        <input name="featured_image_id" type="hidden" id="featured_image_id" class="form-control hidden" v-bind:value="selectedImage.id" />

                        <div v-if="selectedImage.src">
                            <img v-bind:src="selectedImage.src" width=200/>
                        </div>

                        <br/>
                        <b-btn v-b-modal.image-list-modal variant="primary">Select Image</b-btn>

                        <div>
                          <b-modal id="image-list-modal" size="lg" title="Select Image">
                            <image-list-popup />
                          </b-modal>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-6">
                <div class="form-group" id="video_field_group">
                    <div class="blockquote alert-warning">
                    <div id="video-list-popup">
                        {!! Form::label('featured_image_id', 'Featured Video:') !!}
                        <input name="featured_video_id" type="hidden" id="featured_video_id" class="form-control hidden" v-bind:value="selectedVideo.id" />

                        <div v-if="selectedVideo.featured_image_url">
                            <img v-bind:src="selectedVideo.featured_image_url" width=200/>
                        </div>

                        <br/>
                        <b-btn v-b-modal.video-list-modal variant="primary">Select Video</b-btn>

                        <div>
                          <b-modal id="video-list-modal" size="lg" title="Select Video">
                            <video-list-popup />
                          </b-modal>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="row">
            <div class="col-lg-6">
                <div id="video-categories">
                    <video-category-list />

                </div>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-xs-12">
        <div class="form-group col-sm-12">
            {!! Form::submit('Save', ['class' => 'btn btn-lg btn-primary']) !!}
            <a href="{!! route('admin.videos.index') !!}" class="btn btn-lg btn-default">Cancel</a>
        </div>
    </div>
</div>




@section('scripts')
<script type="text/javascript">

    var Video = {!! $video->toJson() !!};

    var selectedImage = Video.featured_image || {};

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

    var selectedVideo = Video.featured_video || {};

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


    const VideoCategories = new Vue({
        el: '#video-categories',
        data: {
            categories: [],
            available_categories: [],
        }
    });
</script>>
@endsection
