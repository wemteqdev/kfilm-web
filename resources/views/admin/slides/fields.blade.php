<div class="row">
  <div class="col-md-6">
    <div class="form-slide" id="image_field_slide">
      <div class="blockquote alert-warning">
        <div id="image-list-popup">
            {!! Form::label('Image Url', 'Image URL:') !!}
            <input name="image_url" type="text" id="image_url" class="form-control hidden" v-bind:value="selectedImage.src" />

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

  <div class="col-md-6">
    <!-- Name Field -->
    <div class="form-group ">
        {!! Form::label('title', 'title:') !!}
        {!! Form::text('title', null, ['class' => 'form-control']) !!}
    </div>

    <!-- Description Field -->
    <div class="form-group ">
        {!! Form::label('description', 'Description:') !!}
        {!! Form::text('description', null, ['class' => 'form-control']) !!}
    </div>

    <!-- Slug Field -->
    <div class="form-group ">
        {!! Form::label('link_text', 'Link Text:') !!}
        {!! Form::text('link_text', null, ['class' => 'form-control']) !!}
    </div>

    <!-- Slug Field -->
    <div class="form-group ">
        {!! Form::label('link_url', 'Link Url:') !!}
        {!! Form::text('link_url', null, ['class' => 'form-control']) !!}
    </div>

    <!-- Slug Field -->
    <div class="form-group ">
        {!! Form::label('style', 'Style:') !!}
        {!! Form::text('style', null, ['class' => 'form-control']) !!}
    </div>

    <div id="slide-tags" class="blockquote alert-primary">
            <h5>Tags</h3>
            <slide-tag-list />
    </div>

    <!-- Status Field -->
    <div class="form-group ">
        {!! Form::label('status', 'Status:') !!}
        <label class="checkbox-inline">
            {!! Form::select('status', App\Enums\SlideStatus::toSelectArray(), null) !!}
        </label>
    </div>

    <!-- Submit Field -->
    <div class="form-group col-sm-12">
        {!! Form::submit('Save', ['class' => 'btn btn-lg btn-primary']) !!}
        <a href="{!! route('admin.slides.index') !!}" class="btn btn-lg btn-default">Cancel</a>
    </div>
  </div>
</div>

@section('scripts')
<script type="text/javascript">
    const slideObject = {!! isset($slide)? $slide->toJson() : '{}' !!};

    const ImageListPopup = new Vue({ 
        el: '#image-list-popup',
        data: {
            selectedImage: { id: slideObject.id, src: slideObject.image_url } 
        },
        methods:{
            onSelectImage(image){
                ImageListPopup.selectedImage = image;
            }
        }
    });

    const SlideTags = new Vue({
        el: '#slide-tags',
        data: {
            slide: slideObject,
            available_tags: {!! json_encode(\App\Models\Slide::existingTags()->pluck('slug')) !!},
        }
    });

</script>>
@endsection
