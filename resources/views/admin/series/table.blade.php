<table class="table" id="$series-table">
    <thead>
        <tr>
            <th>Featured Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Slug</th>
            <th colspan="3">Action</th>
        </tr>
    </thead>
    <tbody>
    @foreach($series as $aseries)
        <tr>
            <td><img src="{!! $aseries->featured_image['uri'] !!}" height=150></td></td>
            <td>{!! $aseries->name !!}</td>
            <td>{!! $aseries->description !!}</td>
            <td>{!! $aseries->slug !!}</td>
            <td>
                {!! Form::open(['route' => ['admin.series.destroy', $aseries->id], 'method' => 'delete']) !!}
                <div class='btn-aseries'>
                    <a href="{!! route('admin.series.show', [$aseries->id]) !!}" class='btn btn-default btn-xs'><i class="fa fa-eye"></i></a>
                    <a href="{!! route('admin.series.edit', [$aseries->id]) !!}" class='btn btn-default btn-xs'><i class="fa fa-edit"></i></a>
                    {!! Form::button('<i class="fa fa-trash"></i>', ['type' => 'submit', 'class' => 'btn btn-danger btn-xs', 'onclick' => "return confirm('Are you sure?')"]) !!}
                </div>
                {!! Form::close() !!}
            </td>
        </tr>
    @endforeach
    </tbody>
</table>