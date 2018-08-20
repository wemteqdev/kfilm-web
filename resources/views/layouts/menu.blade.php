<li class="{{ Request::is('categories*') ? 'active' : '' }}">
    <a href="{!! route('admin.categories.index') !!}"><i class="fa fa-edit"></i><span>Categories</span></a>
</li>

<li class="{{ Request::is('groups*') ? 'active' : '' }}">
    <a href="{!! route('admin.groups.index') !!}"><i class="fa fa-edit"></i><span>Groups</span></a>
</li>

<li class="{{ Request::is('images*') ? 'active' : '' }}">
    <a href="{!! route('admin.images.index') !!}"><i class="fa fa-edit"></i><span>Images</span></a>
</li>

<li class="{{ Request::is('videos*') ? 'active' : '' }}">
    <a href="{!! route('admin.videos.index') !!}"><i class="fa fa-edit"></i><span>Videos</span></a>
</li>

