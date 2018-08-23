<div class="form-group col-sm-6">
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
    {!! Form::text('slug', null, ['class' => 'form-control', 'disabled'=>true]) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('admin.groups.index') !!}" class="btn btn-default">Cancel</a>
</div>


@section('scripts')
<script type="text/javascript">

    const selectedImage = {!! isset($group)?$group->featured_image->toJson(): '{}'; !!};
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
