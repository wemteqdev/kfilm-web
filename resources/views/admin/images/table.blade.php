<table class="table table-responsive" id="images-table">
    <thead>
        <tr>
        <th>Image</th>
        <th>Width</th>
        <th>Height</th>
        <th>Uri</th>
        <th>Alt</th>
        <th colspan="3">Action</th>
        </tr>
    </thead>
    <tbody>
    @foreach($images as $image)
        <tr>
            <td>
                <img src='{!! asset($image->uri) !!}' width="100"/>
                {!! $image->name !!}
            </td>
            <td>{!! $image->width !!}</td>
            <td>{!! $image->height !!}</td>
            <td>{!! $image->uri !!}</td>
            <td>{!! $image->alt !!}</td>
            <td>
                {!! Form::open(['route' => ['admin.images.destroy', $image->id], 'method' => 'delete']) !!}
                <div class='btn-group'>
                    <a href="{!! route('admin.images.show', [$image->id]) !!}" class='btn btn-default btn-xs'><i class="fa fa-eye"></i></a>
                    <a href="{!! route('admin.images.edit', [$image->id]) !!}" class='btn btn-default btn-xs'><i class="fa fa-edit"></i></a>
                    {!! Form::button('<i class="fa fa-trash"></i>', ['type' => 'submit', 'class' => 'btn btn-danger btn-xs', 'onclick' => "return confirm('Are you sure?')"]) !!}
                </div>
                {!! Form::close() !!}
            </td>
        </tr>
    @endforeach
    </tbody>
</table>