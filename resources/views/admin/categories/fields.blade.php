<div class="row">
    <div class="col-md-6">
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
    <div class="col-md-6">
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
            {!! Form::text('slug', null, ['class' => 'form-control', 'disabled'=>true]) !!}
        </div>

         <!-- Meta tags Field -->
        <div class="form-group ">
            {!! Form::label('meta_tags', 'Meta tags:') !!}
            {!! Form::text('meta_tags', null, ['class' => 'form-control']) !!}
        </div>

        <!-- Videos Count Field -->
        <div class="form-group ">
            {!! Form::label('videos_count', 'Videos Count:') !!}
            {!! Form::number('videos_count', null, ['class' => 'form-control', 'disabled'=>true]) !!}
        </div>

        <!-- Submit Field -->
        <div class="form-group col-sm-12">
            {!! Form::submit('Save', ['class' => 'btn btn-lg btn-primary']) !!}
            <a href="{!! route('admin.categories.index') !!}" class="btn btn-lg btn-default">Cancel</a>
        </div>
    </div>
</div>


@section('scripts')
<script type="text/javascript">
    var selectedImage = {!! (isset($category) && $category->featured_image)?$category->featured_image->toJson(): '{}'; !!};

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

