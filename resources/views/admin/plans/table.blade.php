<script src="https://checkout.stripe.com/checkout.js"></script>
<script>
var checkoutHandler = StripeCheckout.configure({
  key: "{{ env('STRIPE_PUB_KEY') }}",
  locale: "auto"
});
</script>
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
        <th>pay with card example</th>
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
            <td>
                <button id="buttonCheckout-{{$plan->id}}">Checkout</button>
                
                <script>
                    document.getElementById("buttonCheckout-{{$plan->id}}").addEventListener("click", function(ev) {
                        checkoutHandler.open({
                            name: "{{ $plan->nickname}}",
                            description: "Description",
                            amount: {{ $plan->amount }},
                            token: function(token){
                                console.log(token);
                                axios.post("/api/plans/{{$plan->id}}/subscribe", {
                                    stripeToken: token.id,
                                })
                                .then(output => {
                                    if (output.status === "succeeded")
                                        document.getElementById("shop").innerHTML = "<p>Purchase complete!</p>";
                                })
                            }
                        });
                    });
                </script>
            </td>
        </tr>
    @endforeach
    </tbody>
</table>