<table class="table" id="plans-table">
    <thead>
        <tr>
        <th>id</th>
        <th>nickname</th>
        <th>active</th>
        <th>amount</th>
        <th>currency</th>
        <th>interval</th>
        <th>interval_count</th>
        <th>trial days</th>
        </tr>
    </thead>
    <tbody>
    @foreach($plans as $plan)
        <tr class="{{ 'published_' . ( $plan->status_name == 'published' ) }}">
            <td>{!! $plan->id !!}</td>
            <td>{!! $plan->nickname !!}</td>
            <td>{!! $plan->active !!}</td>
            <td>{!! $plan->amount !!}</td>
            <td>{!! $plan->currency !!}</td>
            <td>{!! $plan->interval !!}</td>
            <td>{!! $plan->interval_count !!}</td>
            <td>{!! $plan->trial_period_days !!}</td>
        </tr>
    @endforeach
    </tbody>
</table>