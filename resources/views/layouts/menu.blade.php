<li class="{{ Request::is('admin/categories*') ? 'active' : '' }}">
    <a href="{!! route('admin.categories.index') !!}"><i class="fa fa-tag"></i> <span>Categories</span></a>
</li>

<li class="{{ Request::is('admin/groups*') ? 'active' : '' }}">
    <a href="{!! route('admin.groups.index') !!}"><i class="fa fa-group"></i> <span>Groups</span></a>
</li>


<li class="{{ Request::is('admin/series*') ? 'active' : '' }}">
    <a href="{!! route('admin.series.index') !!}"><i class="fa fa-group"></i> <span>Series</span></a>
</li>

<li class="{{ Request::is('admin/images*') ? 'active' : '' }}">
    <a href="{!! route('admin.images.index') !!}"><i class="fa fa-camera"></i> <span>Images</span></a>
</li>

<li class="{{ Request::is('admin/videos*') ? 'active' : '' }}">
    <a href="{!! route('admin.videos.index') !!}"><i class="fa fa-film"></i> <span>Videos</span></a>
</li>