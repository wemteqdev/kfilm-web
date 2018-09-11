<table class="table" id="videos-table">
    <thead>
        <tr>
        <th>Featured Image</th>
        <th>Description</th>
        <th>Slug</th>
        <th>Duration</th>
        <th>Size</th>
        <th>Type</th>
        <th>Featured Image Id</th>
        <th>Featured Video Id</th>
        <th>Vimeo Video Id</th>
        <th>Published</th>
        <th colspan="3">Action</th>
        </tr>
    </thead>
    <tbody>
    @foreach($videos as $video)
        <tr class="{{ 'published_' . ( $video->status_name == 'published' ) }} {{ 'featured_' . ( $video->type_name == 'featured' ) }}">
            <td>
                <img src="{{ $video->featured_image_url()}}" width=250 >
                <br/>
                {!! $video->name !!}
            </td>
            <td>{!! $video->description !!}</td>
            <td>{!! $video->slug !!}</td>
            <td>{!! $video->duration !!}</td>
            <td>
                {!! $video->width !!} <br/>
                x<br/>
                {!! $video->height !!}
            </td>
            <td>
                {!! $video->type_name !!},
                {!! $video->scope_name !!},
                {{$video->status_name}}
            </td>
            <td>{!! $video->featured_image_id !!}</td>
            <td>{!! $video->featured_video_id !!}</td>
            <td>{!! $video->vimeo_video_id !!}</td>
            <td>
                @if($video->status_name == 'published')
                    <span>published: {!! $video->published_at->diffForHumans(); !!}</span>
                    <br />
                @endif

                <span> created: {!! $video->created_at->diffForHumans() !!} </span>
            </td>
            <td>
                {!! Form::open(['route' => ['admin.videos.destroy', $video->id], 'method' => 'delete']) !!}
                <div class='btn-group'>
                    <a href="{!! route('admin.videos.show', [$video->id]) !!}" class='btn btn-default btn-xs'><i class="fa fa-eye"></i></a>
                    <a href="{!! route('admin.videos.edit', [$video->id]) !!}" class='btn btn-default btn-xs'><i class="fa fa-edit"></i></a>
                    <br/>
                </div>
                {!! Form::button('<i class="fa fa-trash"></i> DELETE', ['type' => 'submit', 'class' => 'btn btn-danger btn-xs', 'onclick' => "return confirm('Are you sure?')"]) !!}
                {!! Form::close() !!}
                <br/>
                @if ($video->status_name != 'published')
                    {!! Form::open(['method' => 'PUT', 'url' => route('admin.videos.publish', $video->id)]) !!}
                        <button type="submit" class="btn btn-warning btn-lg">Publish</button>
                    {!! Form::close() !!}
                @endif
            </td>
        </tr>
    @endforeach
    </tbody>
</table>