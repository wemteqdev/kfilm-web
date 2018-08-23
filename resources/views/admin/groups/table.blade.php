<table class="table table-responsive" id="groups-table">
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
    @foreach($groups as $group)
        <tr>
            <td><img src="{!! $group->featured_image['uri'] !!}" width=200></td></td>
            <td>{!! $group->name !!}</td>
            <td>{!! $group->description !!}</td>
            <td>{!! $group->slug !!}</td>
            <td>
                {!! Form::open(['route' => ['admin.groups.destroy', $group->id], 'method' => 'delete']) !!}
                <div class='btn-group'>
                    <a href="{!! route('admin.groups.show', [$group->id]) !!}" class='btn btn-default btn-xs'><i class="glyphicon glyphicon-eye-open"></i></a>
                    <a href="{!! route('admin.groups.edit', [$group->id]) !!}" class='btn btn-default btn-xs'><i class="glyphicon glyphicon-edit"></i></a>
                    {!! Form::button('<i class="glyphicon glyphicon-trash"></i>', ['type' => 'submit', 'class' => 'btn btn-danger btn-xs', 'onclick' => "return confirm('Are you sure?')"]) !!}
                </div>
                {!! Form::close() !!}
            </td>
        </tr>
    @endforeach
    </tbody>
</table>