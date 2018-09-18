<table class="table" id="slides-table">
    <thead>
        <tr>
            <th>Featured Image</th>
            <th>title</th>
            <th>Description</th>
            <th>link url</th>
            <th>Status</th>
            <th colspan="3">Action</th>
        </tr>
    </thead>
    <tbody>
    @foreach($slides as $slide)
        <tr>
            <td><img src="{!! $slide->image_url !!}" max-height=100 max-width=300></td>
            <td>{!! $slide->title !!}</td>
            <td>{!! $slide->description !!}</td>
            <td>{!! $slide->link_url !!}</td>
            <td>{!! $slide->status() !!}</td>
            <td>
                {!! Form::open(['route' => ['admin.slides.destroy', $slide->id], 'method' => 'delete']) !!}
                <div class='btn-slide'>
                    <a href="{!! route('admin.slides.show', [$slide->id]) !!}" class='btn btn-default btn-xs'><i class="fa fa-eye"></i></a>
                    <a href="{!! route('admin.slides.edit', [$slide->id]) !!}" class='btn btn-default btn-xs'><i class="fa fa-edit"></i></a>
                    {!! Form::button('<i class="fa fa-trash"></i>', ['type' => 'submit', 'class' => 'btn btn-danger btn-xs', 'onclick' => "return confirm('Are you sure?')"]) !!}
                </div>
                {!! Form::close() !!}
            </td>
        </tr>
    @endforeach
    </tbody>
</table>