<div class="row">
  <div class="col-md-6">
    <!-- Name Field -->
    <div class="form-group ">
        {!! Form::label('name', 'name:') !!}
        {!! Form::text('name', null, ['class' => 'form-control']) !!}
    </div>

    <!-- Description Field -->
    <div class="form-group">
        {!! Form::label('email', 'email:') !!}
        {!! Form::text('email', null, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group ">
        {!! Form::label('role', 'Roles:') !!}
        {!! implode(',', $user->role_names->toArray()) !!}
        <div class="">
            {!! Form::select('role', App\Enums\UserRole::toSelectArray(), null) !!}
        </div>
    </div>

    <!-- Submit Field -->
    <div class="form-group col-sm-12">
        {!! Form::submit('Save', ['class' => 'btn btn-lg btn-primary']) !!}
        <a href="{!! route('admin.groups.index') !!}" class="btn btn-lg btn-default">Cancel</a>
    </div>
  </div>
</div>

@section('scripts')
<script type="text/javascript">

</script>>
@endsection
