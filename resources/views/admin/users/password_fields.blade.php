<div class="row">
  <div class="col-md-6">
    <div class="form-group ">
        {!! Form::label('new_password', 'new password:') !!}
        {!! Form::text('new_password', null, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group ">
        {!! Form::label('confirm_password', 'confirm password:') !!}
        {!! Form::text('confirm_password', null, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group col-sm-12">
        {!! Form::submit('Update Password', ['class' => 'btn btn-lg btn-primary']) !!}
    </div>
  </div>
</div>
