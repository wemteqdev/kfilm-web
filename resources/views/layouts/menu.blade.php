<li class="{{ Request::is('categories*') ? 'active' : '' }}">
    <a href="{!! route('admin.categories.index') !!}"><i class="fa fa-tag"></i><span>Categories</span></a>
</li>

<li class="{{ Request::is('groups*') ? 'active' : '' }}">
    <a href="{!! route('admin.groups.index') !!}"><i class="fa fa-group"></i><span>Groups</span></a>
</li>

<li class="{{ Request::is('images*') ? 'active' : '' }}">
    <a href="{!! route('admin.images.index') !!}"><i class="fa fa-camera"></i><span>Images</span></a>
</li>

<li class="{{ Request::is('videos*') ? 'active' : '' }}">
    <a href="{!! route('admin.videos.index') !!}"><i class="fa fa-film"></i><span>Videos</span></a>
</li>