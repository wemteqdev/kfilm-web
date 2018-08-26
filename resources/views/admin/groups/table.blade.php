<table class="table" id="groups-table">
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
            <td><img src="{!! $group->featured_image['uri'] !!}" height=150></td></td>
            <td>{!! $group->name !!}</td>
            <td>{!! $group->description !!}</td>
            <td>{!! $group->slug !!}</td>
            <td>
                {!! Form::open(['route' => ['admin.groups.destroy', $group->id], 'method' => 'delete']) !!}
                <div class='btn-group'>
                    <a href="{!! route('admin.groups.show', [$group->id]) !!}" class='btn btn-default btn-xs'><i class="fa fa-eye"></i></a>
                    <a href="{!! route('admin.groups.edit', [$group->id]) !!}" class='btn btn-default btn-xs'><i class="fa fa-edit"></i></a>
                    {!! Form::button('<i class="fa fa-trash"></i>', ['type' => 'submit', 'class' => 'btn btn-danger btn-xs', 'onclick' => "return confirm('Are you sure?')"]) !!}
                </div>
                {!! Form::close() !!}
            </td>
        </tr>
    @endforeach
    </tbody>
</table>