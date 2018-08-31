<table class="table" id="products-table">
    <thead>
        <tr>
        <th>id</th>
        <th>name</th>
        <th>active</th>
        <th>description</th>
        <th>status</th>
        <th>plans</th>
        </tr>
    </thead>
    <tbody>
    @foreach($products as $product)
        <tr class="{{ 'published_' . ( $product->status_name == 'published' ) }}">
            <td>{!! $product->id !!}</td>
            <td>{!! $product->name !!}</td>
            <td>{!! $product->active !!}</td>
            <td>{!! $product->description !!}</td>
            <td>{!! $product->status !!}</td>
            <td>{!! $product->plans->count() !!}</td>
        </tr>
    @endforeach
    </tbody>
</table>